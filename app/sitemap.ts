import type { MetadataRoute } from "next";

const origin = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: origin + "/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
