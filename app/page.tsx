"use client";

import { useState } from "react";
import Link from "next/link";
import RestaurantExperience from "./components/RestaurantExperience";
import LeadQuoteForm from "./components/LeadQuoteForm";
import BrandStudioPreview from "./components/BrandStudioPreview";
import { useWebfikraLanguage } from "./hooks/useWebfikraLanguage";

const services = [
  { n: "01", icon: "✦", ar: "مواقع تعكس هوية مطعمك", en: "Websites built around your brand", detailAr: "تصميم مخصّص يحوّل طابع مطعمك إلى حضور رقمي أنيق ومختلف.", detailEn: "A tailored digital presence shaped by your restaurant's identity.", meta: "BRAND EXPERIENCE" },
  { n: "02", icon: "▦", ar: "منيو رقمي يفتح الشهية", en: "A menu worth exploring", detailAr: "أصناف منظّمة، صور، مكونات وأسعار واضحة بتجربة مريحة.", detailEn: "Beautifully organized dishes, photos, ingredients, and prices.", meta: "DIGITAL MENU" },
  { n: "03", icon: "↗", ar: "طلبات أسهل عبر واتساب", en: "Simpler WhatsApp ordering", detailAr: "سلة تجمع الأصناف والكميات، ثم تجهّز رسالة طلب مرتبة عبر واتساب.", detailEn: "A cart that prepares a clear WhatsApp order with items and quantities.", meta: "ORDERING FLOW" },
  { n: "04", icon: "⌁", ar: "تجربة ممتازة على كل شاشة", en: "Designed for every screen", detailAr: "واجهات سريعة ومتجاوبة، نهتم بكل تفصيل فيها من الهاتف إلى الكمبيوتر.", detailEn: "Thoughtful, responsive layouts that feel right on mobile and desktop.", meta: "MOBILE FIRST" },
];

