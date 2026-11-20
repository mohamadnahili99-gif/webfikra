import "server-only";
import { enabled, readJson, slugIsValid, supabase, type MenuCategory, type MenuItem } from "@/lib/platform";

export type PublishedRestaurant = {
  id: string;
  slug: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  whatsapp: string;
  address: string;
  hours: string;
  instagram: string;
  tiktok: string;
  logo_url: string;
  cover_url: string;
  accent_color: string;
  currency: "USD" | "LBP";
};
export type PublishedMenu = {
  restaurant: PublishedRestaurant;
  categories: MenuCategory[];
  items: MenuItem[];
};

export async function getPublishedMenu(slug: string): Promise<PublishedMenu | null> {
  if (!enabled() || !slugIsValid(slug)) return null;
  try {
    const restaurantResult = await supabase(
      "/rest/v1/wf_restaurants?slug=eq." + slug +
      "&published=eq.true&select=id,slug,name,name_en,description,description_en,whatsapp,address,hours,instagram,tiktok,logo_url,cover_url,accent_color,currency&limit=1",
    );
    if (!restaurantResult.ok) return null;
    const rows = await readJson<PublishedRestaurant[]>(restaurantResult);
    const restaurant = rows?.[0];
    if (!restaurant) return null;
    const [categoriesResponse, itemsResponse] = await Promise.all([
      supabase("/rest/v1/wf_categories?restaurant_id=eq." + restaurant.id + "&visible=eq.true&select=id,restaurant_id,name,name_en,position,visible&order=position.asc"),
      supabase("/rest/v1/wf_items?restaurant_id=eq." + restaurant.id + "&visible=eq.true&select=id,restaurant_id,category_id,name,name_en,description,description_en,price,image_url,position,visible&order=position.asc"),
    ]);
    if (!categoriesResponse.ok || !itemsResponse.ok) return null;
    const categories = await readJson<MenuCategory[]>(categoriesResponse);
    const items = await readJson<MenuItem[]>(itemsResponse);
    return { restaurant, categories: categories || [], items: items || [] };
  } catch {
    return null;
  }
}
