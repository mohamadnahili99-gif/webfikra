"use client";

import { useState } from "react";

type Props = { arabic: boolean };
type ThemeId = "ember" | "olive" | "sand";
type BusinessId = "restaurant" | "cafe" | "bakery";
type Viewport = "phone" | "desktop";

const themes: Record<ThemeId, { ar: string; en: string; background: string; panel: string; accent: string; text: string; muted: string; actionText: string }> = {
  ember: { ar: "فحمي وبرتقالي", en: "Ember", background: "#1c1511", panel: "#32251d", accent: "#f3a165", text: "#fff7ed", muted: "#dbc3b1", actionText: "#23160d" },
  olive: { ar: "زيتي وذهبي", en: "Olive", background: "#20271c", panel: "#364333", accent: "#ebcc8a", text: "#f6f3e8", muted: "#c7d0bd", actionText: "#1a2318" },
  sand: { ar: "عاجي وبني", en: "Sand", background: "#f4ede2", panel: "#fffaf4", accent: "#75482f", text: "#302219", muted: "#7d6757", actionText: "#fffaf4" },
};

const businesses: Record<BusinessId, { ar: string; en: string; headingAr: string; headingEn: string; subtitleAr: string; subtitleEn: string; image: string; dishes: { emoji: string; ar: string; en: string }[] }> = {
  restaurant: {
    ar: "مطعم", en: "Restaurant", headingAr: "نكهة تُحكى.", headingEn: "Taste worth sharing.",
    subtitleAr: "أطباق تُحضّر بشغف، وتجربة تستحق الزيارة.", subtitleEn: "Made with passion. Served with care.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    dishes: [{ emoji: "🍔", ar: "برغر", en: "Burger" }, { emoji: "🍕", ar: "بيتزا", en: "Pizza" }, { emoji: "🥗", ar: "سلطات", en: "Salads" }],
  },
  cafe: {
    ar: "مقهى", en: "Café", headingAr: "لكل صباح حكاية.", headingEn: "Make every moment count.",
    subtitleAr: "قهوة استثنائية وأوقات تستحق التكرار.", subtitleEn: "Thoughtful coffee and moments to remember.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80",
    dishes: [{ emoji: "☕", ar: "قهوة", en: "Coffee" }, { emoji: "🧋", ar: "مشروبات", en: "Drinks" }, { emoji: "🍰", ar: "حلويات", en: "Desserts" }],
  },
  bakery: {
    ar: "مخبز", en: "Bakery", headingAr: "طازج، كل يوم.", headingEn: "Baked with heart.",
    subtitleAr: "رائحة المخبوزات الطازجة تبدأ من هنا.", subtitleEn: "Every fresh bake starts with a little love.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    dishes: [{ emoji: "🥐", ar: "كرواسون", en: "Croissants" }, { emoji: "🥖", ar: "مخبوزات", en: "Breads" }, { emoji: "🥨", ar: "معجنات", en: "Pastries" }],
  },
};

