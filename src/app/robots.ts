import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site-config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    siteConfig.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
