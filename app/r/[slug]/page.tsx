import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedMenu } from "@/lib/public-menu";
import RestaurantMenu from "@/app/components/RestaurantMenu";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getPublishedMenu(slug);
  if (!menu) return { title: "القائمة غير متاحة", robots: { index: false } };
  return {
    title: menu.restaurant.name + " | المنيو",
    description: menu.restaurant.description || "قائمة الطعام الرقمية — " + menu.restaurant.name,
    openGraph: { title: menu.restaurant.name + " — Menu" },
    robots: { index: true, follow: true },
  };
}

export default async function RestaurantMenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = await getPublishedMenu(slug);
  if (!menu) notFound();
  return <RestaurantMenu menu={menu} />;
}
