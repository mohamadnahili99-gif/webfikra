"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Mode = "login" | "signup";
type Session = { configured: boolean; authenticated: boolean; signupsAllowed: boolean };
const inputClass = "mt-2 w-full rounded-xl border border-white/15 bg-[#241c17] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#f5aa71]";

export default function PortalAuth({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/portal/session", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Session) => {
        if (cancelled) return;
        setSession(data);
        if (data.authenticated) router.replace("/restaurants/portal");
      })
      .catch(() => { if (!cancelled) setError("تعذّر التحقق من حالة الخدمة"); });
    return () => { cancelled = true; };
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError(""); setNotice(""); setBusy(true);
    try {
      const response = await fetch("/api/portal/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "تعذّر إتمام العملية");
      if (mode === "signup" && !data.confirmed) {
        setNotice(data.message || "تحقق من بريدك الإلكتروني لتأكيد الحساب");
      } else {
        router.push("/restaurants/portal");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "حدث خطأ غير متوقع");
    } finally { setBusy(false); }
  }

  const unavailable = session && (!session.configured || (mode === "signup" && !session.signupsAllowed));

  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-[#16120e] px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-7">
          <Link href="/" className="text-2xl font-black"><bdi dir="ltr">WEB<span className="text-[#f2a56c]">FIKRA.</span></bdi></Link>
          <Link href="/" className="text-sm font-bold text-[#e5b38c]">الرئيسية ↗</Link>
        </div>
        <div className="mx-auto mt-16 max-w-md rounded-[30px] border border-[#664732]/60 bg-[#261c16] p-7 shadow-2xl sm:p-10">
          <p className="mb-4 text-xs font-bold tracking-widest text-[#efad7d]">WEBFIKRA / RESTAURANT PORTAL</p>
          <h1 className="text-3xl font-black">{mode === "login" ? "دخول إدارة المطاعم" : "إنشاء حساب مطعم"}</h1>
          <p className="mt-4 text-sm leading-8 text-white/55">{mode === "login" ? "أدخل بيانات حسابك للوصول إلى مطاعمك وقوائمك." : "أنشئ حساباً لإدارة منيو مطعمك. قد يلزم تأكيد البريد الإلكتروني."}</p>
          {!session && !error && <p className="mt-8 text-sm text-[#e7b489]">جار التحقق من إعدادات الخدمة…</p>}
          {unavailable && <div className="mt-8 rounded-2xl border border-[#bd835b]/30 bg-[#4c3021]/35 p-5 text-sm leading-8 text-[#ffcba6]">
            {session?.configured
              ? "التسجيل العام غير مفعّل حالياً. تواصل معنا لإنشاء حساب مدعو."
              : "بوابة الحسابات غير مفعّلة على هذا الموقع بعد. لا نطلب كلمات المرور قبل ربط الخدمة بشكل آمن."}
          </div>}
          {session?.configured && !unavailable && (
            <form onSubmit={submit} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold">البريد الإلكتروني
                <input value={email} type="email" autoComplete="email" maxLength={254} required onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" className={inputClass} dir="ltr" />
              </label>
              <label className="block text-sm font-semibold">كلمة المرور
                <input value={password} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} maxLength={128} required onChange={(e)=>setPassword(e.target.value)} className={inputClass} dir="ltr" />
              </label>
              <button disabled={busy} type="submit" className="w-full rounded-full bg-[#f1a36d] px-6 py-4 text-sm font-black text-[#26190f] transition hover:bg-[#ffc499] disabled:opacity-50">
                {busy ? "جار التحقق…" : mode === "login" ? "دخول الحساب" : "إنشاء الحساب"}
              </button>
            </form>
          )}
          {error && <p role="alert" className="mt-5 rounded-xl border border-red-400/40 bg-red-950/30 p-3 text-sm text-red-200">{error}</p>}
          {notice && <p role="status" className="mt-5 rounded-xl border border-[#78b98f]/40 bg-green-950/30 p-3 text-sm text-green-200">{notice}</p>}
          <p className="mt-7 text-center text-sm text-white/55">
            {mode === "login" ? "ليس لديك حساب؟ " : "لديك حساب؟ "}
            <Link className="font-bold text-[#f4b68b] underline underline-offset-4" href={mode === "login" ? "/restaurants/register" : "/restaurants/login"}>{mode === "login" ? "إنشاء حساب" : "تسجيل الدخول"}</Link>
          </p>
          <Link href="/#contact" className="mt-5 block text-center text-sm font-bold text-[#f4b68b]">اطلب موقعاً من WEBFIKRA ↗</Link>
        </div>
      </div>
    </main>
  );
}
