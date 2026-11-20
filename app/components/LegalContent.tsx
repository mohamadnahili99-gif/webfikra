"use client";

import Link from "next/link";
import { useWebfikraLanguage } from "../hooks/useWebfikraLanguage";

type Kind = "privacy" | "terms";

type Section = {
  headingAr: string;
  headingEn: string;
  bodyAr: string;
  bodyEn: string;
};

const content: Record<Kind, { titleAr: string; titleEn: string; introAr: string; introEn: string; sections: Section[] }> = {
  privacy: {
    titleAr: "سياسة الخصوصية",
    titleEn: "Privacy Notice",
    introAr: "نشرح هنا ما يحدث للمعلومات عندما تتصفح موقع WEBFIKRA أو تتواصل معنا. هذه الصفحة تتعلق بالموقع التعريفي الحالي، وليست سياسة لنظام حسابات المطاعم المستقبلي.",
    introEn: "Here is how information is handled when you browse WEBFIKRA or contact us. This notice concerns the current marketing website, not any future restaurant account service.",
    sections: [
      {
        headingAr: "المعلومات التي تدخلها",
        headingEn: "Information you enter",
        bodyAr: "يمكنك إدخال اسم النشاط، اختيارات الألوان، وبيانات طلب الموقع في نماذج تفاعلية. تتم المعاينة داخل متصفحك، ولا يحفظ هذا الموقع هذه المدخلات في قاعدة بيانات خاصة بنا حالياً. لا ترسل لنا النماذج بيانات تلقائياً.",
        bodyEn: "You can type a business name, select visual options, and prepare a project inquiry. These previews run in your browser. The current site does not store those entries in our own database, and the forms do not automatically send them to us.",
      },
      {
        headingAr: "التواصل عبر واتساب",
        headingEn: "Contact through WhatsApp",
        bodyAr: "عند اختيار التواصل، يفتح المتصفح واتساب مع رسالة مقترحة تتضمن التفاصيل التي اخترتها. يمكنك مراجعتها أو تعديلها أو عدم إرسالها. لا تصلنا المعلومات إلا إذا اخترت إرسال الرسالة بنفسك. يخضع استخدام واتساب لسياسة خصوصية الخدمة نفسها.",
        bodyEn: "When you choose to contact us, WhatsApp opens with a suggested message containing your selected details. You can review, edit, or discard it. We only receive the details if you decide to send the message. WhatsApp's own privacy terms apply.",
      },
      {
        headingAr: "تفضيل اللغة",
        headingEn: "Language preference",
        bodyAr: "يحاول الموقع حفظ اختيار العربية أو الإنجليزية محلياً في متصفحك حتى يبقى اختيارك محفوظاً عند العودة. يمكنك مسح هذا التفضيل بحذف بيانات الموقع من إعدادات المتصفح.",
        bodyEn: "The site attempts to store your Arabic or English preference locally in your browser so it can remember your choice on a return visit. You can clear it through your browser's site-data settings.",
      },
      {
        headingAr: "الاستضافة والصور الخارجية",
        headingEn: "Hosting and external images",
        bodyAr: "تُستضاف صفحات الموقع عبر مزوّد استضافة، وقد يعالج بيانات تقنية ضرورية لتقديم الخدمة وحمايتها، مثل طلبات الوصول. كما تُحمّل بعض الصور التوضيحية من مزوّد صور خارجي، وقد يتلقى طلبات المتصفح لتحميلها. لا نتحكم في سياسات هؤلاء المزوّدين.",
        bodyEn: "The hosting provider may process technical information needed to deliver and protect the site, such as access requests. Some illustrative images are loaded from an external image provider, which may receive requests from your browser. Their own policies apply.",
      },
      {
        headingAr: "تحديث هذه الصفحة",
        headingEn: "Changes to this notice",
        bodyAr: "إذا أضفنا حسابات مستخدمين أو نظام طلبات فعلياً أو وسيلة أخرى لجمع البيانات، فسنراجع سياسة الخصوصية قبل تفعيلها. يمكنك التواصل معنا عبر واتساب للاستفسار عن بيانات أرسلتها إلينا.",
        bodyEn: "If we later introduce user accounts, live ordering, or new data collection, we will review this notice before enabling those features. You can contact us on WhatsApp with questions about information you have sent us.",
      },
    ],
  },
  terms: {
    titleAr: "شروط استخدام الموقع",
    titleEn: "Website Use Terms",
    introAr: "هذه الشروط توضّح طبيعة الموقع التعريفي والتجارب المعروضة فيه. أي اتفاق تجاري لتنفيذ موقع مخصص يخضع لنطاق عمل وعرض سعر يتم الاتفاق عليهما بشكل منفصل.",
    introEn: "These terms describe the marketing website and its demonstrations. A paid website project requires a separately agreed quote and scope of work.",
    sections: [
      {
        headingAr: "طبيعة الموقع",
        headingEn: "About this website",
        bodyAr: "WEBFIKRA يعرض خدمات تصميم مواقع للمطاعم والمقاهي والمخابز. المعاينات التفاعلية والنماذج والصور والأسعار داخل منيو التجربة أمثلة توضيحية وليست مواقع عملاء منشورة أو طلبات تجارية فعلية.",
        bodyEn: "WEBFIKRA showcases website design services for restaurants, cafés, and bakeries. Interactive previews, concepts, sample images, and demo menu prices are illustrations, not completed client websites or actual commercial orders.",
      },
      {
        headingAr: "الاستفسار وطلب عرض السعر",
        headingEn: "Inquiries and quotations",
        bodyAr: "ملء نموذج الطلب أو فتح رسالة واتساب لا يشكل طلب شراء أو عقداً ملزماً. تُحدد الخدمات والمدة والتكلفة والتعديلات والتسليم وطريقة الدفع كتابةً قبل بدء أي مشروع مدفوع.",
        bodyEn: "Preparing an inquiry or opening a WhatsApp message is not a purchase or binding contract. Project services, timeline, pricing, revisions, delivery, and payments must be agreed in writing before paid work begins.",
      },
      {
        headingAr: "التجارب التفاعلية",
        headingEn: "Interactive demonstrations",
        bodyAr: "المنيو التجريبي واستوديو الألوان وسلة المشتريات مخصصون للتجربة فقط. لا تُنفذ من خلالها طلبات حقيقية ولا تتم معالجة مدفوعات. أدوات تسجيل المطاعم وإدارتها ليست خدمات مفعّلة في هذا الإصدار.",
        bodyEn: "The menu, color studio, and cart are demonstrations only. They do not place real orders or process payments. Restaurant account and management tools are not active services in this release.",
      },
      {
        headingAr: "المحتوى والأصول",
        headingEn: "Content and assets",
        bodyAr: "اسم WEBFIKRA والتصميم والنصوص الخاصة بالموقع مقدمة لأغراض التعريف بالخدمة. الصور التوضيحية قد تكون من مصادر خارجية وتخضع لحقوق أصحابها. لا يُفهم من عرض صورة نموذجية وجود علاقة تجارية مع علامة أخرى.",
        bodyEn: "The WEBFIKRA name, design, and original site copy describe our services. Illustrative images may come from third-party providers and remain subject to their rights. Their presence does not imply a commercial association.",
      },
      {
        headingAr: "التغييرات والتواصل",
        headingEn: "Changes and contact",
        bodyAr: "قد نحدّث أقسام الموقع ونماذجه. للاستفسارات المتعلقة بالخدمة أو بهذه الشروط، تواصل معنا عبر رقم واتساب الظاهر أدناه.",
        bodyEn: "We may update the website and its examples. For questions about our services or these terms, contact us through the WhatsApp number shown below.",
      },
    ],
  },
};

