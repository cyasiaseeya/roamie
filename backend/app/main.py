from fastapi import FastAPI
from .core.security import add_cors
from .routers import auth, profile

def create_app():
    app = FastAPI(title="Roamie Backend")
    add_cors(app)
    app.include_router(auth.router)
    app.include_router(profile.router)
    return app

app = create_app()

@app.get("/api/health")
def health():
    return {"ok": True}