const concepts = [
  { num: "01", tag: "RESTAURANT", ar: "حضور يفتح الشهية", en: "An appetite for design", subAr: "مطاعم وبرغر", subEn: "Restaurants & burgers", photo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85" },
  { num: "02", tag: "COFFEE SHOP", ar: "قهوة بطابع مختلف", en: "A more considered coffee break", subAr: "مقاهٍ ومشروبات", subEn: "Cafés & beverages", photo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85" },
  { num: "03", tag: "BAKERY", ar: "التفاصيل الطازجة", en: "Fresh thinking, every day", subAr: "مخابز ومعجنات", subEn: "Bakeries & pastries", photo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85" },
];

const process = [
  { n: "01", ar: "نسمع فكرتك", en: "We listen first", detailAr: "نتعرف على نشاطك وطابعه ومحتواه وما يحتاجه زبائنك فعلياً.", detailEn: "We learn about your business, your style, and what your customers need." },
  { n: "02", ar: "نصمم التجربة", en: "We design the experience", detailAr: "نحوّل أفكارك إلى موقع واضح وجذاب، مع مساحة للتعديلات المتفق عليها.", detailEn: "We turn your vision into a compelling, purposeful website, then refine it together." },
  { n: "03", ar: "نراجع ثم نطلق", en: "We review and launch", detailAr: "نتحقق من التفاصيل وتجربة الهاتف ونجهّز النسخة المعتمدة للنشر.", detailEn: "We review the details, test mobile layouts, and prepare the approved site for launch." },
];

const plans = [
  { n: "01", code: "PRESENCE", ar: "الحضور الرقمي", en: "Digital Presence", detailAr: "البداية المثالية لعرض هوية نشاطك ومعلوماته بشكل احترافي.", detailEn: "A polished home for your business and the essentials customers need.", arFeatures: ["واجهة خاصة بهويتك", "معلومات النشاط والتواصل", "تصميم متجاوب", "روابط واتساب والموقع"], enFeatures: ["Custom brand-led design", "Business & contact details", "Responsive layout", "WhatsApp & location links"] },
  { n: "02", code: "MENU", ar: "المنيو التفاعلي", en: "Interactive Menu", detailAr: "اعرض أصنافك بطريقة أجمل، مع خيارات تجربة طلب حسب الاتفاق.", detailEn: "Showcase every dish beautifully, with optional ordering features.", arFeatures: ["كل مزايا الحضور الرقمي", "أقسام وأصناف واضحة", "صور ومكونات وأسعار", "سلة وطلبات حسب المشروع"], enFeatures: ["Everything in Presence", "Organized menu categories", "Photos, ingredients & prices", "Cart & ordering by scope"] },
  { n: "03", code: "CUSTOM", ar: "تجربة مخصصة", en: "Custom Experience", detailAr: "للمشاريع التي تحتاج صفحات أو وظائف أو حلولاً مصممة خصيصاً لها.", detailEn: "For brands that need more specialized pages, features, and experiences.", arFeatures: ["حلول بحسب احتياجاتك", "صفحات وأقسام إضافية", "تدفقات طلب مخصصة", "إمكانية تطوير لوحة إدارة"], enFeatures: ["Features shaped to your needs", "Additional pages & sections", "Custom order journeys", "Admin dashboard as an option"] },
];

const faqs = [
  { ar: "هل سيكون الموقع مناسباً للهاتف؟", en: "Will my site work well on mobile?", answerAr: "نعم. نضع تجربة الهاتف في مقدمة التصميم، ونتأكد من أن الواجهة تتكيف مع الأجهزة اللوحية والكمبيوتر.", answerEn: "Yes. We design mobile-first, with layouts adapted for tablets and desktop screens too." },
  { ar: "هل يمكن إضافة منيو وسلة طلبات؟", en: "Can I get a menu with an ordering cart?", answerAr: "نعم، يمكننا إنشاء منيو مع سلة ترتب تفاصيل الأصناف والكميات وتجهّز الطلب لإرساله عبر واتساب، بحسب نطاق المشروع.", answerEn: "Yes. We can create a menu and cart that prepare item details and quantities for WhatsApp ordering, depending on the agreed project scope." },
  { ar: "هل يمكنني تعديل الأسعار والأصناف لاحقاً؟", en: "Can my prices and dishes be updated later?", answerAr: "بالتأكيد. نحدد طريقة التحديث عند الاتفاق: تعديلات ننفذها لك، أو لوحة إدارة مخصصة إذا احتجتها.", answerEn: "Of course. Updates can be managed by us or through a custom dashboard if that is included in your project." },
  { ar: "هل أحتاج دومين خاصاً؟", en: "Do I need my own domain?", answerAr: "يمكن استخدام رابط نشر مبدئي، ثم ربط دومين خاص عندما يكون جاهزاً. نوضح تكاليف الدومين والاستضافة قبل الاتفاق.", answerEn: "You can start with a temporary publishing link and connect a custom domain later. We clarify domain and hosting costs in advance." },
  { ar: "كم تبلغ تكلفة تصميم الموقع؟", en: "How much does a website cost?", answerAr: "يعتمد السعر على الصفحات والمحتوى والميزات المطلوبة. بعد معرفة التفاصيل، نقدم عرضاً واضحاً يناسب نطاق المشروع.", answerEn: "Pricing depends on your pages, content, and features. We provide a clear quote once we understand the scope." },
  { ar: "هل يمكن إضافة العربية والإنجليزية؟", en: "Can my website use Arabic and English?", answerAr: "نعم، يمكن تصميم تجربة تدعم اللغتين، مع مراعاة اتجاه النص وترتيب المحتوى في كل نسخة.", answerEn: "Yes. We can build bilingual experiences with layouts designed for both left-to-right and right-to-left reading." },
];

export default function Home() {
  const { arabic, toggleLanguage } = useWebfikraLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = (ar: string, en: string) => (arabic ? ar : en);

  const nav = [
    { href: "#services", ar: "الخدمات", en: "Services" },
    { href: "#experience", ar: "جرّب المنيو", en: "Live Demo" },
    { href: "#brand-studio", ar: "صمّم فكرتك", en: "Style Studio" },
    { href: "#showcase", ar: "أفكارنا", en: "Concepts" },
    { href: "#packages", ar: "الحلول", en: "Solutions" },
    { href: "#faq", ar: "الأسئلة", en: "FAQ" },
  ];

  return (
    <main id="home" lang={arabic ? "ar" : "en"} dir={arabic ? "rtl" : "ltr"} className="wf-site min-h-screen overflow-x-hidden bg-[#12100e] text-[#fff8f0]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171310]/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-7">
          <a href="#home" aria-label="WEBFIKRA home" className="relative z-10 shrink-0 text-[26px] font-black tracking-[-.05em] sm:text-[30px]">
            <bdi dir="ltr">WEB<span className="text-[#ef9754]">FIKRA</span><span className="text-[#ef9754]">.</span></bdi>
          </a>

          <nav aria-label={t("القائمة الرئيسية", "Main navigation")} className="hidden items-center gap-6 text-[13px] font-bold text-white/65 xl:flex">
            {nav.map((item) => <a key={item.href} href={item.href} className="transition hover:text-[#ffad74]">{t(item.ar, item.en)}</a>)}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={toggleLanguage} aria-label={t("Switch to English", "تغيير اللغة إلى العربية")} className="rounded-full border border-white/20 px-3.5 py-2.5 text-xs font-black text-[#f6b681] transition hover:border-[#ef9754] hover:bg-white/5">{arabic ? "EN" : "عربي"}</button>
            <a href="#contact" className="hidden rounded-full bg-[#ef9754] px-5 py-3 text-xs font-black text-[#21150c] shadow-[0_8px_35px_rgba(233,130,57,.18)] transition hover:-translate-y-0.5 hover:bg-[#ffb47c] sm:inline-flex">
              {t("اطلب موقعك", "Start a Project")} <span className="ms-2">↗</span>
            </a>
            <button type="button" aria-label={t("فتح القائمة", "Toggle navigation")} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xl xl:hidden">
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" aria-label={t("قائمة الهاتف", "Mobile navigation")} className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-white/15 bg-[#171310] px-6 pb-6 pt-3 shadow-2xl xl:hidden">
            {nav.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/5">{t(item.ar, item.en)}</a>)}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 rounded-full bg-[#ef9754] px-5 py-3 text-center text-sm font-black text-[#21150c]">{t("ابدأ مشروعك", "Start your project")}</a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/[.07]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_20%,rgba(151,74,35,.20),transparent_48%),radial-gradient(ellipse_at_0%_85%,rgba(164,100,34,.11),transparent_50%)]" />
        <div className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-[#e78c43]/[.055] blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-7 md:pb-28 md:pt-24 lg:grid-cols-[1.04fr_.96fr] lg:gap-20">
          <div className="wf-reveal">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#a56e47]/40 bg-[#5d3b26]/25 px-4 py-2 text-[11px] font-black tracking-[.11em] text-[#f4b989]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e9a474]" />
              WEBFIKRA / DIGITAL EXPERIENCES
            </div>
            <h1 className="max-w-[720px] text-[clamp(2.65rem,4.5vw,4.35rem)] font-black leading-[1.22] tracking-[-.045em]">
              {t("مطعمك يستحق", "Your restaurant deserves")}<br />
              <span className="wf-gold-text">{t("أكثر من مجرد", "more than just")}</span><br />
              {t("موقع إلكتروني.", "a website.")}
            </h1>
            <p className="mt-8 max-w-[590px] text-[16px] leading-[2.1] text-[#c6b9ab] md:text-lg">
              {t("نحوّل هويّة مطعمك أو مقهاك إلى تجربة رقمية تُلفت الأنظار، تُظهر أصنافك بأفضل صورة، وتجعل الوصول إليك والطلب منك أكثر سهولة.", "We turn your restaurant or café into a striking digital experience that showcases your dishes and makes connecting and ordering feel effortless.")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="group inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-[#f0a065] px-8 font-black text-[#24150d] shadow-[0_12px_45px_rgba(239,140,76,.25)] transition hover:-translate-y-1 hover:bg-[#ffc193]">
                {t("لنصمّم موقعك", "Let's build your website")}
                <span className="text-xl transition group-hover:translate-x-1" aria-hidden="true">↗</span>
              </a>
              <a href="#experience" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 font-bold text-white transition hover:border-[#e4a878] hover:bg-white/10">
                <span aria-hidden="true">◉</span> {t("جرّب التجربة", "Try the experience")}
              </a>
            </div>
            <div className="mt-12 flex max-w-[580px] flex-wrap gap-x-7 gap-y-4 border-t border-white/10 pt-7 text-xs font-bold text-[#bfae9e]">
              <span><span className="me-2 text-[#f0a065]">✦</span>{t("تصميم يعكس هويتك", "Made for your brand")}</span>
              <span><span className="me-2 text-[#f0a065]">✦</span>{t("للجوال والكمبيوتر", "Mobile first")}</span>
              <span><span className="me-2 text-[#f0a065]">✦</span>{t("عربي وإنجليزي", "Arabic & English")}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-12 rounded-full bg-[#d97938]/15 blur-[90px]" />
            <div className="wf-float relative ms-4 overflow-hidden rounded-[34px] border border-[#d59a69]/35 bg-[#2a1a11] p-2 shadow-[0_36px_110px_rgba(0,0,0,.55)] sm:ms-8">
              <div className="relative aspect-[5/5.4] overflow-hidden rounded-[28px] bg-[#4e2b19]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(180deg,rgba(17,12,8,.12),rgba(17,12,8,.55)),url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80)" }} />
                <video className="absolute inset-0 h-full w-full object-cover" src="/webfikra-hero.mp4" autoPlay muted loop playsInline preload="metadata" poster="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80" aria-label={t("عرض مرئي لأطعمة المطاعم", "Restaurant food showcase")} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140e0c]/85 via-transparent to-[#1c120d]/10" />
                <div className="absolute inset-x-6 bottom-7 flex items-end justify-between gap-4 text-white sm:inset-x-9">
                  <div>
                    <span className="text-[10px] font-bold tracking-[.2em] text-[#ffc99c]">DIGITAL DINING EXPERIENCE</span>
                    <p className="mt-2 text-2xl font-black sm:text-3xl">{t("كل تفصيل يترك أثراً.", "Every detail matters.")}</p>
                  </div>
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/40 bg-white/15 text-2xl backdrop-blur-lg" aria-hidden="true">↗</div>
                </div>
              </div>
            </div>
            <div className="wf-float-delayed absolute -bottom-7 -start-2 z-10 max-w-[250px] rounded-2xl border border-white/20 bg-[#29211b]/95 px-5 py-4 shadow-[0_16px_48px_rgba(0,0,0,.55)] backdrop-blur-xl sm:-start-4">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ee995b]/15 text-xl">✦</span><div><p className="text-sm font-black">{t("هوية لا تُنسى", "Made to stand out")}</p><p className="mt-1 text-xs text-white/50">{t("لمطعمك، وبأسلوبك", "Your brand. Your style.")}</p></div></div>
            </div>
            <div className="absolute -end-1 top-9 z-10 hidden rounded-2xl border border-[#dea56f]/25 bg-[#241d18]/85 px-5 py-3 shadow-xl backdrop-blur-lg sm:block">
              <p className="text-[10px] font-bold tracking-[.2em] text-[#e8a774]">WEBFIKRA / 2026</p>
              <p className="mt-1 text-xs font-black">{t("أفكار تتحوّل لتجارب", "Ideas made tangible")}</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden border-t border-white/[.08] bg-[#211912]/55">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 text-[11px] font-black tracking-[.1em] text-[#b9a393] sm:justify-between sm:px-7">
            <span>WEBSITE DESIGN</span><span className="text-[#ef9857]">✦</span><span>DIGITAL MENUS</span><span className="text-[#ef9857]">✦</span><span>RESTAURANT EXPERIENCES</span><span className="text-[#ef9857]">✦</span><span>MOBILE FIRST</span>
          </div>
        </div>
      </section>

      {/* Services — alternate light editorial treatment */}
      <section id="services" className="scroll-mt-24 bg-[#f3ece2] px-5 py-24 text-[#251c16] sm:px-7 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-7 border-b border-[#cfbfb0] pb-11 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="mb-5 text-xs font-black tracking-[.22em] text-[#ab693c]">{t("01 / ماذا نقدّم", "01 / WHAT WE DO")}</p>
              <h2 className="text-4xl font-black leading-[1.25] tracking-tight md:text-6xl">
                {t("لا نصمّم صفحات فقط.", "We don't just make pages.")}<br />
                <span className="text-[#ad6738]">{t("نصنع انطباعاً يبقى.", "We create lasting impressions.")}</span>
              </h2>
            </div>
            <p className="max-w-lg text-base leading-9 text-[#706052]">
              {t("كل تفصيل في موقعك له هدف: أن يقدّم علامتك بشكل يليق بها، وأن يمنح الزائر طريقاً واضحاً وسريعاً من الاكتشاف إلى التواصل أو الطلب.", "Every detail has a purpose: represent your brand beautifully and guide visitors smoothly from discovery to connection or ordering.")}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article key={service.n} className="wf-service-card group flex min-h-[315px] flex-col rounded-[28px] border border-[#dacfc2] bg-[#fbf7f1] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#ce9362] hover:shadow-[0_22px_55px_rgba(96,61,33,.12)]">
                <div className="mb-12 flex items-start justify-between"><span className="text-xs font-black text-[#b58e75]">{service.n} / 04</span><span className="text-[32px] text-[#b66e3c]" aria-hidden="true">{service.icon}</span></div>
                <h3 className="max-w-[220px] text-xl font-black leading-[1.5]">{t(service.ar, service.en)}</h3>
                <p className="mt-3 text-sm leading-7 text-[#78685d]">{t(service.detailAr, service.detailEn)}</p>
                <p className="mt-auto pt-8 text-[10px] font-black tracking-[.15em] text-[#bc8b6a]">{service.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Existing interactive product preview */}
      <RestaurantExperience arabic={arabic} />

      {/* Editorial story with honest illustrative dashboard mock */}
      <section className="overflow-hidden bg-[#f3ece2] px-5 py-24 text-[#231b17] sm:px-7 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="rounded-[32px] border border-[#d8c6b5] bg-[#fffaf4] p-4 shadow-[0_28px_75px_rgba(64,40,22,.11)] sm:p-7">
            <div className="overflow-hidden rounded-[20px] border border-[#e4d8ca] bg-white">
              <div className="flex items-center justify-between border-b border-[#ede5dc] px-5 py-4">
                <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#eab99a]" /><span className="h-2.5 w-2.5 rounded-full bg-[#e6d29c]" /><span className="h-2.5 w-2.5 rounded-full bg-[#b8c7a8]" /></div>
                <span className="text-[11px] font-black tracking-[.12em] text-[#927865]">MENU / DESIGN PREVIEW</span>
              </div>
              <div className="grid grid-cols-[70px_1fr] sm:grid-cols-[104px_1fr]">
                <div className="space-y-4 border-e border-[#ece5de] bg-[#faf7f2] p-4 sm:p-5">
                  {["◉", "▦", "✦", "⌁"].map((icon, i) => <div key={icon} className={i === 1 ? "grid h-9 w-9 place-items-center rounded-xl bg-[#d9955f] font-black text-white" : "grid h-9 w-9 place-items-center rounded-xl bg-white text-[#af927b]"}>{icon}</div>)}
                </div>
                <div className="p-4 sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-2"><div><p className="text-[10px] font-bold text-[#a58c79]">DESIGN CONCEPT</p><p className="text-lg font-black">{t("قائمة مطعمك", "Your Menu")}</p></div><span className="rounded-full bg-[#edf4e6] px-3 py-1.5 text-[10px] font-bold text-[#5b7b3b]">PREVIEW</span></div>
                  <div className="relative h-28 overflow-hidden rounded-2xl bg-[#442e22] sm:h-36">
                    <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80)" }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#24140d]/80 to-transparent" />
                    <div className="absolute bottom-4 start-5 text-sm font-black text-white">{t("نكهة تعكس شخصيتك", "A taste of your story")}</div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {["🍔","🍕","🥗"].map((dish,i) => <div key={dish} className="rounded-xl bg-[#f8f1e8] px-2 py-4 text-center text-2xl"><span>{dish}</span><p className="mt-2 text-[9px] font-bold text-[#a8876f]">ITEM 0{i+1}</p></div>)}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-[#947a66]">{t("تصوّر بصري لواجهة منيو — ليس لوحة إدارة منشورة", "Illustrative menu design preview — not a live admin dashboard")}</p>
          </div>
          <div>
            <p className="mb-5 text-xs font-black tracking-[.22em] text-[#b77848]">{t("03 / تجربة مدروسة", "03 / THOUGHTFUL DESIGN")}</p>
            <h2 className="max-w-xl text-4xl font-black leading-[1.25] md:text-6xl">
              {t("من أوّل لمسة.", "From the first tap.")}<br />
              <span className="text-[#ae6738]">{t("حتى آخر تفصيل.", "To the final detail.")}</span>
            </h2>
            <p className="mt-7 max-w-lg text-base leading-9 text-[#76675b]">{t("نصمم واجهة تساعد الزبون على الوصول لما يريد، دون زحمة أو تشتيت. المحتوى، الأقسام، الألوان والحركة كلها تخدم تجربة واحدة متكاملة.", "We craft clear interfaces that help guests find what they need, without clutter. Content, hierarchy, color, and motion all work together.")}</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                { n:"01",ar:"تنقّل سلس",en:"Effortless navigation" },
                { n:"02",ar:"صور وأقسام واضحة",en:"Beautiful product presentation" },
                { n:"03",ar:"تفاصيل مناسبة لهويتك",en:"Made for your identity" },
                { n:"04",ar:"تجربة طلب مريحة",en:"A simpler ordering flow" },
              ].map((item) => <div key={item.n} className="border-t border-[#d5c4b6] py-4"><span className="me-3 text-xs font-black text-[#bb7d50]">{item.n}</span><span className="text-sm font-black">{t(item.ar,item.en)}</span></div>)}
            </div>
            <a className="mt-8 inline-flex items-center gap-3 font-black text-[#a75e30] underline underline-offset-8 transition hover:text-[#59371e]" href="#contact">{t("لنصنع تجربتك الخاصة", "Let's create your experience")} ↗</a>
          </div>
        </div>
      </section>

      {/* Interactive brand customization preview */}
      <BrandStudioPreview arabic={arabic} />

      {/* Concepts: clearly hypothetical, not fabricated client testimonials */}
      <section id="showcase" className="scroll-mt-24 border-t border-white/10 bg-[#161310] px-5 py-24 sm:px-7 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="mb-5 text-xs font-black tracking-[.22em] text-[#e7a16d]">{t("04 / رؤيتنا الإبداعية", "04 / CREATIVE DIRECTIONS")}</p>
              <h2 className="text-4xl font-black leading-[1.25] md:text-6xl">{t("كل مطعم له قصّته.", "Every brand has a story.")}<br /><span className="text-[#eda269]">{t("ولكل قصة تصميم.", "Every story deserves a design.")}</span></h2>
            </div>
            <p className="max-w-sm text-sm leading-8 text-white/55">{t("نماذج إبداعية تصورية تعرض أساليب يمكننا تصميمها. ليست مشاريع عملاء مكتملة أو منفّذة.", "Creative concept directions that showcase what's possible. These are not completed client projects.")}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {concepts.map((item) => (
              <article key={item.tag} className="group relative isolate min-h-[410px] overflow-hidden rounded-[30px] border border-white/10 bg-[#3d3025] sm:min-h-[470px]">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.07]" style={{ backgroundImage: "url(" + item.photo + ")" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130e0b]/95 via-[#1b120d]/30 to-[#1a100c]/25" />
                <div className="relative flex h-full min-h-[410px] flex-col justify-between p-7 sm:min-h-[470px]">
                  <div className="flex items-start justify-between"><span className="rounded-full border border-white/40 bg-black/25 px-4 py-2 text-[10px] font-black tracking-[.15em] backdrop-blur-lg">{item.tag}</span><span className="text-xs font-black text-white/70">{item.num} / 03</span></div>
                  <div>
                    <p className="mb-2 text-xs font-bold text-[#f1b98a]">{t(item.subAr,item.subEn)}</p>
                    <h3 className="text-2xl font-black sm:text-3xl">{t(item.ar,item.en)}</h3>
                    <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-4"><span className="text-[10px] font-bold tracking-widest text-white/60">CREATIVE CONCEPT</span><span className="text-xl text-[#f2ad75]">↗</span></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-[#211912] px-5 py-24 sm:px-7 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid items-end gap-7 lg:grid-cols-2">
            <div><p className="mb-5 text-xs font-black tracking-[.22em] text-[#e7a16d]">{t("05 / كيف نعمل", "05 / HOW WE WORK")}</p><h2 className="text-4xl font-black leading-[1.25] md:text-6xl">{t("من الفكرة للشاشة.", "From idea to screen.")}<br /><span className="text-[#e7a16d]">{t("ببساطة ووضوح.", "Made simple.")}</span></h2></div>
            <p className="max-w-lg text-base leading-9 text-white/55">{t("خطوات مدروسة، وتواصل واضح، وتصميم مخصص لطبيعة نشاطك. لا نؤمن بنسخ القالب نفسه لكل مطعم.", "A thoughtful process, straightforward communication, and a tailored result. We don't believe in fitting every restaurant into the same template.")}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {process.map((step) => <article key={step.n} className="rounded-[28px] border border-[#72533e]/50 bg-[#30241b] p-8"><span className="text-6xl font-black text-[#d68c56]/40">{step.n}</span><h3 className="mt-12 text-2xl font-black">{t(step.ar,step.en)}</h3><p className="mt-4 text-sm leading-8 text-white/55">{t(step.detailAr,step.detailEn)}</p></article>)}
          </div>
        </div>
      </section>

      {/* Quote-led packages: no invented pricing */}
      <section id="packages" className="scroll-mt-24 bg-[#f5eee5] px-5 py-24 text-[#241a15] sm:px-7 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center"><p className="mb-5 text-xs font-black tracking-[.22em] text-[#af713f]">{t("06 / الحل المناسب لك", "06 / PICK YOUR DIRECTION")}</p><h2 className="text-4xl font-black leading-[1.25] md:text-6xl">{t("حجم فكرتك يحدد الحل.", "Your idea shapes the solution.")}<br /><span className="text-[#b97140]">{t("ليس قالباً للجميع.", "Never one-size-fits-all.")}</span></h2><p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#7c6758]">{t("هذه مستويات للخدمة وليست أسعاراً ثابتة. نحدد السعر والمدة والمزايا بدقة بعد فهم طلبك.", "These are service directions, not fixed-price plans. We agree on scope, cost, and timing after discussing your needs.")}</p></div>
          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan,i) => <article key={plan.code} className={i===1 ? "relative flex flex-col rounded-[30px] border-2 border-[#c9804d] bg-[#241a15] p-8 text-white shadow-[0_24px_60px_rgba(124,72,31,.18)]" : "relative flex flex-col rounded-[30px] border border-[#decfc0] bg-[#fffaf4] p-8"}>
              {i===1 && <span className="absolute -top-4 start-7 rounded-full bg-[#efa36d] px-5 py-2 text-xs font-black text-[#2b1b11]">{t("خيار مقترح", "SUGGESTED OPTION")}</span>}
              <p className={"text-xs font-black tracking-[.22em] " + (i===1?"text-[#efa36d]":"text-[#b77b54]")}>{plan.code} / {plan.n}</p>
              <h3 className="mt-6 text-3xl font-black">{t(plan.ar,plan.en)}</h3>
              <p className={"mt-4 min-h-[74px] text-sm leading-8 " + (i===1?"text-white/65":"text-[#78695e]")}>{t(plan.detailAr,plan.detailEn)}</p>
              <p className={"mt-7 border-t pt-6 text-xs font-bold " + (i===1?"border-white/15 text-[#f4b58d]":"border-[#e6d6c6] text-[#a77a59]")}>{t("عرض سعر حسب متطلبات مشروعك", "Custom quote based on your project")}</p>
              <ul className="mt-6 flex-1 space-y-4">
                {(arabic ? plan.arFeatures : plan.enFeatures).map((feature) => <li key={feature} className="flex items-start gap-3 text-sm"><span className="font-black text-[#db8f57]">✓</span><span>{feature}</span></li>)}
              </ul>
              <a href="#contact" className={i===1?"mt-9 rounded-full bg-[#f1a46d] px-7 py-4 text-center text-sm font-black text-[#25170f] transition hover:bg-[#ffc193]":"mt-9 rounded-full border border-[#b9855b] px-7 py-4 text-center text-sm font-black text-[#9a5931] transition hover:bg-[#f4e3d1]"}>{t("اطلب عرض سعر", "Request a quote")} ↗</a>
            </article>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-b border-white/10 bg-[#1b1613] px-5 py-24 sm:px-7 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div><p className="mb-5 text-xs font-black tracking-[.22em] text-[#e9a370]">{t("الأسئلة الشائعة", "QUESTIONS & ANSWERS")}</p><h2 className="text-4xl font-black leading-[1.25] md:text-5xl">{t("كل فكرة كبيرة", "Every big idea")}<br /><span className="text-[#eaa36f]">{t("تبدأ بسؤال.", "starts with a question.")}</span></h2><p className="mt-6 max-w-sm text-sm leading-8 text-white/55">{t("نحب أن تكون التفاصيل واضحة منذ البداية. وإذا كان سؤالك مختلفاً، تواصل معنا مباشرة.", "We believe in clarity from the start. If you have another question, we're one message away.")}</p></div>
          <div className="space-y-3">
            {faqs.map((item) => <details key={item.en} className="group rounded-[18px] border border-white/10 bg-white/[.035] p-5 transition open:border-[#ec9a61]/35 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold [&::-webkit-details-marker]:hidden"><span>{t(item.ar,item.en)}</span><span className="text-xl text-[#f0a369] transition group-open:rotate-45" aria-hidden="true">+</span></summary>
              <p className="mt-4 text-sm leading-8 text-white/55">{t(item.answerAr,item.answerEn)}</p>
            </details>)}
          </div>
        </div>
      </section>

      <LeadQuoteForm arabic={arabic} />

      {/* Footer */}
      <footer className="border-t border-white/[.08] bg-[#0d0c0b] px-5 pb-8 pt-16 sm:px-7">
        <div className="mx-auto grid max-w-7xl gap-12 border-b border-white/10 pb-14 md:grid-cols-3">
          <div><a href="#home" className="text-4xl font-black tracking-[-.05em]"><bdi dir="ltr">WEB<span className="text-[#f0a065]">FIKRA.</span></bdi></a><p className="mt-5 max-w-xs text-sm leading-8 text-white/45">{t("نصمّم حضوراً رقمياً مختلفاً للمطاعم والمقاهي والمخابز. لأن فكرتك تستحق أن تكون مميزة.", "Distinct digital experiences for restaurants, cafés, and bakeries. Because your idea deserves to stand out.")}</p></div>
          <div><p className="mb-5 text-xs font-black tracking-widest text-[#e3a879]">{t("استكشف", "EXPLORE")}</p><div className="grid grid-cols-2 gap-4 text-sm text-white/60">
            <a className="hover:text-[#f0a065]" href="#services">{t("خدماتنا", "Services")}</a><a className="hover:text-[#f0a065]" href="#experience">{t("جرّب المنيو", "Live demo")}</a><a className="hover:text-[#f0a065]" href="#brand-studio">{t("جرّب تصميمك", "Design preview")}</a><a className="hover:text-[#f0a065]" href="#showcase">{t("نماذجنا", "Concepts")}</a><a className="hover:text-[#f0a065]" href="#packages">{t("حلولنا", "Solutions")}</a><a className="hover:text-[#f0a065]" href="#faq">{t("الأسئلة الشائعة", "FAQ")}</a><a className="hover:text-[#f0a065]" href="#contact">{t("اطلب موقعك", "Start a project")}</a>
          </div></div>
          <div><p className="mb-5 text-xs font-black tracking-widest text-[#e3a879]">{t("تواصل معنا", "GET IN TOUCH")}</p><div className="flex flex-col items-start gap-4 text-sm text-white/60">
            <a className="hover:text-[#f0a065]" href="https://wa.me/96171524556" target="_blank" rel="noopener noreferrer">WhatsApp: +961 71 524 556 ↗</a>
            <p className="text-xs leading-7 text-white/45">{t("نستقبل استفسارات تصميم المواقع عبر واتساب، ونجهّز عرضاً مخصصاً بعد مناقشة مشروعك.", "We discuss website inquiries over WhatsApp and prepare tailored quotes for your project.")}</p>
          </div></div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 pt-8 text-xs text-white/35"><span>© 2026 WEBFIKRA. {t("جميع الحقوق محفوظة.", "All rights reserved.")}</span><div className="flex flex-wrap gap-5"><Link className="hover:text-white" href="/privacy">{t("سياسة الخصوصية", "Privacy")}</Link><Link className="hover:text-white" href="/terms">{t("شروط الاستخدام", "Terms")}</Link></div><span>YOUR VISION, OUR DIGITAL CREATION.</span></div>
      </footer>
    </main>
  );
}