export default function LegalContent({ kind }: { kind: Kind }) {
  const { arabic, toggleLanguage } = useWebfikraLanguage();
  const value = content[kind];
  const t = (ar: string, en: string) => arabic ? ar : en;

  return (
    <main dir={arabic ? "rtl" : "ltr"} lang={arabic ? "ar" : "en"} className="wf-site min-h-screen bg-[#15110e] text-[#fff8f1]">
      <header className="border-b border-white/10 bg-[#17130f]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-6">
          <Link href="/" className="text-2xl font-black"><bdi dir="ltr">WEB<span className="text-[#f0a66e]">FIKRA.</span></bdi></Link>
          <div className="flex items-center gap-4">
            <button type="button" onClick={toggleLanguage} className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-[#eeb287]">{arabic ? "EN" : "عربي"}</button>
            <Link href="/" className="rounded-full bg-[#f0a66e] px-5 py-2.5 text-sm font-bold text-[#26170f]">{t("الصفحة الرئيسية", "Home")} ↗</Link>
          </div>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-5 pb-24 pt-20">
        <p className="text-xs font-black tracking-[.18em] text-[#efac78]">WEBFIKRA / {kind.toUpperCase()}</p>
        <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">{t(value.titleAr, value.titleEn)}</h1>
        <p className="mt-7 max-w-3xl text-base leading-9 text-[#d5c3b3]">{t(value.introAr, value.introEn)}</p>
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {value.sections.map((section, index) => (
            <section key={section.headingEn} className="grid gap-3 py-8 md:grid-cols-[45px_1fr] md:gap-7">
              <span className="text-sm font-bold text-[#e2a675]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-xl font-black">{t(section.headingAr, section.headingEn)}</h2>
                <p className="mt-4 text-sm leading-9 text-white/60">{t(section.bodyAr, section.bodyEn)}</p>
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm leading-8 text-white/60">
          {t("هل لديك سؤال؟", "Have a question?")}{" "}
          <a className="font-bold text-[#f0ac79] underline underline-offset-4" target="_blank" rel="noreferrer" href="https://wa.me/96171524556">
            {t("تواصل معنا عبر واتساب", "Contact us on WhatsApp")}
          </a>
        </p>
      </article>
      <footer className="border-t border-white/10 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <span>© 2026 WEBFIKRA.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">{t("الخصوصية", "Privacy")}</Link>
            <Link href="/terms" className="hover:text-white">{t("شروط الاستخدام", "Terms")}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
