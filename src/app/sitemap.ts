import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site-config";
import { getBlogPosts } from "@/actions/blogs";
import { getServices } from "@/actions/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const blogs = await getBlogPosts();
  const blogRoutes = blogs
    .filter((post: any) => post.isPublished !== false)
    .map((post: any) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt || now),
    }));

  const services = await getServices(true);
  const serviceRoutes = services.map((service: any) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt || service.createdAt || now),
  }));

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}
