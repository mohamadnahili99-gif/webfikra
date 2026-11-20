import Link from "next/link";

export default function PortalPaused({ title, description }: { title: string; description: string }) {
  return (
    <main dir="rtl" lang="ar" className="flex min-h-screen flex-col bg-[#17120f] px-5 text-[#fff7f0]">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-white/10 py-7">
        <Link href="/" className="text-2xl font-black"><bdi dir="ltr">WEB<span className="text-[#f1a56f]">FIKRA.</span></bdi></Link>
        <Link href="/" className="text-sm font-bold text-[#f3bb91] hover:text-white">العودة إلى الموقع ↗</Link>
      </header>
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center py-24 text-center">
        <span className="rounded-full border border-[#c17a4c]/40 bg-[#c17a4c]/10 px-5 py-2 text-xs font-black tracking-widest text-[#efac7d]">WEBFIKRA / PRIVATE PORTAL</span>
        <div aria-hidden="true" className="mt-9 grid h-24 w-24 place-items-center rounded-[30px] border border-[#a77750]/40 bg-[#38261b] text-5xl">🔒</div>
        <h1 className="mt-10 text-3xl font-black leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-9 text-white/60">{description}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/#contact" className="rounded-full bg-[#f2a36b] px-8 py-4 font-black text-[#26170f] transition hover:bg-[#ffc394]">اطلب موقعك الخاص ↗</Link>
          <a href="https://wa.me/96171524556" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white/10">تواصل عبر واتساب</a>
        </div>
        <p className="mt-8 text-xs leading-6 text-white/40">لا نطلب إنشاء حساب أو مشاركة كلمة مرور في هذه المرحلة.</p>
      </section>
      <footer className="mx-auto w-full max-w-5xl border-t border-white/10 py-7 text-center text-xs text-white/40">© 2026 WEBFIKRA</footer>
    </main>
  );
}
