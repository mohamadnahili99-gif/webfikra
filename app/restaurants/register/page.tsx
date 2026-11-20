import type { Metadata } from "next";
import PortalAuth from "../../components/PortalAuth";

export const metadata: Metadata = {
  title: "إنشاء حساب مطعم",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <PortalAuth mode="signup" />;
}
