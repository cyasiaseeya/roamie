import os
from dotenv import load_dotenv
load_dotenv()

class Settings:
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))
    CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:19006").split(",")]

    # JWT
    JWT_SECRET = os.getenv("JWT_SECRET", "change-me")
    JWT_AUD = "romie-app"
    JWT_ISS = "romie-backend"
    JWT_EXPIRES_HOURS = int(os.getenv("JWT_EXPIRES_HOURS", "24"))

    # Supabase
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_ROLE = os.getenv("SUPABASE_SERVICE_ROLE")

    # Default avatar (public file in Supabase Storage)
    DEFAULT_AVATAR_URL = os.getenv("DEFAULT_AVATAR_URL")

settings = Settings()
