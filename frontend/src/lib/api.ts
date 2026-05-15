const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed')
  return res.json()
}
