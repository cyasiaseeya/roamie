import axios from 'axios';
import { Platform } from 'react-native';

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

const API_BASE =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8000'
    : 'http://localhost:8000'; // iOS 시뮬레이터일 경우

export const apiDocker = axios.create({ baseURL: API_BASE });

// 사용 예시
export async function getHealth() {
  const { data } = await apiDocker.get('/api/health');
  return data;
}
