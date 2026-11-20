"use client";

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Restaurant, MenuCategory, MenuItem } from "@/lib/platform";

type Draft = Omit<Restaurant, "id" | "owner_id">;
type Tab = "restaurant" | "categories" | "items";
type Session = { configured: boolean; authenticated: boolean; user?: { email: string } };
type CategoryDraft = { id: string; name: string; position: number; visible: boolean };
type ItemDraft = { id: string; category_id: string; name: string; description: string; price: string; image_url: string; position: number; visible: boolean };

const blankRestaurant: Draft = {
  slug: "", name: "", description: "", whatsapp: "", address: "", hours: "",
  instagram: "", tiktok: "", logo_url: "", cover_url: "",
  accent_color: "#EF9754", currency: "USD", published: false,
};
const blankCategory: CategoryDraft = { id: "", name: "", position: 0, visible: true };
const blankItem: ItemDraft = { id: "", category_id: "", name: "", description: "", price: "0", image_url: "", position: 0, visible: true };

const input = "mt-2 w-full rounded-xl border border-[#dfd3c6] bg-white px-4 py-3 text-sm text-[#2d2119] outline-none placeholder:text-[#a7988b] focus:border-[#b9794a] focus:ring-2 focus:ring-[#e6b48e]/20";
const label = "block text-sm font-bold text-[#473529]";
type Json = Record<string, unknown>;

