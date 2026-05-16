import { MetadataRoute } from "next";
import { getServices } from "@/actions/services";
import { getBlogPosts } from "@/actions/blogs";
import { IService } from "@/models/Service";
import { IBlogPost } from "@/models/BlogPost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.softechfinancials.com";

  const services = await getServices();
  const blogs = (await getBlogPosts()) as Array<
    Pick<IBlogPost, "slug" | "createdAt" | "updatedAt">
  >;

  const serviceUrls = services.map((service: IService) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const blogUrls = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    ...serviceUrls,
    ...blogUrls,
  ];
}
