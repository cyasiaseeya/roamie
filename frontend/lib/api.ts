let token: string | null = null;
export function setToken(t: string | null) { token = t; }
export function getToken() { return token; }

const BASE = process.env.EXPO_PUBLIC_API_URL!;

export async function api(path: string, init: RequestInit = {}) {
  const headers: any = { ...(init.headers || {}) };
  if (!(init.body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...init, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
