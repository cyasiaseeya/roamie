from supabase import create_client, Client
from ..core.config import settings

def get_sb() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE:
        raise RuntimeError("Supabase env missing")
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE)
