import { getPublishedMenu } from "@/lib/public-menu";
import { failure, success } from "@/lib/platform";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = await getPublishedMenu(slug);
  if (!menu) return failure("هذه القائمة غير موجودة أو غير منشورة", 404);
  return success(menu);
}
