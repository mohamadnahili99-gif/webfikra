import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-webfikra-arabic",
  display: "swap",
});

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: "WEBFIKRA",
  alternates: {
    canonical: "/",
  },
  robots: process.env.VERCEL_ENV === "preview"
    ? { index: false, follow: false }
    : { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
    title: "WEBFIKRA | تصميم مواقع المطاعم والمقاهي",
    description: "مواقع ومنيو رقمي وتجربة طلب مخصصة للمطاعم والمقاهي والمخابز.",
  },
  title: {
    default: "WEBFIKRA | تصميم مواقع المطاعم والمقاهي",
    template: "%s | WEBFIKRA",
  },
  description:
    "WEBFIKRA تصمم مواقع إلكترونية احترافية للمطاعم والمقاهي والمخابز، مع منيو رقمي وتجارب طلب سهلة ومتوافقة مع جميع الأجهزة.",
  keywords: [
    "تصميم مواقع المطاعم",
    "منيو إلكتروني",
    "موقع مطعم",
    "WEBFIKRA",
    "restaurant website design",
    "digital menu",
  ],
  openGraph: {
    title: "WEBFIKRA | مواقع رقمية تشبه هوية مطعمك",
    description:
      "تصميم مواقع ومنيو رقمي وتجربة طلب مميزة للمطاعم والمقاهي والمخابز.",
    type: "website",
    locale: "ar_LB",
    alternateLocale: ["en_US"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="ar"
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
