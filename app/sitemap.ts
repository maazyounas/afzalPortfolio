import type { MetadataRoute } from "next";

import { navigation } from "@/lib/data/navigation";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/data/site-config";
import { teamMembers } from "@/lib/data/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = navigation
    .filter((item) => item.href !== "#")
    .map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      lastModified: new Date(),
    }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
  }));

  const teamRoutes = teamMembers.map((member) => ({
    url: `${siteConfig.url}/team/${member.slug}`,
    lastModified: new Date(member.updatedAt),
  }));

  const blogRoutes = siteConfig.blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    ...staticRoutes,
    ...serviceRoutes,
    ...teamRoutes,
    ...blogRoutes,
  ];
}
