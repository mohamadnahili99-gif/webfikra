import type { MetadataRoute } from "next";

const origin = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000");

export default function robots(): MetadataRoute.Robots {
  const preview = process.env.VERCEL_ENV === "preview";
  return {
    rules: preview
      ? { userAgent: "*", disallow: "/" }
      : {
          userAgent: "*",
          allow: "/",
          disallow: ["/restaurants/login", "/restaurants/register"],
        },
    sitemap: preview ? undefined : origin + "/sitemap.xml",
  };
}
