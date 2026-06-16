import { API_BASE_URL } from "@/shared/config/env";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${url}`);
  return res.json() as Promise<T>;
}

export const httpGet = <T>(url: string): Promise<T> => request<T>(url);
export const httpPost = <T>(url: string, body: unknown): Promise<T> =>
  request<T>(url, { method: "POST", body: JSON.stringify(body) });