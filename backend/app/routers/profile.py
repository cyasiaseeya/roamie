from fastapi import APIRouter, UploadFile, File, HTTPException
from ..deps.deps_auth import require_user
from ..services.supabase_admin import get_sb

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("/me")
def me(user_id: str = require_user):
    sb = get_sb()
    u = sb.table("users").select("id,username").eq("id", user_id).single().execute().data
    p = sb.table("profiles").select("birthdate,gender_code,avatar_url,profile_description").eq("user_id", user_id).single().execute().data
    return {"user": u, "profile": p}

@router.post("/avatar")
async def upload_avatar(file: UploadFile = File(...), user_id: str = require_user):
    sb = get_sb()
    path = f"{user_id}/avatar.jpg"
    data = await file.read()
    r = sb.storage.from_("avatars").upload(path, data, {
        "contentType": file.content_type or "image/jpeg",
        "upsert": True
    })
    if getattr(r, "error", None):
        raise HTTPException(500, str(r.error))

    public = sb.storage.from_("avatars").get_public_url(path)
    url = public.get("data", {}).get("publicUrl") if isinstance(public, dict) else public.data.get("publicUrl")
    if not url:
        raise HTTPException(500, "Failed to get public URL")

    sb.table("profiles").update({"avatar_url": url}).eq("user_id", user_id).execute()
    return {"avatar_url": url}
