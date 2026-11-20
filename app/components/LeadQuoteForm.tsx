"use client";

import { useState, type FormEvent } from "react";

type Props = { arabic: boolean };
const phone = "96171524556";
const businessTypes = [
  ["restaurant", "مطعم", "Restaurant"],
  ["cafe", "مقهى", "Café"],
  ["bakery", "مخبز أو معجنات", "Bakery"],
  ["other", "نشاط آخر", "Other business"],
] as const;
const projectTypes = [
  ["presence", "موقع تعريفي", "Brand website"],
  ["menu", "منيو إلكتروني", "Digital menu"],
  ["ordering", "منيو مع سلة وطلبات", "Menu with ordering"],
  ["custom", "مشروع مخصص", "Custom project"],
] as const;

const featureOptions = [
  ["qr", "رمز QR للمنيو", "QR menu access"],
  ["languages", "موقع عربي وإنجليزي", "Arabic & English"],
  ["photos", "معرض صور الأطباق", "Food photo gallery"],
  ["cart", "سلة طلبات واتساب", "WhatsApp ordering cart"],
  ["admin", "إدارة الأصناف والأسعار", "Menu editing tools"],
] as const;

export default function LeadQuoteForm({ arabic }: Props) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [type, setType] = useState("restaurant");
  const [project, setProject] = useState("menu");
  const [details, setDetails] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  function toggleFeature(id: string) {
    setFeatures((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  const selectedFeatures = featureOptions.filter((feature) => features.includes(feature[0]));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !business.trim()) return;
    const typeLabel = businessTypes.find((item) => item[0] === type);
    const projectLabel = projectTypes.find((item) => item[0] === project);
    const message = arabic
      ? [
          "مرحباً WEBFIKRA، أريد الاستفسار عن تصميم موقع.",
          "الاسم: " + name.trim(),
          "اسم النشاط: " + business.trim(),
          "نوع النشاط: " + (typeLabel?.[1] || ""),
          "المطلوب: " + (projectLabel?.[1] || ""),
          selectedFeatures.length ? "المميزات التي تهمني: " + selectedFeatures.map((feature) => feature[1]).join("، ") : "",
          details.trim() ? "تفاصيل إضافية: " + details.trim() : "",
        ].filter(Boolean).join("\n")
      : [
          "Hello WEBFIKRA, I'd like to discuss a new website.",
          "Name: " + name.trim(),
          "Business: " + business.trim(),
          "Business type: " + (typeLabel?.[2] || ""),
          "Project: " + (projectLabel?.[2] || ""),
          selectedFeatures.length ? "Interested features: " + selectedFeatures.map((feature) => feature[2]).join(", ") : "",
          details.trim() ? "More details: " + details.trim() : "",
        ].filter(Boolean).join("\n");
    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  }

  const inputStyle =
    "w-full rounded-2xl border border-[#54483d] bg-[#211c19] px-5 py-3.5 text-sm text-[#fff8ee] outline-none transition placeholder:text-[#998d82] focus:border-[#f3a367] focus:ring-2 focus:ring-[#f3a367]/15";
  const labelStyle = "mb-2.5 block text-sm font-semibold text-[#e3d6c8]";

  return (
    <section id="contact" dir={arabic ? "rtl" : "ltr"} className="relative overflow-hidden bg-[#14110f] px-5 py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[520px] w-[520px] rounded-full bg-[#a65320]/10 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="lg:pt-10">
          <p className="mb-5 text-xs font-black tracking-[.22em] text-[#eaa56c]">
            {arabic ? "07 / لنبنِ شيئاً مختلفاً" : "07 / LET'S WORK TOGETHER"}
          </p>
          <h2 className="max-w-lg text-4xl font-black leading-[1.3] md:text-6xl">
            {arabic ? <>فكرتك تستحق <span className="text-[#f3a367]">أن يراها الجميع.</span></> : <>Let's make your idea <span className="text-[#f3a367]">impossible to ignore.</span></>}
          </h2>
          <p className="mt-7 max-w-md text-base leading-9 text-white/55">
            {arabic
              ? "أخبرنا قليلاً عن مشروعك. سنجهز لك رسالة واتساب منظّمة لتبدأ المحادثة معنا، بدون تسجيل أو التزامات."
              : "Tell us a little about your project. We'll prepare a WhatsApp message to start the conversation. No account or commitment required."}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#e7c8af]">{arabic ? "تصميم حسب الهوية" : "Brand-first design"}</span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#e7c8af]">{arabic ? "دعم العربية والإنجليزية" : "Arabic & English"}</span>
          </div>
          <a className="mt-10 inline-flex text-sm font-bold text-[#f4af7f] underline underline-offset-8 transition hover:text-white" href={"https://wa.me/" + phone} target="_blank" rel="noreferrer">
            {arabic ? "أو تواصل مباشرة عبر واتساب" : "Or chat with us directly on WhatsApp"} ↗
          </a>
        </div>

        <form onSubmit={submit} className="rounded-[32px] border border-[#544132] bg-gradient-to-b from-[#2b221d] to-[#1b1714] p-6 shadow-[0_30px_90px_rgba(0,0,0,.35)] sm:p-9">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-[.18em] text-[#e9a270]">WEBFIKRA / PROJECT INQUIRY</p>
            <h3 className="mt-3 text-2xl font-black">{arabic ? "لنبدأ من هنا" : "Let's get started"}</h3>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelStyle} htmlFor="quote-name">{arabic ? "اسمك" : "Your name"} *</label>
              <input id="quote-name" name="name" required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className={inputStyle} placeholder={arabic ? "الاسم الكامل" : "Full name"} />
            </div>
            <div>
              <label className={labelStyle} htmlFor="quote-business">{arabic ? "اسم مطعمك أو نشاطك" : "Business name"} *</label>
              <input id="quote-business" name="business" required maxLength={100} value={business} onChange={(e) => setBusiness(e.target.value)} className={inputStyle} placeholder={arabic ? "اسم النشاط" : "Business name"} />
            </div>
            <div>
              <label className={labelStyle} htmlFor="quote-type">{arabic ? "نوع النشاط" : "Business type"}</label>
              <select id="quote-type" name="type" className={inputStyle} value={type} onChange={(e) => setType(e.target.value)}>
                {businessTypes.map((item) => <option key={item[0]} value={item[0]}>{arabic ? item[1] : item[2]}</option>)}
              </select>
            </div>
            <div>
              <label className={labelStyle} htmlFor="quote-project">{arabic ? "الخدمة المطلوبة" : "What do you need?"}</label>
              <select id="quote-project" name="project" className={inputStyle} value={project} onChange={(e) => setProject(e.target.value)}>
                {projectTypes.map((item) => <option key={item[0]} value={item[0]}>{arabic ? item[1] : item[2]}</option>)}
              </select>
            </div>
          </div>
          <fieldset className="mt-6">
            <legend className={labelStyle}>
              {arabic ? "ما المميزات التي تهمّك؟ (اختياري)" : "Features you're interested in (optional)"}
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {featureOptions.map((feature) => {
                const selected = features.includes(feature[0]);
                return (
                  <label key={feature[0]} className={selected
                    ? "flex cursor-pointer items-center gap-3 rounded-xl border border-[#f4a66a] bg-[#f4a66a]/10 px-4 py-3 text-sm font-bold text-[#ffcfaa] transition"
                    : "flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-sm text-white/70 transition hover:border-[#ba8e6e]"}>
                    <input
                      type="checkbox"
                      name="features"
                      value={feature[0]}
                      checked={selected}
                      onChange={() => toggleFeature(feature[0])}
                      className="h-4 w-4 shrink-0 accent-[#f1a065]"
                    />
                    <span>{arabic ? feature[1] : feature[2]}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className="mt-5">
            <label className={labelStyle} htmlFor="quote-details">{arabic ? "تفاصيل إضافية" : "Project details"}</label>
            <textarea id="quote-details" name="details" rows={4} maxLength={1000} value={details} onChange={(e) => setDetails(e.target.value)} className={inputStyle + " resize-y"} placeholder={arabic ? "ماذا تتخيّل لموقعك؟ (اختياري)" : "Tell us about your vision (optional)"} />
          </div>
          <div className="mt-6 rounded-2xl border border-[#755841] bg-[#231b16] p-5" aria-live="polite">
            <p className="text-xs font-black tracking-[.1em] text-[#f5b180]">
              {arabic ? "ملخص مشروعك المبدئي" : "YOUR PROJECT AT A GLANCE"}
            </p>
            <p className="mt-3 text-sm font-bold text-white/90">
              {arabic ? projectTypes.find((item) => item[0] === project)?.[1] : projectTypes.find((item) => item[0] === project)?.[2]}
            </p>
            <p className="mt-2 text-xs leading-6 text-white/55">
              {selectedFeatures.length
                ? selectedFeatures.map((feature) => arabic ? feature[1] : feature[2]).join(" · ")
                : (arabic ? "يمكنك اختيار الميزات التي تحتاجها من الأعلى." : "Select any additional features above.")}
            </p>
            <p className="mt-3 text-[11px] text-[#c7aa91]">
              {arabic ? "هذا ملخص طلب، وليس عرض سعر أو تأكيداً لتنفيذ المميزات." : "This is a request summary, not a price quote or feature guarantee."}
            </p>
          </div>
          <button type="submit" className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#f19a53] px-7 py-4 text-base font-black text-[#21150e] transition hover:-translate-y-0.5 hover:bg-[#ffb276] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffb276]">
            {arabic ? "أرسل طلبي عبر واتساب" : "Continue on WhatsApp"}
            <span aria-hidden="true">↗</span>
          </button>
          <p className="mt-4 text-center text-xs leading-6 text-white/40">{arabic ? "سيُفتح واتساب لمراجعة الرسالة وإرسالها بنفسك؛ لا نرسل شيئاً تلقائياً." : "Review and send the message yourself in WhatsApp. Nothing is submitted automatically."}</p>
        </form>
      </div>
    </section>
  );
}
