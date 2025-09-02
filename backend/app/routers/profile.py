from fastapi import APIRouter, UploadFile, File, HTTPException, Header
from pydantic import BaseModel
from ..deps.deps_auth import require_user
from ..services.supabase_admin import get_sb

router = APIRouter(prefix="/profile", tags=["profile"])

class SurveyResult(BaseModel):
    travel_type_name: str
    description: str

@router.get("/me")
def me(user_id: str = require_user):
    sb = get_sb()
    u = sb.table("users").select("id,username").eq("id", user_id).single().execute().data
    p = sb.table("profiles").select("birthdate,gender_code,avatar_url,profile_description,traveller_type").eq("user_id", user_id).single().execute().data
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

@router.post("/survey-result")
async def store_survey_result(
    survey_result: SurveyResult, 
    authorization: str = Header(None)
):
    # Authentication check
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(401, "Missing bearer token")
    
    token = authorization.split(" ", 1)[1]
    try:
        from jose import jwt, JWTError
        from ..core.config import settings
        
        data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"],
                          audience=settings.JWT_AUD, issuer=settings.JWT_ISS)
        user_id = data["sub"]
    except JWTError as e:
        raise HTTPException(401, f"Invalid token: {e}")
    except Exception as e:
        raise HTTPException(401, f"Token validation failed: {e}")
    
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
