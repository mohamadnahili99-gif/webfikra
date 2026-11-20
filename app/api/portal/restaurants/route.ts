import {
  cleanText, enabled, failure, priceOf, readJson, requirePortal,
  sameOrigin, slugIsValid, success, supabase, uuid, validImage, validSocial,
  type Restaurant,
} from "@/lib/platform";

export const dynamic = "force-dynamic";
const columns = "id,owner_id,slug,name,description,whatsapp,address,hours,instagram,tiktok,logo_url,cover_url,accent_color,currency,published";

function parseRestaurant(input: Record<string, unknown>) {
  const slug = cleanText(input.slug, 40).toLowerCase();
  const name = cleanText(input.name, 100);
  const whatsapp = cleanText(input.whatsapp, 15).replace(/\D/g, "");
  const description = cleanText(input.description, 1200);
  const address = cleanText(input.address, 300);
  const hours = cleanText(input.hours, 300);
  const instagram = cleanText(input.instagram, 250);
  const tiktok = cleanText(input.tiktok, 250);
  const logo_url = cleanText(input.logo_url, 1000);
  const cover_url = cleanText(input.cover_url, 1000);
  const accent_color = typeof input.accent_color === "string" ? input.accent_color : "#EF9754";
  const currency = input.currency;
  const published = input.published === true;
  if (!slugIsValid(slug)) return { error: "الرابط يجب أن يكون 3–40 حرفاً إنجليزياً صغيراً أو رقماً أو شرطة" };
  if (name.length < 2) return { error: "أدخل اسم المطعم" };
  if (!/^[0-9]{7,15}$/.test(whatsapp)) return { error: "أدخل رقم واتساب دولياً من 7 إلى 15 رقماً" };
  if (!validImage(logo_url) || !validImage(cover_url)) return { error: "روابط الصور يجب أن تكون HTTPS" };
  if (!validSocial(instagram) || !validSocial(tiktok)) return { error: "رابط إنستغرام أو تيك توك غير صالح" };
  if (!/^#[0-9a-fA-F]{6}$/.test(accent_color)) return { error: "رمز اللون غير صالح" };
  if (currency !== "USD" && currency !== "LBP") return { error: "العملة غير مدعومة" };
  return { values: { slug, name, whatsapp, description, address, hours, instagram, tiktok, logo_url, cover_url, accent_color, currency, published } };
}

export async function GET() {
  const auth = await requirePortal();
  if (!auth.ok) return failure("يرجى تسجيل الدخول", auth.status);
  try {
    const response = await supabase(
      "/rest/v1/wf_restaurants?owner_id=eq." + auth.user.id + "&select=" + columns + "&order=created_at.desc",
      {}, auth.token,
    );
    if (!response.ok) return failure("تعذّر تحميل المطاعم", 502);
    return success({ restaurants: (await readJson<Restaurant[]>(response)) || [] });
  } catch { return failure("تعذّر الوصول إلى قاعدة البيانات", 503); }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return failure("الطلب غير موثوق", 403);
  const auth = await requirePortal();
  if (!auth.ok) return failure("يرجى تسجيل الدخول", auth.status);
  let payload: Record<string, unknown>;
  try { payload = await request.json(); } catch { return failure("طلب غير صالح"); }
  const parsed = parseRestaurant(payload);
  if ("error" in parsed) return failure(parsed.error || "بيانات غير صالحة");
  try {
    const response = await supabase("/rest/v1/wf_restaurants?select=" + columns, {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ ...parsed.values, owner_id: auth.user.id }),
    }, auth.token);
    if (!response.ok) return failure(response.status === 409 ? "الرابط مستخدم بالفعل. اختر رابطاً آخر" : "تعذّر إنشاء المطعم", response.status === 409 ? 409 : 502);
    const rows = await readJson<Restaurant[]>(response);
    return success({ restaurant: rows?.[0] }, 201);
  } catch { return failure("تعذّر الوصول إلى قاعدة البيانات", 503); }
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return failure("الطلب غير موثوق", 403);
  const auth = await requirePortal();
  if (!auth.ok) return failure("يرجى تسجيل الدخول", auth.status);
  let payload: Record<string, unknown>;
  try { payload = await request.json(); } catch { return failure("طلب غير صالح"); }
  if (!uuid(payload.id)) return failure("معرّف المطعم غير صالح");
  const parsed = parseRestaurant(payload);
  if ("error" in parsed) return failure(parsed.error || "بيانات غير صالحة");
  try {
    const response = await supabase("/rest/v1/wf_restaurants?id=eq." + payload.id + "&owner_id=eq." + auth.user.id + "&select=" + columns, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(parsed.values),
    }, auth.token);
    if (!response.ok) return failure(response.status === 409 ? "الرابط مستخدم بالفعل" : "تعذّر تحديث المطعم", response.status === 409 ? 409 : 502);
    const rows = await readJson<Restaurant[]>(response);
    if (!rows?.length) return failure("المطعم غير موجود أو ليس لديك صلاحية", 404);
    return success({ restaurant: rows[0] });
  } catch { return failure("تعذّر الوصول إلى قاعدة البيانات", 503); }
}
