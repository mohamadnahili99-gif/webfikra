import type { Metadata } from "next";
import RestaurantPortal from "../../components/RestaurantPortal";

export const metadata: Metadata = {
  title: "إدارة المطاعم",
  description: "إدارة منيو مطعمك وأصنافه وألوانه ونشره للزبائن.",
  robots: { index: false, follow: false },
};

export default function RestaurantPortalPage() {
  return <RestaurantPortal />;
}
