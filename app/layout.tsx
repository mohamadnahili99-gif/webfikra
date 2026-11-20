import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
