import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  const now = new Date();

  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/blog",
    "/services",
    "/team",
    "/help",
    "/privacy",
    "/support",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  const blogRoutes = siteConfig.blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...blogRoutes];
}
