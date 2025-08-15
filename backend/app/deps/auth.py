import httpx, jwt
from fastapi import Header, HTTPException, status
from app.config import settings

# Simple in-memory JWKS cache
_jwks_cache = None

async def _get_jwks():
    global _jwks_cache
    if _jwks_cache is None:
        async with httpx.AsyncClient(timeout=5) as client:
            r = await client.get(settings.SUPABASE_JWKS_URL)
            r.raise_for_status()
            _jwks_cache = r.json()
    return _jwks_cache

async def current_user(authorization: str = Header(...)):
    # Expect "Authorization: Bearer <token>"
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Bearer token")
    token = authorization.split(" ", 1)[1]

    try:
        jwks = await _get_jwks()
        header = jwt.get_unverified_header(token)
        key = next(k for k in jwks["keys"] if k["kid"] == header["kid"])
        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(key)
        # Supabase access tokens use audience "authenticated"
        payload = jwt.decode(token, public_key, algorithms=["RS256"], audience="authenticated")
        # payload["sub"] is the Supabase user UUID
        return {"sub": payload["sub"]}
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
