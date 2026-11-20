"use client";

import { useMemo, useState } from "react";

type Props = { arabic: boolean };
type Category = "popular" | "sides" | "drinks";
type MenuItem = {
  id: string;
  category: Category;
  ar: string;
  en: string;
  detailsAr: string;
  detailsEn: string;
  price: number;
  emoji: string;
  gradient: string;
};

const menu: MenuItem[] = [
  { id: "burger", category: "popular", ar: "برغر الحطب", en: "Smoky Burger", detailsAr: "لحم مشوي، شيدر، صلصة خاصة", detailsEn: "Grilled beef, cheddar, house sauce", price: 7.5, emoji: "🍔", gradient: "from-[#754025] to-[#2a1a12]" },
  { id: "pizza", category: "popular", ar: "بيتزا مارجريتا", en: "Margherita Pizza", detailsAr: "موزاريلا، ريحان، صلصة طماطم", detailsEn: "Mozzarella, basil, tomato", price: 9, emoji: "🍕", gradient: "from-[#764725] to-[#251811]" },
  { id: "fries", category: "sides", ar: "بطاطا مقرمشة", en: "Crispy Fries", detailsAr: "مع صوص المطعم المميز", detailsEn: "With our signature dip", price: 3, emoji: "🍟", gradient: "from-[#81602c] to-[#2f2413]" },
  { id: "salad", category: "sides", ar: "سلطة طازجة", en: "Fresh Salad", detailsAr: "خضار موسمية وصوص خفيف", detailsEn: "Seasonal greens and light dressing", price: 4.5, emoji: "🥗", gradient: "from-[#405a31] to-[#14251b]" },
  { id: "juice", category: "drinks", ar: "عصير برتقال", en: "Orange Juice", detailsAr: "طازج ومحضّر عند الطلب", detailsEn: "Freshly squeezed to order", price: 3.5, emoji: "🍊", gradient: "from-[#965523] to-[#382012]" },
  { id: "coffee", category: "drinks", ar: "قهوة مثلجة", en: "Iced Coffee", detailsAr: "قهوة باردة بحليب طازج", detailsEn: "Chilled coffee with fresh milk", price: 4, emoji: "☕", gradient: "from-[#655044] to-[#251b16]" },
];

