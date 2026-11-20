import type { Metadata } from "next";
import PortalPaused from "../../components/PortalPaused";

export const metadata: Metadata = {
  title: "بوابة المطاعم",
  robots: { index: false, follow: false },
};

export default function RestaurantLoginPage() {
  return (
    <PortalPaused
      title="بوابة إدارة المطاعم غير مفعّلة حالياً"
      description="نعمل على تجربة إدارة آمنة لمشاريع المطاعم. حالياً يمكنك طلب موقع أو منيو مخصّص والتواصل مع فريق WEBFIKRA مباشرة، من دون إنشاء حساب."
    />
  );
}
