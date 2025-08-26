from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator
from typing import Literal
from datetime import date
from passlib.hash import bcrypt
from ..services.supabase_admin import get_sb
from ..deps.deps_auth import mint_token
from ..core.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterIn(BaseModel):
    username: str = Field(min_length=5, max_length=14)
    password: str = Field(min_length=8, max_length=21)
    birthdate: date     # no validation yet
    gender_code: Literal["M", "F", "O"]   # expect 'M' | 'F' | 'O' later

class LoginIn(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(body: RegisterIn):
    sb = get_sb()

    # username uniqueness (simple check; no fancy validation)
    exists = sb.table("users").select("id").eq("username", body.username).execute()
    if exists.data:
        raise HTTPException(409, "Username already taken")

    user = sb.table("users").insert({
        "username": body.username,
        "password_hash": bcrypt.hash(body.password),
    }).execute().data[0]
    uid = user["id"]

    # create profile with default avatar
    sb.table("profiles").insert({
        "user_id": uid,
        "birthdate": body.birthdate.isoformat(),
        "gender_code": body.gender_code,
        "avatar_url": settings.DEFAULT_AVATAR_URL,
        "profile_description": None
    }).execute()

    # auto-login
    token = mint_token(uid)
    return {"token": token, "user": {"id": uid, "username": body.username}}

@router.post("/login")
def login(body: LoginIn):
    sb = get_sb()
    row = sb.table("users").select("id,username,password_hash").eq("username", body.username).single().execute()
    if not row.data or not bcrypt.verify(body.password, row.data["password_hash"]):
        raise HTTPException(401, "Invalid credentials")
    token = mint_token(row.data["id"])
    return {"token": token, "user": {"id": row.data["id"], "username": row.data["username"]}}