export default function RestaurantExperience({ arabic }: Props) {
  const [category, setCategory] = useState<Category>("popular");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);

  const items = menu.filter((item) => item.category === category);
  const totalCount = Object.values(cart).reduce((sum, amount) => sum + amount, 0);
  const total = useMemo(
    () => menu.reduce((sum, item) => sum + item.price * (cart[item.id] || 0), 0),
    [cart],
  );

  function changeQuantity(id: string, adjustment: number) {
    setCart((previous) => ({
      ...previous,
      [id]: Math.max(0, (previous[id] || 0) + adjustment),
    }));
  }

  return (
    <section id="experience" className="relative overflow-hidden border-y border-white/10 bg-[#171410] px-5 py-24 text-white md:py-32" dir={arabic ? "rtl" : "ltr"}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e98339]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 grid items-end gap-7 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#e7a36d]">{arabic ? "تجربة حقيقية" : "INTERACTIVE PREVIEW"}</p>
            <h2 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">{arabic ? "لا تتخيّل موقع مطعمك. جرّب التجربة بنفسك." : "Don't just imagine it. Try the experience."}</h2>
          </div>
          <p className="max-w-lg text-base leading-8 text-white/60">{arabic ? "اضغط على الأصناف وأضفها للسلة، ثم شاهد كيف تتحول القائمة الإلكترونية إلى رحلة طلب واضحة وسريعة. هذه تجربة توضيحية وليست طلباً حقيقياً." : "Browse dishes, add them to your cart, and see how a digital menu becomes an effortless ordering journey. This is a demo, not a real order."}</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#f8f3eb] text-[#211a16] shadow-[0_28px_80px_rgba(0,0,0,.32)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8dfd3] bg-white/75 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#211914] text-2xl">🍽️</div>
                <div>
                  <p className="font-black">{arabic ? "بيت المذاق" : "The Flavor House"}</p>
                  <p className="text-xs text-[#8a786b]">{arabic ? "نموذج منيو تفاعلي" : "Interactive menu sample"}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#e4f3e7] px-3 py-1.5 text-xs font-bold text-[#287a45]">{arabic ? "عرض توضيحي" : "LIVE DEMO"}</span>
            </div>

            <div className="bg-gradient-to-r from-[#322015] via-[#6a3e24] to-[#2b2019] px-6 py-8 text-white md:px-10">
              <p className="text-xs font-bold tracking-wider text-[#e9bd98]">{arabic ? "أهلاً بك في" : "WELCOME TO"}</p>
              <h3 className="mt-2 text-3xl font-black">{arabic ? "بيت المذاق" : "The Flavor House"}</h3>
              <p className="mt-2 text-sm text-white/70">{arabic ? "نكهة استثنائية في كل طلب" : "Something special in every bite"}</p>
            </div>

            <div className="flex flex-wrap gap-2 px-5 py-6 md:px-8">
              {([
                ["popular", arabic ? "الأكثر طلباً" : "Popular"],
                ["sides", arabic ? "المقبلات" : "Sides"],
                ["drinks", arabic ? "المشروبات" : "Drinks"],
              ] as [Category, string][]).map(([value, label]) => (
                <button key={value} type="button" onClick={() => setCategory(value)} aria-pressed={category === value} className={category === value ? "rounded-full bg-[#29201a] px-5 py-2.5 text-sm font-bold text-white" : "rounded-full border border-[#e4d9cd] bg-white px-5 py-2.5 text-sm font-bold text-[#665548] transition hover:border-[#d38a4f]"}>
                  {label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 px-5 pb-8 md:grid-cols-2 md:px-8">
              {items.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-[#e7ddd1] bg-white shadow-sm">
                  <div className={"flex h-36 items-center justify-center bg-gradient-to-br text-7xl " + item.gradient} aria-hidden="true">{item.emoji}</div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-black">{arabic ? item.ar : item.en}</h4>
                        <p className="mt-1 text-xs leading-6 text-[#806f62]">{arabic ? item.detailsAr : item.detailsEn}</p>
                      </div>
                      <span className="shrink-0 font-black text-[#ab5829]">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <button type="button" onClick={() => changeQuantity(item.id, 1)} className="rounded-full bg-[#ef8f42] px-4 py-2 text-sm font-black text-[#25180c] transition hover:bg-[#f4a96f]">{arabic ? "+ أضف" : "+ Add"}</button>
                      <div className="flex items-center gap-3 text-sm font-black">
                        <button type="button" aria-label={arabic ? "تقليل الكمية" : "Decrease quantity"} disabled={!cart[item.id]} onClick={() => changeQuantity(item.id, -1)} className="grid h-8 w-8 place-items-center rounded-full border border-[#e6d9cc] disabled:opacity-30">−</button>
                        <span className="w-3 text-center">{cart[item.id] || 0}</span>
                        <button type="button" aria-label={arabic ? "زيادة الكمية" : "Increase quantity"} onClick={() => changeQuantity(item.id, 1)} className="grid h-8 w-8 place-items-center rounded-full border border-[#e6d9cc]">+</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="flex flex-col justify-between rounded-[30px] border border-[#b98a5d]/30 bg-gradient-to-b from-[#35251a] to-[#1b1613] p-7 shadow-[0_28px_80px_rgba(0,0,0,.26)]">
            <div>
              <p className="mb-3 text-xs font-black tracking-widest text-[#f4b37d]">{arabic ? "تجربة الطلب" : "ORDER PREVIEW"}</p>
              <h3 className="text-2xl font-black">{arabic ? "طلبك، بخطوات بسيطة." : "A simpler way to order."}</h3>
              <p className="mt-4 text-sm leading-7 text-white/60">{arabic ? "يختار الزبون أصنافه، يراجع السلة، ثم ينتقل لإرسال الطلب من موقع المطعم." : "Guests choose their dishes, review their cart, and proceed to place an order."}</p>
              <div className="my-8 space-y-4 border-y border-white/10 py-7">
                {[
                  arabic ? "تصفح القائمة" : "Explore the menu",
                  arabic ? "اختيار الأصناف والكميات" : "Choose dishes and quantities",
                  arabic ? "مراجعة ملخص الطلب" : "Review the order",
                ].map((label, index) => (
                  <div key={index} className="flex items-center gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f2a467]/15 text-sm font-black text-[#f2a467]">{index + 1}</span><span className="text-sm text-white/80">{label}</span></div>
                ))}
              </div>
              <div className="rounded-2xl bg-white/[0.07] p-5">
                <p className="text-sm font-bold text-white/60">{arabic ? "عناصر السلة" : "Items in cart"}</p>
                <div className="mt-2 flex items-end justify-between"><strong className="text-4xl">{totalCount}</strong><strong className="text-2xl text-[#f5ab6e]">${total.toFixed(2)}</strong></div>
                {showCart && <div className="mt-5 border-t border-white/10 pt-4">
                  {menu.filter((item) => cart[item.id]).length ? menu.filter((item) => cart[item.id]).map((item) => <p key={item.id} className="flex justify-between gap-2 py-1 text-sm text-white/70"><span>{arabic ? item.ar : item.en} × {cart[item.id]}</span><span>${(item.price * cart[item.id]).toFixed(2)}</span></p>) : <p className="text-sm text-white/60">{arabic ? "السلة فارغة. أضف صنفاً لتجربتها." : "Your cart is empty. Add an item to try it."}</p>}
                </div>}
              </div>
            </div>
            <div className="mt-8">
              <button type="button" onClick={() => setShowCart((value) => !value)} className="w-full rounded-full bg-[#ee934e] px-5 py-4 font-black text-[#21150d] transition hover:bg-[#f5ae78]">{showCart ? (arabic ? "إخفاء تفاصيل السلة" : "Hide cart details") : (arabic ? "شاهد سلتك التجريبية" : "View demo cart")}</button>
              <p className="mt-4 text-center text-xs leading-5 text-white/45">{arabic ? "عرض تفاعلي فقط — لا تُرسل طلبات ولا تُحصّل مدفوعات." : "Interactive preview only — no orders or payments are submitted."}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
