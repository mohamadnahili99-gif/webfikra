import {
  cleanText, failure, positionOf, priceOf, readJson, requirePortal,
  sameOrigin, success, supabase, uuid, validImage,
  type MenuCategory, type MenuItem,
} from "@/lib/platform";

type Kind = "categories" | "items";
const columns = {
  categories: "id,restaurant_id,name,name_en,position,visible",
  items: "id,restaurant_id,category_id,name,name_en,description,description_en,price,image_url,position,visible",
} as const;

function readInput(kind: Kind, payload: Record<string, unknown>): { values: Record<string, unknown> } | { error: string } {
  const name = cleanText(payload.name, kind === "categories" ? 90 : 120);
  if (!name) return { error: "أدخل اسم الصنف أو القسم" };
  const values: Record<string, unknown> = {
    name,
    name_en: cleanText(payload.name_en, kind === "categories" ? 90 : 120),
    position: positionOf(payload.position),
    visible: payload.visible !== false,
  };
  if (kind === "items") {
    if (!uuid(payload.category_id)) return { error: "اختر قسماً صالحاً" };
    const price = priceOf(payload.price);
    if (price === null) return { error: "السعر غير صالح" };
    const image_url = cleanText(payload.image_url, 1000);
    if (!validImage(image_url)) return { error: "رابط الصورة يجب أن يكون HTTPS" };
    values.category_id = payload.category_id;
    values.description = cleanText(payload.description, 1000);
    values.description_en = cleanText(payload.description_en, 1000);
    values.price = price;
    values.image_url = image_url;
  }
  return { values };
}

export async function listMenu(kind: Kind, request: Request) {
  const auth = await requirePortal();
  if (!auth.ok) return failure("يرجى تسجيل الدخول", auth.status);
  const restaurant = new URL(request.url).searchParams.get("restaurantId");
  if (!uuid(restaurant)) return failure("المطعم غير صالح");
  try {
    const result = await supabase(
      "/rest/v1/wf_" + kind + "?restaurant_id=eq." + restaurant +
      "&select=" + columns[kind] + "&order=position.asc,created_at.asc".replace(",created_at.asc",kind==="categories"?"":",created_at.asc"),
      {}, auth.token,
    );
    if (!result.ok) return failure("تعذّر تحميل الأصناف أو الأقسام", 502);
    const rows = await readJson<MenuCategory[] | MenuItem[]>(result);
    return success({ entries: rows || [] });
  } catch { return failure("تعذّر الاتصال بقاعدة البيانات", 503); }
}

export async function mutateMenu(kind: Kind, request: Request, method: "POST" | "PATCH" | "DELETE") {
  if (!sameOrigin(request)) return failure("الطلب غير موثوق", 403);
  const auth = await requirePortal();
  if (!auth.ok) return failure("يرجى تسجيل الدخول", auth.status);
  let payload: Record<string, unknown>;
  try { payload = await request.json(); } catch { return failure("بيانات غير صالحة"); }
  if (!uuid(payload.restaurant_id)) return failure("المطعم غير صالح");
  if (method !== "POST" && !uuid(payload.id)) return failure("المعرّف غير صالح");
  const data = method === "DELETE" ? null : readInput(kind, payload);
  if (data && "error" in data) return failure(data.error);
  const table = "wf_" + kind;
  const filters = method === "POST" ? "" : "?id=eq." + payload.id + "&restaurant_id=eq." + payload.restaurant_id;
  try {
    const result = await supabase(
      "/rest/v1/" + table + filters + (method === "DELETE" ? "" : (filters ? "&" : "?") + "select=" + columns[kind]),
      {
        method,
        headers: { Prefer: "return=representation" },
        ...(method !== "DELETE" && data && "values" in data ? {
          body: JSON.stringify(method === "POST" ? {
            ...data.values, restaurant_id: payload.restaurant_id,
          } : data.values),
        } : {}),
      },
      auth.token,
    );
    if (!result.ok) return failure(result.status === 409 ? "يجب أن ينتمي الصنف إلى القسم نفسه" : "تعذّر حفظ التغييرات", result.status === 409 ? 409 : 502);
    const rows = await readJson<Array<MenuCategory | MenuItem>>(result);
    if (method !== "POST" && !rows?.length) return failure("العنصر غير موجود أو ليس لديك صلاحية", 404);
    return success({ entry: rows?.[0] || null }, method === "POST" ? 201 : 200);
  } catch { return failure("تعذّر الاتصال بقاعدة البيانات", 503); }
}
