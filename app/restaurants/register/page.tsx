export default function RestaurantRegisterPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#100e0c] px-5 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <a href="/" className="text-2xl font-black tracking-tight">WEB<span className="text-[#f47b35]">FIKRA</span></a>
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
          <p className="text-sm font-bold text-[#f49a60]">انضم إلى Webfikra</p>
          <h1 className="mt-3 text-3xl font-black">أنشئ حساب مطعمك</h1>
          <p className="mt-3 leading-7 text-white/55">ابدأ بتجهيز حضور مطعمك الرقمي. سنستخدم هذه المعلومات لإعداد حسابك.</p>
          <form className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold">اسم المطعم
              <input type="text" placeholder="مثال: مطعم الذوق" className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 outline-none focus:border-[#f47b35]" />
            </label>
            <label className="block text-sm font-bold">اسم صاحب المطعم
              <input type="text" placeholder="الاسم الكامل" autoComplete="name" className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 outline-none focus:border-[#f47b35]" />
            </label>
            <label className="block text-sm font-bold sm:col-span-2">البريد الإلكتروني
              <input type="email" placeholder="name@example.com" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-left outline-none focus:border-[#f47b35]" />
            </label>
            <label className="block text-sm font-bold">رقم الهاتف / واتساب
              <input type="tel" placeholder="+961 ..." autoComplete="tel" className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-left outline-none focus:border-[#f47b35]" />
            </label>
            <label className="block text-sm font-bold">كلمة المرور
              <input type="password" placeholder="أنشئ كلمة مرور" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-left outline-none focus:border-[#f47b35]" />
            </label>
            <button type="button" disabled className="cursor-not-allowed rounded-xl bg-[#f47b35]/50 px-5 py-3 font-black text-white/70 sm:col-span-2">إنشاء الحساب قريباً</button>
          </form>
          <p className="mt-6 text-center text-sm text-white/55">لديك حساب؟ <a href="/restaurants/login" className="font-bold text-[#ffad75] hover:text-white">دخول المطاعم</a></p>
          <p className="mt-5 rounded-xl border border-[#f47b35]/20 bg-[#f47b35]/[0.07] p-3 text-xs leading-6 text-[#ffc08e]">هذه واجهة تسجيل أولية وليست نموذجاً يرسل بياناتك بعد. سنفعّل إنشاء الحساب بعد إعداد الحماية وقاعدة البيانات.</p>
        </section>
      </div>
    </main>
  );
}