async function send<T>(url: string, method: string = "GET", body?: Json): Promise<T> {
  const response = await fetch(url, {
    method,
    cache: "no-store",
    ...(body ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {}),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload?.error || "تعذّر إكمال الطلب");
  return payload as T;
}

export default function RestaurantPortal() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [restaurant, setRestaurant] = useState<Draft>(blankRestaurant);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [category, setCategory] = useState<CategoryDraft>(blankCategory);
  const [item, setItem] = useState<ItemDraft>(blankItem);
  const [tab, setTab] = useState<Tab>("restaurant");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const loadRestaurants = useCallback(async (keepId?: string) => {
    const data = await send<{ restaurants: Restaurant[] }>("/api/portal/restaurants");
    setRestaurants(data.restaurants);
    const next = data.restaurants.find((r) => r.id === keepId) || data.restaurants[0];
    if (next) {
      setSelectedId(next.id);
      setRestaurant(toDraft(next));
    } else {
      setSelectedId("");
      setRestaurant(blankRestaurant);
    }
  }, []);

  const loadMenu = useCallback(async (id: string) => {
    const [cat, dish] = await Promise.all([
      send<{ entries: MenuCategory[] }>("/api/portal/categories?restaurantId=" + id),
      send<{ entries: MenuItem[] }>("/api/portal/items?restaurantId=" + id),
    ]);
    setCategories(cat.entries);
    setItems(dish.entries);
  }, []);

  useEffect(() => {
    let alive = true;
    send<Session>("/api/portal/session").then(async (sessionResult) => {
      if (!alive) return;
      setSession(sessionResult);
      if (sessionResult.configured && sessionResult.authenticated) {
        try { await loadRestaurants(); } catch (e) { if (alive) setError(errorMessage(e)); }
      }
    }).catch(() => { if (alive) setError("تعذّر التحقق من اتصال قاعدة البيانات"); });
    return () => { alive = false; };
  }, [loadRestaurants]);

  useEffect(() => {
    if (!selectedId) return;
    let active = true;
    // Start after the current render so the effect itself never sets state synchronously.
    Promise.resolve().then(() => loadMenu(selectedId))
      .catch((e) => { if (active) setError(errorMessage(e)); });
    return () => { active = false; };
  }, [selectedId, loadMenu]);

  function selectRestaurant(id: string) {
    const found = restaurants.find((r) => r.id === id);
    if (!found) return;
    setSelectedId(id);
    setRestaurant(toDraft(found));
    setTab("restaurant"); setCategory(blankCategory); setItem(blankItem);
    setError(""); setNotice("");
  }
  function newRestaurant() {
    setSelectedId(""); setRestaurant(blankRestaurant); setCategories([]); setItems([]);
    setTab("restaurant"); setError(""); setNotice(""); setCategory(blankCategory); setItem(blankItem);
  }
  function editRestaurant<K extends keyof Draft>(key: K, value: Draft[K]) {
    setRestaurant((current) => ({ ...current, [key]: value }));
  }
  async function saveRestaurant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const result = await send<{ restaurant: Restaurant }>("/api/portal/restaurants",
        selectedId ? "PATCH" : "POST", selectedId ? { ...restaurant, id: selectedId } : { ...restaurant });
      await loadRestaurants(result.restaurant.id);
      setNotice("تم حفظ بيانات المطعم بنجاح.");
    } catch (e) { setError(errorMessage(e)); } finally { setBusy(false); }
  }
  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!selectedId || busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      await send("/api/portal/categories", category.id ? "PATCH" : "POST",
        { ...category, restaurant_id: selectedId });
      await loadMenu(selectedId);
      setCategory(blankCategory); setNotice("تم حفظ القسم.");
    } catch (e) { setError(errorMessage(e)); } finally { setBusy(false); }
  }
  async function removeCategory(id: string) {
    if (!selectedId || !window.confirm("حذف هذا القسم سيحذف جميع أصنافه نهائياً. هل أنت متأكد؟")) return;
    setBusy(true); setError("");
    try {
      await send("/api/portal/categories", "DELETE", { id, restaurant_id: selectedId });
      await loadMenu(selectedId); setCategory(blankCategory); setNotice("تم حذف القسم.");
    } catch (e) { setError(errorMessage(e)); } finally { setBusy(false); }
  }
  async function saveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!selectedId || busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const result = { ...item, price: Number(item.price), restaurant_id: selectedId };
      await send("/api/portal/items", item.id ? "PATCH" : "POST", result);
      await loadMenu(selectedId); setItem(blankItem); setNotice("تم حفظ الصنف.");
    } catch (e) { setError(errorMessage(e)); } finally { setBusy(false); }
  }
  async function removeItem(id: string) {
    if (!selectedId || !window.confirm("هل تريد حذف هذا الصنف نهائياً؟")) return;
    setBusy(true); setError("");
    try {
      await send("/api/portal/items", "DELETE", { id, restaurant_id: selectedId });
      await loadMenu(selectedId); setItem(blankItem); setNotice("تم حذف الصنف.");
    } catch (e) { setError(errorMessage(e)); } finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true);
    try { await send("/api/portal/session", "POST", { mode: "logout" }); router.push("/restaurants/login"); }
    catch (e) { setError(errorMessage(e)); setBusy(false); }
  }

  if (session === null) return <Shell><p className="rounded-2xl bg-white/10 p-6">جار تحميل بوابة المطاعم…</p></Shell>;
  if (!session.configured) return <Shell>
    <div className="max-w-2xl rounded-3xl border border-[#dca36e]/25 bg-[#35261d] p-9">
      <h1 className="text-3xl font-black">بوابة المطاعم بانتظار ربط Supabase</h1>
      <p className="mt-5 text-sm leading-9 text-white/70">تم تجهيز الواجهة وقاعدة البيانات والوظائف، لكنها لا تستقبل حسابات أو بيانات قبل إعداد المتغيرات السرية وتشغيل ترحيل SQL في Supabase. الموقع التعريفي لا يزال متاحاً.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-[#edab7d] px-6 py-3 font-black text-[#28190e]">العودة إلى WEBFIKRA ↗</Link>
    </div>
  </Shell>;
  if (!session.authenticated) return <Shell><div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8">
    <h1 className="text-3xl font-black">سجّل الدخول لإدارة مطعمك</h1>
    <p className="mt-4 leading-8 text-white/60">الأقسام والأسعار والصور محفوظة في حسابك وتظهر هنا فقط بعد تسجيل الدخول.</p>
    <Link href="/restaurants/login" className="mt-7 inline-flex rounded-full bg-[#f0a66e] px-6 py-4 font-black text-[#24160f]">تسجيل الدخول ↗</Link>
  </div></Shell>;

  const publicLink = selectedId ? "/r/" + restaurant.slug : "";
  const qrUrl = typeof window !== "undefined" && publicLink
    ? "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=" + encodeURIComponent(window.location.origin + publicLink)
    : "";

  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-[#f4ede4] text-[#2b2018]">
      <header className="border-b border-[#d9c9b9] bg-[#1d1712] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <Link href="/" className="text-2xl font-black"><bdi dir="ltr">WEB<span className="text-[#f0a66e]">FIKRA.</span></bdi></Link>
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <span className="text-white/55">{session.user?.email || "حساب المطعم"}</span>
            <button type="button" disabled={busy} onClick={logout} className="rounded-full border border-white/25 px-4 py-2.5 font-semibold text-[#f2ba93]">تسجيل الخروج</button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black tracking-widest text-[#b16b40]">RESTAURANT WORKSPACE</p><h1 className="mt-3 text-3xl font-black sm:text-4xl">إدارة مطاعمك</h1><p className="mt-3 text-sm text-[#766658]">أضف الأقسام والأصناف، ثم انشر منيو مطعمك عندما يصبح جاهزاً.</p></div>
          <button type="button" onClick={newRestaurant} className="rounded-full bg-[#ad6638] px-6 py-3 text-sm font-black text-white">+ مطعم جديد</button>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="self-start rounded-3xl border border-[#e1d3c6] bg-white p-5">
            <p className="mb-4 text-xs font-black text-[#b18366]">المطاعم ({restaurants.length})</p>
            {restaurants.length === 0 && <p className="text-sm leading-7 text-[#846f62]">لم تُضف مطعماً بعد. ابدأ بملء البيانات.</p>}
            <div className="space-y-2">{restaurants.map((r)=>(
              <button key={r.id} type="button" onClick={()=>selectRestaurant(r.id)} className={selectedId===r.id?"w-full rounded-xl bg-[#f2dfd0] px-4 py-3 text-right text-sm font-black":"w-full rounded-xl px-4 py-3 text-right text-sm font-bold hover:bg-[#f5eee7]"}>
                <span className="block">{r.name}</span><span className="mt-1 block text-[11px] font-normal text-[#8a7465]">{r.published ? "منشور" : "مسودة"} · {r.slug}</span>
              </button>))}
            </div>
          </aside>
          <div className="min-w-0">
            <nav className="mb-5 flex flex-wrap gap-2" aria-label="أقسام الإدارة">
              {([
                ["restaurant","بيانات المطعم"],
                ["categories","الأقسام"],
                ["items","الأصناف والأسعار"],
              ] as const).map(([id,name])=>(
                <button key={id} type="button" onClick={()=>{setTab(id);setError("");setNotice("");}} disabled={!selectedId && id!=="restaurant"}
                  className={tab===id?"rounded-full bg-[#2b2119] px-5 py-3 text-sm font-bold text-white":"rounded-full border border-[#dfd0c1] bg-white px-5 py-3 text-sm font-bold disabled:opacity-40"}>{name}</button>
              ))}
            </nav>
            {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
            {notice && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}

            {tab === "restaurant" && <section className="rounded-3xl border border-[#e1d2c5] bg-[#fffaf5] p-6 sm:p-9">
              <h2 className="text-2xl font-black">{selectedId ? "تعديل بيانات المطعم" : "إنشاء مطعم جديد"}</h2>
              <form onSubmit={saveRestaurant} className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field labelText="اسم المطعم *" value={restaurant.name} setValue={v=>editRestaurant("name",v)} required maxLength={100}/>
                <Field labelText="رابط المنيو (إنجليزي) *" value={restaurant.slug} setValue={v=>editRestaurant("slug",v.toLowerCase().replace(/[^a-z0-9-]/g,""))} required maxLength={40} placeholder="my-restaurant" ltr />
                <Field labelText="رقم واتساب دولي *" value={restaurant.whatsapp} setValue={v=>editRestaurant("whatsapp",v.replace(/\D/g,""))} required maxLength={15} placeholder="96171524556" ltr />
                <Field labelText="العنوان" value={restaurant.address} setValue={v=>editRestaurant("address",v)} maxLength={300} />
                <Field labelText="ساعات العمل" value={restaurant.hours} setValue={v=>editRestaurant("hours",v)} maxLength={300} placeholder="10:00 صباحاً - 11:00 ليلاً"/>
                <Field labelText="رابط صورة الشعار HTTPS" value={restaurant.logo_url} setValue={v=>editRestaurant("logo_url",v)} maxLength={1000} ltr/>
                <Field labelText="رابط صورة الغلاف HTTPS" value={restaurant.cover_url} setValue={v=>editRestaurant("cover_url",v)} maxLength={1000} ltr/>
                <Field labelText="رابط Instagram" value={restaurant.instagram} setValue={v=>editRestaurant("instagram",v)} maxLength={250} ltr/>
                <Field labelText="رابط TikTok" value={restaurant.tiktok} setValue={v=>editRestaurant("tiktok",v)} maxLength={250} ltr/>
                <label className={label}>العملة
                  <select className={input} value={restaurant.currency} onChange={e=>editRestaurant("currency",e.target.value as "USD" | "LBP")}><option value="USD">دولار أمريكي USD</option><option value="LBP">ليرة لبنانية LBP</option></select>
                </label>
                <label className={label}>لون العلامة
                  <div className="mt-2 flex items-center gap-3"><input aria-label="اختيار اللون" type="color" value={restaurant.accent_color} onChange={e=>editRestaurant("accent_color",e.target.value)} className="h-11 w-14 cursor-pointer rounded-lg border border-[#ddc7b5]"/><span dir="ltr" className="text-sm">{restaurant.accent_color}</span></div>
                </label>
                <label className={label+" sm:col-span-2"}>نبذة المطعم
                  <textarea value={restaurant.description} maxLength={1200} rows={3} onChange={e=>editRestaurant("description",e.target.value)} className={input+" resize-y"} />
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-[#ddcbb9] bg-[#f7eee5] p-4 text-sm font-bold sm:col-span-2">
                  <input type="checkbox" checked={restaurant.published} onChange={e=>editRestaurant("published",e.target.checked)} className="h-5 w-5 accent-[#ad6638]"/>
                  نشر المنيو للزبائن (أزل التحديد لإخفائه)
                </label>
                <button type="submit" disabled={busy} className="rounded-full bg-[#ab673b] px-7 py-4 font-black text-white disabled:opacity-50 sm:col-span-2">{busy?"جار الحفظ…":"حفظ بيانات المطعم"}</button>
              </form>
              <p className="mt-4 text-xs leading-6 text-[#897467]">للصور: استخدم روابط صور HTTPS عامة. رفع الملفات من الجهاز سيحتاج إلى تفعيل التخزين لاحقاً.</p>
              {selectedId && <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-[#e3d5c7] bg-white p-5">
                <div><p className="text-sm font-black">رابط المنيو</p><p dir="ltr" className="mt-2 break-all text-xs text-[#947360]">/r/{restaurant.slug}</p><p className="mt-2 text-xs text-[#9a8475]">{restaurant.published ? "متاح للزبائن" : "غير منشور حالياً"}</p></div>
                {restaurant.published && <Link href={publicLink} target="_blank" className="rounded-full bg-[#2c211a] px-5 py-3 text-xs font-bold text-white">فتح منيو المطعم ↗</Link>}
                {restaurant.published && qrUrl && <a href={qrUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#bb8b65] px-5 py-3 text-xs font-bold text-[#93572e]">عرض QR للطباعة ↗</a>}
              </div>}
              {selectedId && restaurant.published && <p className="mt-3 text-xs text-[#987d6b]">صورة QR تُفتح عبر خدمة خارجية ترسل لها رابط المنيو العام فقط.</p>}
            </section>}

            {tab === "categories" && <section className="rounded-3xl border border-[#e1d2c5] bg-[#fffaf5] p-6 sm:p-9">
              <h2 className="text-2xl font-black">أقسام المنيو</h2>
              <p className="mt-3 text-sm text-[#806e61]">مثال: مناقيش، كعك، عصائر، صوصات. يمكنك إخفاء أي قسم.</p>
              <form onSubmit={saveCategory} className="mt-7 grid items-end gap-4 sm:grid-cols-[1fr_110px_auto]">
                <Field labelText="اسم القسم" value={category.name} setValue={v=>setCategory(c=>({...c,name:v}))} maxLength={90} required />
                <label className={label}>الترتيب<input type="number" min={0} max={9999} value={category.position} onChange={e=>setCategory(c=>({...c,position:Number(e.target.value)}))} className={input}/></label>
                <button disabled={busy} type="submit" className="rounded-xl bg-[#ad6638] px-5 py-3.5 text-sm font-black text-white disabled:opacity-40">{category.id?"تحديث":"إضافة"}</button>
                <label className="flex items-center gap-2 text-xs font-bold sm:col-span-3"><input type="checkbox" checked={category.visible} onChange={e=>setCategory(c=>({...c,visible:e.target.checked}))}/> إظهار القسم</label>
                {category.id && <button type="button" onClick={()=>setCategory(blankCategory)} className="text-right text-xs text-[#a46d48] sm:col-span-3">إلغاء التعديل</button>}
              </form>
              <div className="mt-8 space-y-3">{categories.map(c=><div key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e4d8cd] bg-white p-4">
                <div><p className="font-black">{c.name}</p><p className="mt-1 text-xs text-[#9b8171]">{c.visible?"ظاهر":"مخفي"} · الترتيب {c.position}</p></div>
                <div className="flex gap-3 text-xs font-bold"><button type="button" onClick={()=>setCategory({id:c.id,name:c.name,position:c.position,visible:c.visible})} className="text-[#9f6039]">تعديل</button><button type="button" disabled={busy} onClick={()=>removeCategory(c.id)} className="text-red-700">حذف</button></div>
              </div>)}</div>
              {!categories.length && <p className="mt-6 text-sm text-[#9b8371]">لا توجد أقسام. أضف قسمك الأول.</p>}
            </section>}

            {tab === "items" && <section className="rounded-3xl border border-[#e1d2c5] bg-[#fffaf5] p-6 sm:p-9">
              <h2 className="text-2xl font-black">الأصناف والأسعار</h2>
              {categories.length === 0 ? <p className="mt-6 text-sm text-[#936f55]">أضف قسماً أولاً قبل إضافة الأصناف.</p> : (
                <form onSubmit={saveItem} className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Field labelText="اسم الصنف *" value={item.name} setValue={v=>setItem(c=>({...c,name:v}))} required maxLength={120}/>
                  <label className={label}>القسم *
                    <select required className={input} value={item.category_id} onChange={e=>setItem(c=>({...c,category_id:e.target.value}))}>
                      <option value="">اختر القسم</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </label>
                  <Field labelText={"السعر (" + restaurant.currency + ") *"} value={item.price} setValue={v=>setItem(c=>({...c,price:v}))} required ltr placeholder="0.00" />
                  <Field labelText="رابط صورة الصنف HTTPS" value={item.image_url} setValue={v=>setItem(c=>({...c,image_url:v}))} maxLength={1000} ltr/>
                  <Field labelText="وصف / مكونات الصنف" value={item.description} setValue={v=>setItem(c=>({...c,description:v}))} maxLength={1000}/>
                  <label className={label}>الترتيب<input type="number" min={0} max={9999} className={input} value={item.position} onChange={e=>setItem(c=>({...c,position:Number(e.target.value)}))}/></label>
                  <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={item.visible} onChange={e=>setItem(c=>({...c,visible:e.target.checked}))}/> إظهار الصنف</label>
                  <div className="flex flex-wrap gap-3 sm:col-span-2">
                    <button type="submit" disabled={busy} className="rounded-full bg-[#ac6438] px-7 py-3 font-black text-white disabled:opacity-40">{item.id?"تحديث الصنف":"إضافة الصنف"}</button>
                    {item.id && <button type="button" onClick={()=>setItem(blankItem)} className="rounded-full border border-[#d7c6b7] px-5 py-3 text-sm font-bold">إلغاء</button>}
                  </div>
                </form>
              )}
              <div className="mt-8 space-y-3">{items.map(i=><div key={i.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e4d8cd] bg-white p-4">
                <div><p className="font-black">{i.name}</p><p className="mt-1 text-xs text-[#9b8171]">{categories.find(c=>c.id===i.category_id)?.name || "قسم"} · {Number(i.price).toFixed(2)} {restaurant.currency} · {i.visible?"ظاهر":"مخفي"}</p></div>
                <div className="flex gap-3 text-xs font-bold"><button type="button" className="text-[#9f6039]" onClick={()=>setItem({id:i.id,category_id:i.category_id,name:i.name,description:i.description,price:String(i.price),image_url:i.image_url,position:i.position,visible:i.visible})}>تعديل</button><button disabled={busy} type="button" onClick={()=>removeItem(i.id)} className="text-red-700">حذف</button></div>
              </div>)}</div>
              {!items.length && <p className="mt-6 text-sm text-[#9b8371]">لم تُضف أصنافاً بعد.</p>}
            </section>}
          </div>
        </div>
      </div>
    </main>
  );
}

function toDraft(r: Restaurant): Draft {
  return {
    slug: r.slug, name: r.name, description: r.description, whatsapp: r.whatsapp, address: r.address,
    hours: r.hours, instagram: r.instagram, tiktok: r.tiktok, logo_url: r.logo_url, cover_url: r.cover_url,
    accent_color: r.accent_color, currency: r.currency, published: r.published,
  };
}
function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "تعذّر إكمال العملية";
}
function Field({labelText,value,setValue,required=false,maxLength=250,placeholder="",ltr=false}: {
  labelText:string;value:string;setValue:(value:string)=>void;required?:boolean;maxLength?:number;placeholder?:string;ltr?:boolean;
}) {
  return <label className={label}>{labelText}<input type="text" dir={ltr?"ltr":undefined} value={value} onChange={e=>setValue(e.target.value)} required={required} maxLength={maxLength} placeholder={placeholder} className={input}/></label>;
}
function Shell({children}:{children:ReactNode}) {
  return <main dir="rtl" lang="ar" className="min-h-screen bg-[#15110e] px-5 py-14 text-white"><div className="mx-auto max-w-6xl"><Link href="/" className="text-3xl font-black"><bdi dir="ltr">WEB<span className="text-[#eca26d]">FIKRA.</span></bdi></Link><div className="mt-16">{children}</div></div></main>;
}
