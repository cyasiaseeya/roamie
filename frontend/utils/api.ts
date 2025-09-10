// Unified API helpers for the frontend

let token: string | null = null;
export function setToken(t: string | null) { token = t; }
export function getToken() { return token; }

const BASE = process.env.EXPO_PUBLIC_API_URL as string | undefined;

function ensureBase(): string {
  if (!BASE) {
    const err: any = new Error('Missing EXPO_PUBLIC_API_URL');
    err.code = 'NO_BASE_URL';
    throw err;
  }
  return BASE;
}

type ApiOptions = { timeoutMs?: number };

export async function api(path: string, init: RequestInit = {}, opts: ApiOptions = {}) {
  const base = ensureBase();
  const headers: Record<string, any> = { ...(init.headers as any) };
  if (!(init.body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 15000);

  let res: Response;
  try {
    res = await fetch(`${base}${path}`, { ...init, headers, signal: controller.signal });
  } catch (e: any) {
    clearTimeout(timeout);
    const err: any = new Error(e?.message || 'Network request failed');
    err.cause = e;
    throw err;
  }
  clearTimeout(timeout);

  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const error: any = new Error(typeof data === 'string' ? data : (data?.detail || res.statusText));
    error.status = res.status;
    error.body = data;
    throw error;
  }
  return data;
}

// Example health check using unified helper
export async function getHealth() {
  return api('/api/health');
}



