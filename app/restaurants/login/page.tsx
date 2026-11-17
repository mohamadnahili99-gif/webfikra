export default function RestaurantLoginPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#100e0c] px-5 py-12 text-white">
      <div className="mx-auto max-w-md">
        <a href="/" className="text-2xl font-black tracking-tight">WEB<span className="text-[#f47b35]">FIKRA</span></a>
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
          <p className="text-sm font-bold text-[#f49a60]">بوابة المطاعم</p>
          <h1 className="mt-3 text-3xl font-black">أهلاً بعودتك</h1>
          <p className="mt-3 leading-7 text-white/55">سجّل الدخول لإدارة موقع مطعمك وقائمة الطعام والطلبات.</p>
          <form className="mt-8 space-y-5">
            <label className="block text-sm font-bold">البريد الإلكتروني
              <input type="email" autoComplete="email" placeholder="name@example.com" className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-left outline-none focus:border-[#f47b35]" />
            </label>
            <label className="block text-sm font-bold">كلمة المرور
              <input type="password" autoComplete="current-password" placeholder="••••••••" className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-left outline-none focus:border-[#f47b35]" />
            </label>
            <button type="button" disabled className="w-full cursor-not-allowed rounded-xl bg-[#f47b35]/50 px-5 py-3 font-black text-white/70">تسجيل الدخول قريباً</button>
          </form>
          <p className="mt-6 text-center text-sm text-white/55">ليس لديك حساب؟ <a href="/restaurants/register" className="font-bold text-[#ffad75] hover:text-white">أنشئ حساب مطعم</a></p>
          <p className="mt-5 rounded-xl border border-[#f47b35]/20 bg-[#f47b35]/[0.07] p-3 text-xs leading-6 text-[#ffc08e]">هذه واجهة أولية فقط؛ تسجيل الدخول سيُفعّل بعد ربط نظام الحسابات وقاعدة البيانات.</p>
        </section>
      </div>
    </main>
  );
}
