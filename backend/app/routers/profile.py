from typing import Optional, Literal
from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel, Field, ConfigDict
from app.deps.auth import current_user
from app.config import settings
import httpx

router = APIRouter()

# Schemas (just for Swagger / OpenAPI)
class ProfileInitRequest(BaseModel):
    username: str = Field(..., description="사용자 닉네임(고유)")
    dob: str = Field(..., description="생년월일, 형식: YYYY-MM-DD")
    gender_code: Literal['M', 'F', 'O'] = Field(
        ..., description="성별 코드: M=남성, F=여성, O=기타"
    )

class AvatarUpdateRequest(BaseModel):
    use_default: Optional[bool] = Field(
        None, description="기본 아바타(default.jpg) 사용 시 true"
    )
    public_url: Optional[str] = Field(
        None,
        description="Storage에 업로드한 이미지의 Public URL (avatars/<uid>/...jpg)",
    )

# Create profile (first-time after social sign-in)
@router.post("/init", status_code=201)
async def init_profile(
    body: ProfileInitRequest,
    user = Depends(current_user),
    authorization: str = Header(...)  # user's Supabase JWT from the app
):
    required = {"username", "dob", "gender_code"}
    if not required.issubset(body.keys()):
        raise HTTPException(status_code=400, detail="Missing fields")

    data = {
        "id": user["sub"],                 # auth.users.id
        "username": body["username"],
        "dob": body["dob"],                # "YYYY-MM-DD"
        "gender_code": body["gender_code"] # 'M' | 'F' | 'O'
        # avatar_url uses DB default (.jpg)
    }

    url = f"{settings.SUPABASE_URL}/rest/v1/profiles"
    headers = {
        "apikey": settings.SUPABASE_ANON_KEY,
        "Authorization": authorization,    # forward user's JWT for RLS
        "Prefer": "return=representation"
    }
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.post(url, json=data, headers=headers)
    if r.status_code != 201:
        raise HTTPException(status_code=r.status_code, detail=r.text)
    return r.json()[0]

# Get my profile (404 if none -> use to decide onboarding vs home)
@router.get("/me")
async def me(
    user = Depends(current_user),
    authorization: str = Header(...)
):
    url = f"{settings.SUPABASE_URL}/rest/v1/profiles?id=eq.{user['sub']}&select=*"
    headers = {
        "apikey": settings.SUPABASE_ANON_KEY,
        "Authorization": authorization
    }
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.get(url, headers=headers)
    if r.status_code != 200:
        raise HTTPException(status_code=r.status_code, detail=r.text)
    rows = r.json()
    if not rows:
        raise HTTPException(status_code=404, detail="Profile not found")
    return rows[0]

# Set avatar URL (either default or a public URL from Storage)
@router.patch("/avatar")
async def update_avatar(
    body: dict,
    user = Depends(current_user),
    authorization: str = Header(...)
):
    if body.get("use_default"):
        avatar_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/avatars/default.jpg"
    else:
        avatar_url = body.get("public_url")
        if not avatar_url:
            raise HTTPException(status_code=400, detail="Provide public_url or use_default=true")

    url = f"{settings.SUPABASE_URL}/rest/v1/profiles?id=eq.{user['sub']}"
    headers = {
        "apikey": settings.SUPABASE_ANON_KEY,
        "Authorization": authorization,
        "Prefer": "return=representation"
    }
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.patch(url, json={"avatar_url": avatar_url}, headers=headers)
    if r.status_code not in (200, 204):
        raise HTTPException(status_code=r.status_code, detail=r.text)
    return r.json()[0] if r.text else {"ok": True}