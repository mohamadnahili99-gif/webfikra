
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderPage() {
  const [arabic, setArabic] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("webfikra-language");
    if (savedLanguage) {
      setArabic(savedLanguage === "ar");
    }
  }, []);

  function toggleLanguage() {
    const nextLanguage = !arabic;
    setArabic(nextLanguage);
    localStorage.setItem("webfikra-language", nextLanguage ? "ar" : "en");
  }

  const steps = [
    {
      number: "01",
      ar: "تواصل معنا",
      en: "Contact Us",
      descAr: "أرسل لنا رسالة عبر واتساب.",
      descEn: "Send us a WhatsApp message.",
      icon: "💬",
    },
    {
      number: "02",
      ar: "أرسل معلومات مطعمك",
      en: "Share Your Details",
      descAr: "اسم المطعم والمنيو والصور.",
      descEn: "Restaurant name, menu and photos.",
      icon: "📋",
    },
    {
      number: "03",
      ar: "نبدأ تصميم موقعك",
      en: "We Build Your Website",
      descAr: "نناقش التفاصيل ونبدأ العمل.",
      descEn: "We discuss the details and get started.",
      icon: "🚀",
    },
  ];

  return (
    <main
      dir={arabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-[#100e0c] text-white"
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #100e0c;
        }

        @keyframes orderGlow {
          0%, 100% {
            opacity: .4;
            transform: scale(1);
          }
          50% {
            opacity: .8;
            transform: scale(1.15);
          }
        }

        @keyframes orderFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes orderReveal {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .order-glow {
          animation: orderGlow 7s ease-in-out infinite;
        }

        .order-float {
          animation: orderFloat 6s ease-in-out infinite;
        }

        .order-reveal {
          animation: orderReveal .8s ease both;
        }

        .order-glass {
          background: linear-gradient(
            145deg,
            rgba(255,255,255,.09),
            rgba(255,255,255,.025)
          );
          border: 1px solid rgba(255,255,255,.1);
          box-shadow:
            0 18px 55px rgba(0,0,0,.25),
            inset 0 1px rgba(255,255,255,.06);
          backdrop-filter: blur(14px);
        }

        .order-step {
          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .order-step:hover {
          transform: perspective(900px) rotateX(3deg) translateY(-9px);
          border-color: rgba(244,123,53,.55);
          box-shadow: 0 25px 60px rgba(244,123,53,.12);
        }

        .order-orange-text {
          background: linear-gradient(
            100deg,
            #ffbd78,
            #f47b35 55%,
            #d95b22
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* خلفية الإضاءة */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="order-glow absolute -right-48 top-20 h-[500px] w-[500px] rounded-full bg-[#a64c20]/15 blur-[130px]" />
        <div className="order-glow absolute -left-48 top-[650px] h-[500px] w-[500px] rounded-full bg-[#d58a37]/10 blur-[140px]" />
      </div>

      {/* شريط التنقل */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 px-6 py-5">
        <Link href="/" className="text-3xl font-black tracking-tight">
          <bdi dir="ltr">
            WEB<span className="order-orange-text">FIKRA</span>
          </bdi>
        </Link>

        <Link
          href="/"
          className="hidden text-sm font-semibold text-white/60 transition hover:text-[#ffad75] sm:block"
        >
          {arabic ? "الرئيسية" : "Home"}
        </Link>

        <button
          onClick={toggleLanguage}
          className="rounded-full border border-[#f47b35]/60 px-5 py-2 text-sm font-bold text-[#ffad75] transition hover:bg-[#f47b35] hover:text-white"
        >
          {arabic ? "EN" : "عربي"}
        </button>
      </header>

      {/* المقدمة */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-10 pt-20 text-center md:pb-16 md:pt-28">
        <div className="order-reveal">
          <span className="inline-flex items-center gap-3 rounded-full border border-[#f47b35]/30 bg-[#f47b35]/10 px-5 py-2.5 text-sm font-bold text-[#ffc08e]">
            <span className="h-2 w-2 rounded-full bg-[#f47b35] shadow-[0_0_14px_#f47b35]" />
            {arabic ? "خطوتك الأولى تبدأ هنا" : "YOUR FIRST STEP STARTS HERE"}
          </span>

          <h1 className="mt-8 text-5xl font-black leading-[1.3] tracking-tight md:text-7xl">
            {arabic ? (
              <>
                اطلب موقعك
                <span className="order-orange-text"> الإلكتروني الآن!</span>
              </>
            ) : (
              <>
                Order Your
                <span className="order-orange-text"> Website Now!</span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-white/55">
            {arabic
              ? "نحن هنا لمساعدة مطعمك على الظهور بشكل احترافي على الإنترنت. أخبرنا عن مشروعك وسنتواصل معك لمناقشة التفاصيل."
              : "We are here to help your restaurant build a professional online presence. Tell us about your business and we will contact you to discuss the details."}
          </p>
        </div>
      </section>

      {/* خطوات الطلب */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="order-glass order-step order-reveal rounded-3xl p-8"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-7 flex items-center justify-between">
                <span className="text-4xl font-black order-orange-text">
                  {step.number}
                </span>

                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f47b35]/20 bg-[#f47b35]/10 text-3xl">
                  {step.icon}
                </span>
              </div>

              <h2 className="text-xl font-black">
                {arabic ? step.ar : step.en}
              </h2>

              <p className="mt-4 leading-8 text-white/50">
                {arabic ? step.descAr : step.descEn}
              </p>

              <div className="mt-7 h-1 w-14 rounded-full bg-gradient-to-r from-[#f47b35] to-[#ffc078]" />
            </div>
          ))}
        </div>
      </section>

      {/* التواصل */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="order-float relative overflow-hidden rounded-[2rem] border border-[#f47b35]/25 bg-gradient-to-br from-[#472719] via-[#251912] to-[#17110e] px-7 py-14 text-center shadow-[0_25px_90px_rgba(0,0,0,.4)] md:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,123,53,.17),transparent_65%)]" />

          <div className="relative">
            <div className="mb-6 text-5xl">✦</div>

            <h2 className="text-3xl font-black md:text-5xl">
              {arabic ? "جاهز لنبدأ؟" : "Ready to Get Started?"}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/60">
              {arabic
                ? "تواصل معنا الآن وأخبرنا عن الموقع الذي تحتاجه."
                : "Contact us now and tell us about the website you need."}
            </p>

            <a
              href="https://wa.me/96171524556"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-block rounded-full bg-gradient-to-r from-[#f47b35] to-[#d95e1d] px-9 py-4 font-black text-white shadow-[0_10px_35px_rgba(244,123,53,.25)] transition hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(244,123,53,.4)]"
            >
              {arabic ? "تواصل عبر واتساب" : "Contact on WhatsApp"} ↗
            </a>

            <p className="mt-6 text-sm text-white/40">
              WhatsApp: 71 524 556
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block font-bold text-[#ffad75] transition hover:text-white"
          >
            {arabic
              ? "← العودة إلى الصفحة الرئيسية"
              : "← Back to Home"}
          </Link>
        </div>
      </section>

      {/* التذييل */}
      <footer className="relative z-10 border-t border-white/10 bg-[#0b0908] px-6 py-9 text-center">
        <div className="text-2xl font-black">
          <bdi dir="ltr">
            WEB<span className="order-orange-text">FIKRA</span>
          </bdi>
        </div>

        <p className="mt-3 text-sm text-white/35">
          © 2026 WEBFIKRA.{" "}
          {arabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </p>
      </footer>
    </main>
  );
}
