import { NextResponse } from "next/server";
import {
  clearTokens,
  enabled,
  failure,
  getPortalIdentity,
  readJson,
  sameOrigin,
  saveTokens,
  success,
  supabase,
} from "@/lib/platform";

export const dynamic = "force-dynamic";

type AuthAnswer = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: { id?: string; email?: string };
  error?: string;
  msg?: string;
};

export async function GET() {
  if (!enabled()) return success({ configured: false, authenticated: false, signupsAllowed: false });
  const identity = await getPortalIdentity();
  if (!identity.ok) return success({ configured: true, authenticated: false, signupsAllowed: process.env.WEBFIKRA_ALLOW_SIGNUPS === "true" });
  return success({ configured: true, authenticated: true, user: identity.user, signupsAllowed: process.env.WEBFIKRA_ALLOW_SIGNUPS === "true" });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return failure("الطلب غير موثوق", 403);
  if (!enabled()) return failure("خدمة الحسابات غير متاحة حتى ربط قاعدة البيانات", 503);
  let body: { mode?: string; email?: string; password?: string } = {};
  try { body = await request.json(); } catch { return failure("طلب غير صالح"); }

  if (body.mode === "logout") {
    await clearTokens();
    return success({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return failure("تحقق من البريد الإلكتروني");
  if (password.length < 8 || password.length > 128)
    return failure("كلمة المرور يجب أن تحتوي 8 أحرف على الأقل");

  if (body.mode === "signup") {
    if (process.env.WEBFIKRA_ALLOW_SIGNUPS !== "true")
      return failure("إنشاء الحسابات العامة غير مفعّل حالياً", 403);
    try {
      const result = await supabase("/auth/v1/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const auth = await readJson<AuthAnswer>(result);
      if (!result.ok)
        return failure("تعذّر إنشاء الحساب. تحقق من بياناتك أو جرّب لاحقاً", result.status === 429 ? 429 : 400);
      if (auth?.access_token && auth.refresh_token) {
        await saveTokens(auth);
        return success({ ok: true, confirmed: true });
      }
      return success({ ok: true, confirmed: false, message: "تحقق من بريدك الإلكتروني، ثم سجّل الدخول." });
    } catch {
      return failure("تعذّر الاتصال بخدمة الحسابات", 503);
    }
  }

  if (body.mode !== "login") return failure("عملية غير معروفة");
  try {
    const result = await supabase("/auth/v1/token?grant_type=password", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const auth = await readJson<AuthAnswer>(result);
    if (!result.ok || !auth?.access_token || !auth.refresh_token)
      return failure("البريد أو كلمة المرور غير صحيحة، أو الحساب غير مؤكد", result.status === 429 ? 429 : 401);
    await saveTokens(auth);
    return success({ ok: true });
  } catch {
    return failure("تعذّر الاتصال بخدمة الحسابات", 503);
  }
}
