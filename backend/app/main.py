from fastapi import FastAPI
from app.routers import profile

app = FastAPI(title="Roamie", version="0.1.0")
app.include_router(profile.router, prefix="/v1/profile", tags=["profile"])

@app.get("/healthz")
async def health():
    return {"ok": True}
