"use client";

import Link from "next/link";
import LeadQuoteForm from "../components/LeadQuoteForm";
import { useWebfikraLanguage } from "../hooks/useWebfikraLanguage";

export default function OrderPage() {
  const { arabic, toggleLanguage } = useWebfikraLanguage();
  const t = (ar: string, en: string) => arabic ? ar : en;
  const steps = [
    { n: "01", ar: "احكِ لنا عن نشاطك", en: "Tell us about your business", arBody: "اسم المطعم ونوع النشاط والأفكار التي تريد تنفيذها.", enBody: "Your restaurant, your brand, and the features you have in mind." },
    { n: "02", ar: "نراجع التفاصيل", en: "We review the details", arBody: "نتناقش بشأن الصفحات والوظائف والمحتوى المناسب.", enBody: "We'll discuss the pages, functionality, and content that fit your project." },
    { n: "03", ar: "نتفق ثم نبدأ", en: "Agree and get started", arBody: "نوضح نطاق العمل والسعر والمدة قبل بدء التنفيذ.", enBody: "We confirm the scope, price, and timing before starting paid work." },
  ];

  return (
    <main lang={arabic ? "ar" : "en"} dir={arabic ? "rtl" : "ltr"} className="wf-site min-h-screen bg-[#14110e] text-[#fff8f0]">
      <header className="border-b border-white/10 bg-[#171310]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6">
          <Link href="/" className="text-2xl font-black tracking-[-.05em]"><bdi dir="ltr">WEB<span className="text-[#f0a66e]">FIKRA.</span></bdi></Link>
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} type="button" className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-[#efb182]">{arabic ? "EN" : "عربي"}</button>
            <Link href="/" className="text-sm font-bold text-[#e6ba9c] transition hover:text-white">{t("الصفحة الرئيسية", "Home")} ↗</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#261a13] via-[#191411] to-[#10100e] px-5 pb-20 pt-20 sm:pb-24 sm:pt-28">
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 end-0 h-[400px] w-[500px] rounded-full bg-[#b86d3e]/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-black tracking-[.18em] text-[#eda777]">WEBFIKRA / START YOUR PROJECT</p>
          <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.2] md:text-6xl">{t("خلّينا نحوّل فكرتك", "Let's bring your vision")}<br /><span className="text-[#f0a66e]">{t("إلى موقع يستحق التميّز.", "to life online.")}</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-9 text-[#d0bdac]">{t("خطوات واضحة من أول محادثة إلى إطلاق الموقع. املأ التفاصيل أدناه وسيُفتح واتساب برسالة يمكنك مراجعتها قبل إرسالها.", "From our first chat to launch, we keep things clear. Fill in the details below to prepare a WhatsApp inquiry that you can review before sending.")}</p>
        </div>
      </section>

      <section className="bg-[#f3ece2] px-5 py-16 text-[#2b211b] sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.n} className="rounded-[25px] border border-[#dfd1c1] bg-[#fffbf7] p-7">
              <span className="text-4xl font-black text-[#b17a53]">{step.n}</span>
              <h2 className="mt-6 text-xl font-black">{t(step.ar, step.en)}</h2>
              <p className="mt-3 text-sm leading-7 text-[#76685e]">{t(step.arBody, step.enBody)}</p>
            </article>
          ))}
        </div>
      </section>

      <LeadQuoteForm arabic={arabic} />

      <footer className="border-t border-white/10 px-5 py-9">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 text-xs text-white/50">
          <span>© 2026 WEBFIKRA.</span>
          <div className="flex flex-wrap gap-6">
            <Link className="hover:text-white" href="/privacy">{t("الخصوصية", "Privacy")}</Link>
            <Link className="hover:text-white" href="/terms">{t("شروط الاستخدام", "Terms")}</Link>
            <Link className="hover:text-white" href="/">{t("الرئيسية", "Home")}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
