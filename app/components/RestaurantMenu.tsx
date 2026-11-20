"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { PublishedMenu } from "@/lib/public-menu";

export default function RestaurantMenu({ menu }: { menu: PublishedMenu }) {
  const { restaurant, categories, items } = menu;
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const arabic = language === "ar";
  const t = (ar: string, en: string) => arabic ? ar : en;
  const restaurantName = !arabic && restaurant.name_en ? restaurant.name_en : restaurant.name;
  const itemName = (i: { name: string; name_en: string }) => !arabic && i.name_en ? i.name_en : i.name;
  const itemDetails = (i: { description: string; description_en: string }) => !arabic && i.description_en ? i.description_en : i.description;
  const accent = /^#[0-9a-fA-F]{6}$/.test(restaurant.accent_color) ? restaurant.accent_color : "#EF9754";

  const selectedItems = items.filter((item) => (cart[item.id] || 0) > 0);
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const total = useMemo(() =>
    items.reduce((sum, item) => sum + Number(item.price) * (cart[item.id] || 0), 0), [items, cart]);
  const shownItems = items.filter((item) => item.category_id === activeCategory);

  function money(value: number) {
    return restaurant.currency === "LBP"
      ? Math.round(value).toLocaleString("en-US") + " ل.ل."
      : "$" + value.toFixed(2);
  }
  function changeQuantity(id: string, delta: number) {
    setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) + delta) }));
  }
  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!count || !customer.trim() || !address.trim()) return;
    const lines = [
      arabic ? "طلب جديد من: " + restaurantName : "New order from " + restaurantName,
      ...selectedItems.map((item, index) =>
        (index + 1) + ". " + itemName(item) + " × " + cart[item.id] + " — " + money(Number(item.price) * cart[item.id])),
      arabic ? "المجموع: " + money(total) : "Total: " + money(total),
      arabic ? "الاسم: " + customer.trim() : "Name: " + customer.trim(),
      arabic ? "العنوان: " + address.trim() : "Address: " + address.trim(),
      notes.trim() ? (arabic ? "ملاحظات: " : "Notes: ") + notes.trim() : "",
    ].filter(Boolean).join("\n");
    window.open("https://wa.me/" + restaurant.whatsapp + "?text=" + encodeURIComponent(lines), "_blank", "noopener,noreferrer");
  }

  const heroImage = restaurant.cover_url.startsWith("https://") ? restaurant.cover_url : "";
  const logoImage = restaurant.logo_url.startsWith("https://") ? restaurant.logo_url : "";

  return (
    <main lang={language} dir={arabic ? "rtl" : "ltr"} className="min-h-screen bg-[#fbf7f0] text-[#241b15]">
      <header className="sticky top-0 z-40 border-b border-[#e3d9ca] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            {logoImage ? <span role="img" aria-label={restaurantName} className="h-11 w-11 shrink-0 rounded-xl bg-cover bg-center" style={{backgroundImage:"url(" + JSON.stringify(logoImage) + ")"}} /> : <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#251a13] text-xl text-white">🍽</span>}
            <div className="min-w-0"><p className="truncate text-base font-black">{restaurantName}</p><p className="text-[11px] text-[#8b7969]">{t("قائمتنا الرقمية", "Our Digital Menu")}</p></div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => setLanguage(arabic ? "en" : "ar")} className="rounded-full border border-[#e2d5c5] px-4 py-2.5 text-xs font-black">{arabic ? "EN" : "عربي"}</button>
            <button type="button" onClick={() => setCartOpen(true)} className="rounded-full px-4 py-2.5 text-xs font-black text-white" style={{backgroundColor:accent}}>{t("السلة", "Cart")} ({count})</button>
          </div>
        </div>
      </header>

      <section className="relative isolate min-h-[290px] overflow-hidden bg-[#302017] px-5 py-16 text-white sm:min-h-[330px] sm:py-20">
        {heroImage && <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cover bg-center opacity-40" style={{backgroundImage:"url(" + JSON.stringify(heroImage) + ")"}}/>}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-l from-black/50 to-black/15" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-bold" style={{color:accent}}>{t("أهلاً وسهلاً بك", "WELCOME")}</p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">{restaurantName}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/85">{(!arabic && restaurant.description_en ? restaurant.description_en : restaurant.description) || t("اختَر ما تحب من قائمتنا", "Discover something delicious today")}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/80">
            {restaurant.address && <span>📍 {restaurant.address}</span>}
            {restaurant.hours && <span>◷ {restaurant.hours}</span>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav aria-label={t("أقسام المنيو", "Menu categories")} className="flex flex-wrap gap-2">
          {categories.map((category) =>
            <button type="button" key={category.id} onClick={() => setActiveCategory(category.id)} aria-pressed={category.id === activeCategory}
              className="rounded-full border px-5 py-2.5 text-sm font-bold transition hover:-translate-y-0.5"
              style={category.id === activeCategory ? {backgroundColor:accent,color:"white",borderColor:accent} : {backgroundColor:"white",borderColor:"#dfd3c4"}}>
              {itemName(category)}
            </button>)}
        </nav>
        {categories.length === 0 ? <p className="mt-12 rounded-2xl bg-white p-8 text-center text-[#8d7463]">{t("لا توجد أقسام منشورة بعد", "No menu categories published yet")}</p> : (
          <>
            <h2 className="mb-6 mt-10 text-3xl font-black">{itemName(categories.find((c)=>c.id===activeCategory) || {name:"",name_en:""})}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shownItems.map((item)=>(
                <article key={item.id} className="overflow-hidden rounded-[25px] border border-[#e4d7c9] bg-white shadow-[0_8px_24px_rgba(47,28,14,.045)]">
                  {item.image_url.startsWith("https://") ? <div role="img" aria-label={itemName(item)} className="h-48 bg-[#e9ded2] bg-cover bg-center" style={{backgroundImage:"url(" + JSON.stringify(item.image_url) + ")"}}/> : <div className="grid h-40 place-items-center bg-[#ede3d8] text-5xl" aria-hidden="true">🍽️</div>}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black">{itemName(item)}</h3>
                      <span className="shrink-0 font-black" style={{color:accent}}>{money(Number(item.price))}</span>
                    </div>
                    {itemDetails(item) && <p className="mt-2 min-h-[43px] text-sm leading-6 text-[#8b7668]">{itemDetails(item)}</p>}
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <button type="button" className="rounded-full px-5 py-2.5 text-sm font-black text-white" style={{backgroundColor:accent}} onClick={() => changeQuantity(item.id,1)}>{t("إضافة +", "Add +")}</button>
                      <div className="flex items-center gap-3">
                        <button type="button" disabled={!cart[item.id]} aria-label={t("إنقاص", "Decrease")} onClick={() => changeQuantity(item.id,-1)} className="grid h-9 w-9 place-items-center rounded-full border border-[#e2d2c2] font-bold disabled:opacity-35">−</button>
                        <span className="w-4 text-center text-sm font-bold">{cart[item.id] || 0}</span>
                        <button type="button" aria-label={t("زيادة", "Increase")} onClick={() => changeQuantity(item.id,1)} className="grid h-9 w-9 place-items-center rounded-full border border-[#e2d2c2] font-bold">+</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {shownItems.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-[#8d7463]">{t("لا توجد أصناف في هذا القسم", "No items in this category")}</p>}
          </>
        )}
      </section>

      <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-md sm:inset-x-auto sm:end-6">
        <button type="button" onClick={() => setCartOpen(true)} className="flex w-full items-center justify-between rounded-full px-6 py-4 text-sm font-black text-white shadow-[0_16px_45px_rgba(0,0,0,.22)]" style={{backgroundColor:accent}}>
          <span>{t("عرض السلة", "View Cart")} ({count})</span><span>{money(total)}</span>
        </button>
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-2 sm:items-center sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-label={t("مراجعة الطلب", "Review order")} className="max-h-[93vh] w-full max-w-xl overflow-y-auto rounded-[27px] bg-white p-5 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between gap-5"><h2 className="text-2xl font-black">{t("طلبك", "Your order")}</h2><button type="button" onClick={()=>setCartOpen(false)} aria-label={t("إغلاق", "Close")} className="grid h-9 w-9 place-items-center rounded-full bg-[#eee6db] text-xl">×</button></div>
            {!count ? <p className="my-12 text-center text-[#857468]">{t("السلة فارغة. أضف صنفاً أولاً.", "Your cart is empty. Add a dish first.")}</p> : (
              <>
                <div className="my-6 space-y-3 border-y border-[#e9dfd5] py-5">
                  {selectedItems.map((item)=>(
                    <div key={item.id} className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-semibold">{itemName(item)} × {cart[item.id]}</span>
                      <span className="font-black">{money(Number(item.price)*cart[item.id])}</span>
                    </div>
                  ))}
                </div>
                <p className="flex justify-between gap-3 text-xl font-black"><span>{t("الإجمالي", "Total")}</span><span>{money(total)}</span></p>
                <p className="mt-2 text-xs text-[#8d7a6e]">{t("لا تُضاف رسوم توصيل إلى الطلب.", "No delivery fee is added to this order.")}</p>
                <form onSubmit={placeOrder} className="mt-7 space-y-4">
                  <label className="block text-sm font-bold">{t("اسمك", "Your name")} *<input maxLength={90} required value={customer} onChange={e=>setCustomer(e.target.value)} className="mt-2 w-full rounded-xl border border-[#ddcfc0] px-4 py-3 outline-none focus:border-[#b57a4d]" placeholder={t("الاسم الكامل","Full name")}/></label>
                  <label className="block text-sm font-bold">{t("العنوان", "Address")} *<input maxLength={220} required value={address} onChange={e=>setAddress(e.target.value)} className="mt-2 w-full rounded-xl border border-[#ddcfc0] px-4 py-3 outline-none focus:border-[#b57a4d]" placeholder={t("عنوان استلام الطلب","Order address")}/></label>
                  <label className="block text-sm font-bold">{t("ملاحظات إضافية", "Notes")}<textarea rows={2} maxLength={450} value={notes} onChange={e=>setNotes(e.target.value)} className="mt-2 w-full resize-y rounded-xl border border-[#ddcfc0] px-4 py-3 outline-none focus:border-[#b57a4d]"/></label>
                  <button type="submit" className="w-full rounded-full px-6 py-4 text-sm font-black text-white" style={{backgroundColor:accent}}>{t("متابعة الطلب عبر واتساب", "Continue on WhatsApp")} ↗</button>
                  <p className="text-center text-xs leading-6 text-[#8c7a70]">{t("سيفتح واتساب لتراجع الطلب وترسله بنفسك. لن يتم إرسال أي بيانات تلقائياً.", "WhatsApp opens so you can review and send your message. Nothing is submitted automatically.")}</p>
                </form>
              </>
            )}
          </section>
        </div>
      )}

      <footer className="mt-24 border-t border-[#e5d8cc] bg-white px-5 py-9 pb-28 text-center text-sm text-[#877569]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4">
          {restaurant.instagram.startsWith("https://") && <a target="_blank" rel="noopener noreferrer" href={restaurant.instagram} className="hover:underline">Instagram</a>}
          {restaurant.tiktok.startsWith("https://") && <a target="_blank" rel="noopener noreferrer" href={restaurant.tiktok} className="hover:underline">TikTok</a>}
        </div>
        <p className="mt-6 text-xs">{t("تصميم بواسطة", "Design by")} <a href="https://webfikra.com" target="_blank" rel="noopener noreferrer" className="font-black text-[#a3653b]">webfikra.com</a></p>
      </footer>
    </main>
  );
}
