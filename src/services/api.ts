// services/api.ts
export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const defaultHeaders = { "Content-Type": "application/json" };
  const res = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  });
  let data: any;
  try {
    data = await res.json();
  } catch {
    data = undefined;
  }
  if (!res.ok) {
    // 若后端有 error 字段，优先返回
    throw new Error(data?.error || data?.message || "API请求失败");
  }
  return data as T;
}
