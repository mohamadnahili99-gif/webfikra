import type { Metadata } from "next";
import LegalContent from "../components/LegalContent";

export const metadata: Metadata = {
  title: "شروط استخدام الموقع | Website Use Terms",
  description: "شروط استخدام موقع WEBFIKRA التعريفي وتجارب المنيو واستوديو التصميم.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <LegalContent kind="terms" />;
}
