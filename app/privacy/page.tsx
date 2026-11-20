import type { Metadata } from "next";
import LegalContent from "../components/LegalContent";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | Privacy Notice",
  description: "طريقة تعامل WEBFIKRA مع معلومات الزوار والتواصل عبر واتساب وتفضيل اللغة.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalContent kind="privacy" />;
}
