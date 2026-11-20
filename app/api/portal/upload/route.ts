import { randomUUID } from "node:crypto";
import { failure, readJson, requirePortal, sameOrigin, success, supabase, uuid } from "@/lib/platform";

const MAX_BYTES = 5 * 1024 * 1024;
const SUPPORTED = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

function matchesMagic(bytes: Buffer, kind: string) {
  if (kind === "image/jpeg") return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (kind === "image/png") return bytes.length > 8 && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  if (kind === "image/webp") return bytes.length > 12 && bytes.toString("ascii",0,4)==="RIFF" && bytes.toString("ascii",8,12)==="WEBP";
  return false;
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return failure("الطلب غير موثوق", 403);
  const auth = await requirePortal();
  if (!auth.ok) return failure("يرجى تسجيل الدخول", auth.status);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BYTES + 50000) return failure("حجم الصورة يتجاوز 5 ميغابايت", 413);
  let form: FormData;
  try { form = await request.formData(); } catch { return failure("تعذّر قراءة الملف"); }

  const restaurantId = form.get("restaurantId");
  const file = form.get("file");
  if (!uuid(restaurantId)) return failure("المطعم غير صالح");
  if (!(file instanceof File) || !file.size || file.size > MAX_BYTES) return failure("اختر صورة بحجم لا يتجاوز 5 ميغابايت", 413);
  const mime = file.type as keyof typeof SUPPORTED;
  if (!(mime in SUPPORTED)) return failure("يُسمح بصور JPG أو PNG أو WebP فقط");

  try {
    const lookup = await supabase(
      "/rest/v1/wf_restaurants?id=eq." + restaurantId + "&owner_id=eq." + auth.user.id + "&select=id&limit=1",
      {},
      auth.token,
    );
    const owned = await readJson<Array<{ id: string }>>(lookup);
    if (!lookup.ok || !owned?.length) return failure("المطعم غير موجود أو ليس لديك صلاحية", 403);
    const bytes = Buffer.from(await file.arrayBuffer());
    if (!matchesMagic(bytes, mime)) return failure("نوع الملف لا يطابق صورة صالحة");
    const path = auth.user.id + "/" + restaurantId + "/" + randomUUID() + "." + SUPPORTED[mime];
    const upload = await supabase("/storage/v1/object/wf-menu-media/" + path, {
      method: "POST",
      headers: { "Content-Type": mime, "x-upsert": "false" },
      body: bytes,
    }, auth.token);
    if (!upload.ok) return failure("تعذّر رفع الصورة؛ تحقق من إعدادات تخزين Supabase", 502);
    const publicUrl = process.env.SUPABASE_URL!.replace(/\/$/, "") + "/storage/v1/object/public/wf-menu-media/" + path;
    return success({ url: publicUrl }, 201);
  } catch {
    return failure("تعذّر الاتصال بالتخزين", 503);
  }
}
