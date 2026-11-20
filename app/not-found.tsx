import Link from "next/link";

export default function NotFound() {
  return (
    <main dir="rtl" lang="ar" className="flex min-h-screen flex-col items-center justify-center bg-[#14110f] px-6 py-20 text-center text-[#fff7ef]">
      <p className="text-sm font-black tracking-[.3em] text-[#f0a66e]">WEBFIKRA / 404</p>
      <p className="mt-9 text-7xl font-black text-[#f0a66e] md:text-9xl">404</p>
      <h1 className="mt-6 text-3xl font-black md:text-5xl">هذه الصفحة غير موجودة</h1>
      <p className="mt-6 max-w-md text-base leading-9 text-white/60">الرابط الذي تحاول فتحه غير متاح. يمكنك العودة إلى الصفحة الرئيسية لاستكشاف خدمات WEBFIKRA.</p>
      <Link href="/" className="mt-9 rounded-full bg-[#f0a66e] px-8 py-4 font-black text-[#26170e] transition hover:bg-[#ffc59a]">العودة إلى الرئيسية ↗</Link>
      <div className="mt-20 text-2xl font-black tracking-tight"><bdi dir="ltr">WEB<span className="text-[#f0a66e]">FIKRA.</span></bdi></div>
    </main>
  );
}
