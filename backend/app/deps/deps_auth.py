from fastapi import Header, HTTPException
from jose import jwt, JWTError
from datetime import datetime, timedelta
from ..core.config import settings

def mint_token(user_id: str) -> str:
    now = datetime.utcnow()
    payload = {
        "sub": user_id,
        "aud": settings.JWT_AUD,
        "iss": settings.JWT_ISS,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(hours=settings.JWT_EXPIRES_HOURS)).timestamp()),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

def require_user(authorization: str = Header(None)) -> str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(401, "Missing bearer token")
    token = authorization.split(" ", 1)[1]
    try:
        data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"],
                          audience=settings.JWT_AUD, issuer=settings.JWT_ISS)
    except JWTError as e:
        raise HTTPException(401, f"Invalid token: {e}")
    return data["sub"]