export default function BrandStudioPreview({ arabic }: Props) {
  const [name, setName] = useState("");
  const [businessId, setBusinessId] = useState<BusinessId>("restaurant");
  const [themeId, setThemeId] = useState<ThemeId>("ember");
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const theme = themes[themeId];
  const business = businesses[businessId];
  const displayName = name.trim() || (arabic ? "اسم مطعمك هنا" : "YOUR BRAND");
  const t = (ar: string, en: string) => arabic ? ar : en;

  function discussDesign() {
    const message = [
      t("مرحباً WEBFIKRA، أعجبني تصميم تجريبي وأريد مناقشة موقع مخصص.", "Hello WEBFIKRA, I tried your design preview and would like to discuss a custom website."),
      t("اسم النشاط: ", "Business name: ") + displayName,
      t("نوع النشاط: ", "Business type: ") + t(business.ar, business.en),
      t("الأسلوب اللوني: ", "Color direction: ") + t(theme.ar, theme.en),
      t("العرض المفضل: ", "Preferred preview: ") + t(viewport === "phone" ? "هاتف" : "كمبيوتر", viewport === "phone" ? "Mobile" : "Desktop"),
      t("هذا طلب استفسار، وليس طلباً لإنشاء موقع تلقائياً.", "This is an inquiry, not an automatic website creation request."),
    ].join("\n");
    window.open("https://wa.me/96171524556?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="brand-studio" dir={arabic ? "rtl" : "ltr"} className="scroll-mt-24 overflow-hidden border-y border-white/10 bg-[#15110f] px-5 py-24 text-white sm:px-7 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-xs font-black tracking-[.22em] text-[#f0ae7d]">WEBFIKRA / LIVE BRAND PREVIEW</p>
            <h2 className="text-4xl font-black leading-[1.25] md:text-6xl">
              {t("تخيّل موقعك", "See your brand")}<br />
              <span className="text-[#f2a66f]">{t("قبل أن نبدأ تصميمه.", "before we design it.")}</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-8 text-white/60 md:text-base">
            {t(
              "اختر نشاطك وألوانك، وأدخل اسمه لتشاهد تصوراً فورياً لشكل واجهته. التغيير هنا للعرض فقط، ولا ينشئ موقعاً حقيقياً أو يحفظ بياناتك.",
              "Choose your business, colors, and name to instantly preview a visual direction. This demonstration doesn't create a real website or save your data.",
            )}
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-white/15 bg-[#251c17] p-6 sm:p-8">
            <p className="text-xs font-black tracking-widest text-[#e9aa79]">{t("إعدادات التجربة", "CUSTOMIZE YOUR PREVIEW")}</p>

            <label htmlFor="preview-business-name" className="mt-7 block text-sm font-bold text-white/85">{t("اسم النشاط", "Your business name")}</label>
            <input
              id="preview-business-name"
              type="text"
              maxLength={35}
              autoComplete="off"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t("مثال: مطعم الذوق", "e.g. The Flavor House")}
              className="mt-3 w-full rounded-xl border border-[#6f5847] bg-[#17120f] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#f2a66f]"
            />

            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-bold text-white/85">{t("نوع النشاط", "Business type")}</legend>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(businesses) as BusinessId[]).map((id) => (
                  <button key={id} type="button" aria-pressed={businessId === id} onClick={() => setBusinessId(id)}
                    className={businessId === id ? "rounded-xl border border-[#e9a473] bg-[#e9a473]/15 px-2 py-3 text-xs font-black text-[#ffc69c]" : "rounded-xl border border-white/10 bg-white/[.035] px-2 py-3 text-xs text-white/65 hover:border-white/35"}>
                    {t(businesses[id].ar, businesses[id].en)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-bold text-white/85">{t("ألوان الهوية", "Color palette")}</legend>
              <div className="space-y-2">
                {(Object.keys(themes) as ThemeId[]).map((id) => (
                  <button type="button" key={id} aria-pressed={themeId === id} onClick={() => setThemeId(id)}
                    className={themeId === id ? "flex w-full items-center justify-between gap-3 rounded-xl border border-[#e9a473] bg-white/[.08] px-4 py-3 text-sm font-bold" : "flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[.025] px-4 py-3 text-sm text-white/75 hover:border-white/35"}>
                    <span>{t(themes[id].ar, themes[id].en)}</span>
                    <span className="flex gap-1" aria-hidden="true">
                      <span className="h-5 w-5 rounded-full border border-white/20" style={{background: themes[id].background}} />
                      <span className="h-5 w-5 rounded-full border border-white/20" style={{background: themes[id].accent}} />
                      <span className="h-5 w-5 rounded-full border border-white/20" style={{background: themes[id].panel}} />
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <button type="button" onClick={discussDesign} className="mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-[#f0a46e] px-5 py-4 text-sm font-black text-[#281911] transition hover:bg-[#ffc39a]">
              {t("ناقش هذا التصميم عبر واتساب", "Discuss this design on WhatsApp")}
              <span aria-hidden="true">↗</span>
            </button>
            <p className="mt-3 text-center text-xs leading-6 text-white/45">
              {t("سيفتح واتساب برسالة يمكنك مراجعتها قبل إرسالها.", "WhatsApp opens with a message you can review before sending.")}
            </p>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[30px] border border-white/15 bg-[#29211d] p-3 shadow-[0_30px_90px_rgba(0,0,0,.25)] sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 px-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f2a66f]"/><span className="text-[11px] font-black tracking-widest text-white/75">{t("معاينة حيّة", "LIVE PREVIEW")}</span>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#19130f] p-1">
                <button type="button" aria-pressed={viewport === "desktop"} onClick={() => setViewport("desktop")} className={viewport === "desktop" ? "rounded-full bg-[#f0a46e] px-3 py-2 text-xs font-bold text-[#24170e]" : "rounded-full px-3 py-2 text-xs text-white/60"}>
                  {t("كمبيوتر", "Desktop")}
                </button>
                <button type="button" aria-pressed={viewport === "phone"} onClick={() => setViewport("phone")} className={viewport === "phone" ? "rounded-full bg-[#f0a46e] px-3 py-2 text-xs font-bold text-[#24170e]" : "rounded-full px-3 py-2 text-xs text-white/60"}>
                  {t("هاتف", "Mobile")}
                </button>
              </div>
            </div>
            <div className="flex min-h-[570px] items-center justify-center rounded-[22px] bg-[#191512] p-2 sm:p-5">
              <div style={{maxWidth: viewport === "phone" ? 355 : 860, background: theme.background, color: theme.text}} className="w-full overflow-hidden rounded-[20px] border border-white/15 shadow-[0_22px_70px_rgba(0,0,0,.35)] transition-[max-width] duration-300">
                <div className="flex items-center justify-between gap-3 border-b px-5 py-4" style={{ borderColor: theme.accent + "35" }}>
                  <div className="min-w-0 truncate text-sm font-black">{displayName}</div>
                  <span className="shrink-0 text-[10px] font-bold" style={{color: theme.accent}}>MENU • {t("اطلب الآن", "ORDER")}</span>
                </div>
                <div className="relative min-h-[240px] bg-cover bg-center px-5 py-12 sm:px-8" style={{backgroundImage:"linear-gradient(90deg,rgba(13,10,8,.86),rgba(13,10,8,.26)),url(" + business.image + ")"}}>
                  <div className="relative max-w-sm">
                    <p className="text-[10px] font-black tracking-[.24em] text-[#ffdebb]">YOUR STORY / YOUR BRAND</p>
                    <h3 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">{t(business.headingAr, business.headingEn)}</h3>
                    <p className="mt-3 text-xs leading-6 text-white/80">{t(business.subtitleAr, business.subtitleEn)}</p>
                    <span className="mt-6 inline-block rounded-full px-5 py-2.5 text-xs font-black" style={{background:theme.accent,color:theme.actionText}}>
                      {t("اكتشف القائمة", "Explore menu")}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-7" style={{background: theme.background}}>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <h4 className="text-lg font-black">{t("قائمتنا", "Explore the menu")}</h4>
                    <span className="text-[10px] font-black" style={{color:theme.accent}}>01 / 03</span>
                  </div>
                  <div className={viewport === "phone" ? "grid gap-3" : "grid grid-cols-1 gap-3 md:grid-cols-3"}>
                    {business.dishes.map((dish) => (
                      <div key={dish.en} className="flex items-center gap-3 rounded-2xl p-3" style={{background:theme.panel}}>
                        <span aria-hidden="true" className="text-3xl">{dish.emoji}</span>
                        <span className="text-xs font-bold">{t(dish.ar,dish.en)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-center text-[10px]" style={{color:theme.muted}}>
                    {t("واجهة تجريبية لتوضيح الشكل العام — ليست موقعاً منشوراً", "Visual concept only — not a published website")}
                  </p>
                </div>
              </div>
            </div>
            <p className="px-2 pt-4 text-center text-xs text-white/45">
              {t("يمكن تخصيص التفاصيل الفعلية بحسب الصور والمحتوى والميزات المطلوبة.", "Real layouts, images, and features are tailored to each project.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
