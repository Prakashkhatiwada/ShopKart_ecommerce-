import type { CartContext, Product, UserInfo } from "@/lib/types";

export const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

export function fullImageUrl(path: string): string {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/") && API_BASE) return `${API_BASE}${path}`;
  return path;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set("Content-Type", "application/json");
  const token = getCookie("csrftoken");
  if (token) headers.set("X-CSRFToken", token);

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : "Request failed";
    throw new ApiError(message, res.status);
  }
  return data as T;
}

export const api = {
  ensureCsrf: () => apiFetch<{ csrfToken: string }>("/api/csrf"),
  products: () => apiFetch<Product[]>("/api/products"),
  product: (id: string) => apiFetch<Product>(`/api/product/${id}`),
  user: () => apiFetch<UserInfo>("/api/user"),
  cart: () => apiFetch<CartContext>("/api/cart"),
  login: (username: string, password: string) =>
    apiFetch<UserInfo>("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  googleLogin: (credential: string, extraData?: Record<string, unknown>) =>
    apiFetch<UserInfo>("/api/google-login", {
      method: "POST",
      body: JSON.stringify({ credential, ...extraData }),
    }),
  register: (data: { username: string; email: string; password: string; confirm_password: string }) =>
    apiFetch<UserInfo>("/api/register", { method: "POST", body: JSON.stringify(data) }),
  logout: () => apiFetch<{ success: boolean }>("/api/logout", { method: "POST" }),
  updateItem: (productId: number, action: "add" | "remove") =>
    apiFetch<CartContext>("/api/update_item", {
      method: "POST",
      body: JSON.stringify({ productId, action }),
    }),
  processOrder: (data: { form: { total: number }; shipping: { address: string; city: string; state: string; zipcode: string } }) =>
    apiFetch<Record<string, unknown>>("/api/process_order", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  esewaVerify: (data: string) =>
    apiFetch<Record<string, unknown>>(`/api/esewa/verify?data=${encodeURIComponent(data)}`, {
      method: "GET",
    }),
};
