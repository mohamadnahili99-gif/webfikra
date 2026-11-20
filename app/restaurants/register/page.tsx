import type { Metadata } from "next";
import PortalPaused from "../../components/PortalPaused";

export const metadata: Metadata = {
  title: "إنشاء حساب مطعم",
  robots: { index: false, follow: false },
};

export default function RestaurantRegisterPage() {
  return (
    <PortalPaused
      title="إنشاء حساب مطعم غير متاح بعد"
      description="لا نقوم بإنشاء حسابات مطاعم أو استلام كلمات مرور في هذه المرحلة. لطلب تصميم موقع أو منيو رقمي، أرسل تفاصيل نشاطك عبر نموذج التواصل في الصفحة الرئيسية."
    />
  );
}
