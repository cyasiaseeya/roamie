from fastapi import APIRouter, UploadFile, File, HTTPException, Header, Depends
import logging
import time
from pydantic import BaseModel
from ..deps.deps_auth import require_user
from ..services.supabase_admin import get_sb

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/profile", tags=["profile"])

class SurveyResult(BaseModel):
    travel_type_name: str
    description: str

@router.get("/me")
def me(user_id: str = Depends(require_user)):
    sb = get_sb()
    u = sb.table("users").select("id,username").eq("id", user_id).single().execute().data
    p = sb.table("profiles").select("birthdate,gender_code,avatar_url,profile_description,traveller_type").eq("user_id", user_id).single().execute().data
    return {"user": u, "profile": p}

@router.post("/avatar")
async def upload_avatar(user_id: str = Depends(require_user), file: UploadFile = File(...)):
    """Upload avatar to Supabase storage 'avatars' bucket and store public URL.

    - Enforces 50 MB size limit (Supabase free tier limit)
    - Allows common image content types: jpeg, png, webp
    - Uses upsert so users can overwrite their avatar
    """
    logger.info("avatar_upload:start user_id=%s filename=%s content_type=%s", user_id, getattr(file, 'filename', None), getattr(file, 'content_type', None))
    sb = get_sb()

    # Validate/normalize content type
    allowed_types = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}
    content_type = (file.content_type or "").lower().strip()
    if not content_type:
        # Some RN clients omit content-type; default to jpeg
        content_type = "image/jpeg"
    if content_type not in allowed_types:
        # Attempt naive guess from filename
        fname = (file.filename or "").lower()
        if fname.endswith(".png"):
            content_type = "image/png"
        elif fname.endswith(".webp"):
            content_type = "image/webp"
        elif fname.endswith(".jpg") or fname.endswith(".jpeg"):
            content_type = "image/jpeg"
        else:
            raise HTTPException(415, "지원하지 않는 이미지 형식입니다. JPEG, PNG, WEBP만 업로드해 주세요.")

    # 50 MB limit
    MAX_BYTES = 50 * 1024 * 1024
    chunk_size = 1024 * 1024  # 1 MB
    received = 0
    buffer = bytearray()
    while True:
        chunk = await file.read(chunk_size)
        if not chunk:
            break
        received += len(chunk)
        if received > MAX_BYTES:
            raise HTTPException(413, "파일 용량이 너무 큽니다. 최대 50MB까지 업로드할 수 있습니다.")
        buffer.extend(chunk)
    logger.info("avatar_upload:read_complete bytes=%d", received)

    # Determine file extension and unique path (avoid CDN caching by versioning filename)
    ext = allowed_types[content_type]
    timestamp = int(time.time())
    path = f"{user_id}/avatar_{timestamp}.{ext}"
    logger.info("avatar_upload:path %s", path)

    try:
        # Supabase Python SDK expects header-like keys as strings
        # Use 'content-type' and 'x-upsert' with string values
        # Supabase Python SDK expects header-like dict with string values
        r = sb.storage.from_("avatars").upload(
            path,
            bytes(buffer),
            {
                "content-type": content_type or "image/jpeg",
                "x-upsert": "true",
            },
        )
        if getattr(r, "error", None):
            logger.error("avatar_upload:storage_error %s", getattr(r, "error", None))
            raise HTTPException(500, f"업로드 중 오류가 발생했습니다: {r.error}")
    except Exception as e:
        logger.exception("avatar_upload:exception during storage upload")
        raise HTTPException(500, f"스토리지 업로드 중 예외 발생: {e}")

    public = sb.storage.from_("avatars").get_public_url(path)
    url = None
    if isinstance(public, str):
        url = public
    elif isinstance(public, dict):
        url = (
            public.get("data", {}).get("publicUrl")
            or public.get("publicUrl")
            or public.get("signedURL")
            or public.get("signedUrl")
        )
    else:
        data = getattr(public, "data", None)
        if isinstance(data, dict):
            url = data.get("publicUrl") or data.get("signedURL") or data.get("signedUrl")
    logger.info("avatar_upload:public_url raw=%s parsed_url=%s", str(public), url)
    if not url:
        raise HTTPException(500, "프로필 이미지 공개 URL 생성에 실패했습니다.")

    # Update profile row and verify write succeeded (robust even without unique constraint)
    try:
        up_res = (
            sb.table("profiles")
            .update({"avatar_url": url})
            .eq("user_id", user_id)
            .execute()
        )
        logger.info("avatar_upload:update_res data=%s error=%s", getattr(up_res, "data", None), getattr(up_res, "error", None))
        updated_rows = getattr(up_res, "data", None) or []
        if isinstance(updated_rows, dict):
            updated_rows = [updated_rows]
        if not updated_rows:
            ins_res = (
                sb.table("profiles")
                .insert({"user_id": user_id, "avatar_url": url})
                .execute()
            )
            logger.info("avatar_upload:insert_res data=%s error=%s", getattr(ins_res, "data", None), getattr(ins_res, "error", None))
        # Read back to confirm latest row
        result = (
            sb.table("profiles")
            .select("user_id, avatar_url")
            .eq("user_id", user_id)
            .single()
            .execute()
        )
        updated = getattr(result, "data", None)
    except Exception as e:
        logger.exception("avatar_upload:exception during profile upsert")
        raise HTTPException(500, f"프로필 업데이트 중 예외 발생: {e}")

    if not updated or not updated.get("avatar_url"):
        raise HTTPException(500, "프로필 이미지 URL 갱신에 실패했습니다.")

    logger.info("avatar_upload:success user_id=%s url=%s", user_id, updated.get("avatar_url"))
    return {"avatar_url": updated.get("avatar_url")}

@router.post("/survey-result")
async def store_survey_result(
    survey_result: SurveyResult,
    user_id: str = Depends(require_user),
):
    try:
        sb = get_sb()
        
        # Update the profiles table with survey result data
        result = sb.table("profiles").update({
            "traveller_type": survey_result.travel_type_name,
            "profile_description": survey_result.description
        }).eq("user_id", user_id).execute()
        
        if getattr(result, "error", None):
            raise HTTPException(500, f"Failed to update profile: {result.error}")
        
        return {
            "message": "Survey result stored successfully",
            "travel_type_name": survey_result.travel_type_name,
            "description": survey_result.description
        }
        
    except Exception as e:
        raise HTTPException(500, f"Error storing survey result: {str(e)}")
