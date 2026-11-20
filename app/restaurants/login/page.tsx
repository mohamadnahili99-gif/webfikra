import type { Metadata } from "next";
import PortalAuth from "../../components/PortalAuth";

export const metadata: Metadata = {
  title: "دخول إدارة المطاعم",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <PortalAuth mode="login" />;
}
