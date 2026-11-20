import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type Restaurant = {
  id: string;
  owner_id: string;
  slug: string;
  name: string;
  description: string;
  whatsapp: string;
  address: string;
  hours: string;
  instagram: string;
  tiktok: string;
  logo_url: string;
  cover_url: string;
  accent_color: string;
  currency: "USD" | "LBP";
  published: boolean;
};
export type MenuCategory = {
  id: string;
  restaurant_id: string;
  name: string;
  position: number;
  visible: boolean;
};
export type MenuItem = {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  position: number;
  visible: boolean;
};

type SupabaseAuth = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: { id?: string; email?: string };
  error?: string;
  msg?: string;
};
const ACCESS = "wf_portal_access";
const REFRESH = "wf_portal_refresh";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const uuid = (value: unknown): value is string =>
  typeof value === "string" && UUID_RE.test(value);
export const slugIsValid = (value: unknown): value is string =>
  typeof value === "string" && /^[a-z0-9][a-z0-9-]{2,39}$/.test(value);

export function enabled() {
  return Boolean(
    process.env.SUPABASE_URL?.startsWith("https://") &&
    process.env.SUPABASE_PUBLISHABLE_KEY,
  );
}

function apiBase() {
  const url = process.env.SUPABASE_URL;
  if (!url || !url.startsWith("https://") || !enabled()) throw new Error("Platform not configured");
  return url.replace(/\/$/, "");
}

export async function supabase(
  path: string,
  init: RequestInit = {},
  token?: string,
): Promise<Response> {
  const apikey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!apikey) throw new Error("Platform not configured");
  const response = await fetch(apiBase() + path, {
    ...init,
    headers: {
      apikey,
      ...(token ? { Authorization: "Bearer " + token } : {}),
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
    redirect: "error",
  });
  return response;
}

export async function readJson<T>(response: Response): Promise<T | null> {
  try { return await response.json() as T; }
  catch { return null; }
}

function opts(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export async function saveTokens(auth: SupabaseAuth) {
  if (!auth.access_token || !auth.refresh_token) return;
  const jar = await cookies();
  jar.set(ACCESS, auth.access_token, opts(Math.max(60, auth.expires_in || 3600)));
  jar.set(REFRESH, auth.refresh_token, opts(60 * 60 * 24 * 30));
}

export async function clearTokens() {
  const jar = await cookies();
  jar.delete(ACCESS);
  jar.delete(REFRESH);
}

export async function getPortalIdentity(): Promise<
  | { ok: true; token: string; user: { id: string; email: string } }
  | { ok: false; status: 401 | 503 }
> {
  if (!enabled()) return { ok: false, status: 503 };
  const jar = await cookies();
  const access = jar.get(ACCESS)?.value;
  const refresh = jar.get(REFRESH)?.value;

  if (access) {
    const result = await supabase("/auth/v1/user", { method: "GET" }, access);
    const user = await readJson<{ id?: string; email?: string }>(result);
    if (result.ok && user?.id && uuid(user.id)) {
      return { ok: true, token: access, user: { id: user.id, email: user.email || "" } };
    }
  }

  if (refresh) {
    const result = await supabase("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refresh }),
    });
    const auth = await readJson<SupabaseAuth>(result);
    if (result.ok && auth?.access_token && auth.refresh_token) {
      await saveTokens(auth);
      const u = await supabase("/auth/v1/user", { method: "GET" }, auth.access_token);
      const user = await readJson<{ id?: string; email?: string }>(u);
      if (u.ok && user?.id && uuid(user.id))
        return { ok: true, token: auth.access_token, user: { id: user.id, email: user.email || "" } };
    }
    await clearTokens();
  }
  return { ok: false, status: 401 };
}

export function failure(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}
export function success<T>(value: T, status = 200) {
  return NextResponse.json(value, { status, headers: { "Cache-Control": "no-store" } });
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try { return new URL(origin).host === new URL(request.url).host && new URL(origin).protocol === new URL(request.url).protocol; }
  catch { return false; }
}

export function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
export function validImage(value: string) {
  if (!value) return true;
  try { const u = new URL(value); return u.protocol === "https:" && !u.username && !u.password && value.length <= 1000; }
  catch { return false; }
}
export function validSocial(value: string) {
  if (!value) return true;
  if (!validImage(value)) return false;
  const host = new URL(value).hostname.toLowerCase();
  return host === "instagram.com" || host === "www.instagram.com" || host === "tiktok.com" || host === "www.tiktok.com";
}
export function priceOf(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  const v = Number(value);
  return Number.isFinite(v) && v >= 0 && v <= 9999999999.99 && Math.round(v * 100) / 100 === v ? v : null;
}
export function positionOf(value: unknown) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0 && n <= 9999 ? n : 0;
}
export async function requirePortal() {
  try { return await getPortalIdentity(); }
  catch { return { ok: false as const, status: 503 as const }; }
}
