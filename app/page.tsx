
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [arabic, setArabic] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("webfikra-language");
    if (savedLanguage) setArabic(savedLanguage === "ar");
  }, []);

  function toggleLanguage() {
    const next = !arabic;
    setArabic(next);
    localStorage.setItem("webfikra-language", next ? "ar" : "en");
  }

  const services = [
    {
      icon: "🍽️",
      ar: "موقع منيو إلكتروني",
      en: "Online Menu Website",
      detailAr: "منيو أنيق ومنظم يعرض أطباقك بوضوح",
      detailEn: "An elegant menu that showcases your dishes.",
    },
    {
      icon: "📸",
      ar: "عرض صور وأسعار الأطباق",
      en: "Food Photos & Prices",
      detailAr: "صور جذابة وأسعار واضحة لزبائنك",
      detailEn: "Beautiful photos and clear pricing.",
    },
    {
      icon: "📱",
      ar: "طلب مباشر عبر واتساب",
      en: "Direct WhatsApp Orders",
      detailAr: "اجعل التواصل والطلب أسهل بضغطة واحدة",
      detailEn: "Make ordering easier with one tap.",
    },
    {
      icon: "💻",
      ar: "تصميم لكل الأجهزة",
      en: "Responsive Design",
      detailAr: "موقع يعمل بشكل جميل على الهاتف والكمبيوتر",
      detailEn: "A beautiful experience on every screen.",
    },
  ];

  return (
    <main
      dir={arabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-[#100e0c] text-white"
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #100e0c;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-13px) rotate(1deg);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: .45;
            transform: scale(1);
          }
          50% {
            opacity: .8;
            transform: scale(1.12);
          }
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float-card {
          animation: float 6s ease-in-out infinite;
        }

        .glow-orb {
          animation: glow 7s ease-in-out infinite;
        }

        .reveal {
          animation: reveal .9s ease both;
        }

        .glass-card {
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

        .service-card {
          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .service-card:hover {
          transform:
            perspective(900px)
            rotateX(4deg)
            rotateY(-4deg)
            translateY(-9px);
          border-color: rgba(244,123,53,.55);
          box-shadow: 0 25px 60px rgba(244,123,53,.12);
        }

        .orange-text {
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
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="glow-orb absolute -right-48 top-20 h-[500px] w-[500px] rounded-full bg-[#a64c20]/15 blur-[130px]" />
        <div className="glow-orb absolute -left-48 top-[650px] h-[500px] w-[500px] rounded-full bg-[#d58a37]/10 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 px-6 py-5">
        <Link href="/" className="text-3xl font-black tracking-tight">
          <bdi dir="ltr">
            WEB<span className="orange-text">FIKRA</span>
          </bdi>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-semibold text-white/70 md:flex">
          <a className="transition hover:text-[#ffad75]" href="#services">
            {arabic ? "خدماتنا" : "Services"}
          </a>
          <a className="transition hover:text-[#ffad75]" href="#portfolio">
            {arabic ? "أعمالنا" : "Our Work"}
          </a>
          <a className="transition hover:text-[#ffad75]" href="#contact">
            {arabic ? "تواصل معنا" : "Contact"}
          </a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/restaurants/login"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white/85 transition hover:border-[#f47b35]/70 hover:text-[#ffad75]"
          >
            {arabic ? "دخول المطاعم" : "Restaurant Login"}
          </Link>
          <Link
            href="/restaurants/register"
            className="rounded-full bg-gradient-to-r from-[#f47b35] to-[#d95e1d] px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-[#f47b35]/15 transition hover:-translate-y-0.5"
          >
            {arabic ? "إنشاء حساب مطعم" : "Create Restaurant Account"}
          </Link>
        </div>

        <button
          onClick={toggleLanguage}
          className="rounded-full border border-[#f47b35]/60 px-5 py-2 text-sm font-bold text-[#ffad75] transition hover:bg-[#f47b35] hover:text-white"
        >
          {arabic ? "EN" : "عربي"}
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="reveal relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#f47b35]/30 bg-[#f47b35]/10 px-5 py-2.5 text-sm font-bold text-[#ffc08e]">
              <span className="h-2 w-2 rounded-full bg-[#f47b35] shadow-[0_0_14px_#f47b35]" />
              {arabic
                ? "نصنع حضورك الرقمي"
                : "We Build Your Digital Presence"}
            </div>

            <h1 className="mb-7 text-5xl font-black leading-[1.3] tracking-tight md:text-7xl">
              {arabic ? (
                <>
                  مطعمك يستحق واجهة{" "}
                  <span className="orange-text">تفتح الشهية!</span>
                </>
              ) : (
                <>
                  Your Restaurant Deserves an{" "}
                  <span className="orange-text">Appetizing Website!</span>
                </>
              )}
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-9 text-white/60">
              {arabic
                ? "نصمم لك موقعاً إلكترونياً أنيقاً يعرض منيو مطعمك ويسهّل على زبائنك الطلب."
                : "We design elegant websites that showcase your restaurant menu and make ordering easier for your customers."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/order"
                className="rounded-full bg-gradient-to-r from-[#f47b35] to-[#d95e1d] px-9 py-4 font-black text-white shadow-[0_10px_35px_rgba(244,123,53,.28)] transition hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(244,123,53,.4)]"
              >
                {arabic ? "اطلب موقعك" : "Order Your Website"}
              </Link>

              <a
                href="#portfolio"
                className="rounded-full border border-white/20 bg-white/5 px-9 py-4 font-bold text-white transition hover:border-[#f47b35]/60 hover:bg-white/10"
              >
                {arabic ? "شاهد أعمالنا" : "See Our Work"}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/50">
              <div>
                <span className="mb-1 block text-xl font-black text-[#ffad75]">
                  3D
                </span>
                {arabic ? "تصميم عصري" : "Modern Design"}
              </div>
              <div>
                <span className="mb-1 block text-xl font-black text-[#ffad75]">
                  24/7
                </span>
                {arabic ? "متاح لزبائنك" : "Always Accessible"}
              </div>
              <div>
                <span className="mb-1 block text-xl font-black text-[#ffad75]">
                  100%
                </span>
                {arabic ? "متوافق مع الهاتف" : "Mobile Friendly"}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="glow-orb absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(244,123,53,.28),rgba(126,58,27,.12)_45%,transparent_72%)] blur-2xl" />

            <div className="float-card relative rounded-[2.2rem] border border-[#f4a36b]/30 bg-gradient-to-br from-[#68402b]/50 via-[#241a15]/80 to-[#100e0c] p-2 shadow-[0_35px_100px_rgba(0,0,0,.65),0_0_70px_rgba(198,91,37,.13)]">
              <div className="overflow-hidden rounded-[1.8rem] border border-white/10">
                <video
                  className="aspect-[4/5] w-full object-cover"
                  src="/webfikra-hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>

              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-[#f4a36b]/30 bg-[#211710]/90 px-5 py-3 shadow-2xl backdrop-blur-xl">
                <span className="text-sm font-bold text-[#ffc08e]">
                  {arabic
                    ? "تصميم يلفت الانتباه ✨"
                    : "Design That Stands Out ✨"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="relative z-10 border-y border-white/[0.06] bg-gradient-to-b from-[#19130f] to-[#100e0c] px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-sm font-black tracking-[.25em] text-[#f49a60]">
              {arabic ? "ماذا نقدم؟" : "WHAT WE OFFER"}
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              {arabic
                ? "كل ما يحتاجه مطعمك"
                : "Everything Your Restaurant Needs"}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/50">
              {arabic
                ? "حلول رقمية بسيطة وأنيقة تجعل مطعمك أقرب إلى زبائنه."
                : "Simple, elegant digital solutions that bring your restaurant closer to its customers."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={service.en}
                className="service-card glass-card rounded-3xl p-8"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#f47b35]/20 bg-gradient-to-br from-[#f47b35]/20 to-[#f47b35]/5 text-3xl shadow-[0_10px_30px_rgba(244,123,53,.08)]">
                  {service.icon}
                </div>

                <h3 className="mb-4 text-xl font-black">
                  {arabic ? service.ar : service.en}
                </h3>

                <p className="text-sm leading-7 text-white/50">
                  {arabic ? service.detailAr : service.detailEn}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-gradient-to-r from-[#f47b35] to-[#ffc078]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-black tracking-[.25em] text-[#f49a60]">
              {arabic ? "أعمالنا" : "OUR PORTFOLIO"}
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              {arabic
                ? "موقعك القادم يبدأ من هنا"
                : "Your Next Website Starts Here"}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/50">
              {arabic
                ? "نصمم واجهات جميلة وبسيطة تساعد مطعمك على عرض منتجاته والوصول إلى زبائن جدد."
                : "We create beautiful, simple websites that help restaurants showcase their products and reach new customers."}
            </p>
          </div>

          <div className="glass-card relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,123,53,.13),transparent_65%)]" />

            <div className="relative">
              <div className="mb-7 text-6xl md:text-8xl">
                🍕 🥐 🍰
              </div>

              <h3 className="text-2xl font-black">
                {arabic
                  ? "نماذج أعمالنا قريباً"
                  : "Our Sample Projects Coming Soon"}
              </h3>

              <p className="mt-4 text-white/50">
                {arabic
                  ? "نعمل على تجهيز نماذج مميزة لعرض أفكارنا."
                  : "We're preparing beautiful examples to showcase our work."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#f47b35]/20 bg-gradient-to-br from-[#472719] via-[#251912] to-[#17110e] px-7 py-14 text-center shadow-[0_25px_80px_rgba(0,0,0,.35)] md:px-16">
          <p className="mb-4 text-sm font-bold text-[#ffb17e]">
            {arabic
              ? "مشروعك يستحق الأفضل"
              : "YOUR BUSINESS DESERVES BETTER"}
          </p>

          <h2 className="mx-auto max-w-3xl text-3xl font-black leading-relaxed md:text-5xl">
            {arabic
              ? "جاهز لنصنع لمطعمك حضوراً رقمياً مميزاً؟"
              : "Ready to Give Your Restaurant a Remarkable Digital Presence?"}
          </h2>

          <Link
            href="/order"
            className="mt-9 inline-block rounded-full bg-[#f47b35] px-9 py-4 font-black shadow-lg transition hover:-translate-y-1 hover:bg-[#ff9250]"
          >
            {arabic ? "ابدأ مشروعك الآن" : "Start Your Project"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="relative z-10 border-t border-white/10 bg-[#0b0908] px-6 py-14"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-right">
          <div>
            <div className="text-3xl font-black">
              <bdi dir="ltr">
                WEB<span className="orange-text">FIKRA</span>
              </bdi>
            </div>

            <p className="mt-3 text-white/40">
              {arabic
                ? "نحو حضور رقمي أجمل لمطعمك."
                : "A better digital presence for your restaurant."}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://wa.me/96171524556"
              className="font-bold text-[#ffad75] transition hover:text-white"
            >
              WhatsApp: 71 524 556
            </a>

            <a
              href="https://instagram.com/webfikra"
              className="text-white/60 transition hover:text-[#ffad75]"
            >
              Instagram: @webfikra
            </a>

            <a
              href="mailto:webfikra@proton.me"
              className="text-white/60 transition hover:text-[#ffad75]"
            >
              webfikra@proton.me
            </a>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-white/30">
          © 2026 WEBFIKRA.{" "}
          {arabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </p>
      </footer>
    </main>
  );
}
