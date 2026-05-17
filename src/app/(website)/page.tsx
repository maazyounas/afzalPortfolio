import { getBlogPosts } from "@/actions/blogs";
import { getServices } from "@/actions/services";
import { About } from "@/components/sections/About";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { siteConfig } from "@/lib/data/site-config";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const services = await getServices(true);
  const blogPosts = await getBlogPosts();
  const featuredPosts =
    blogPosts.length > 0
      ? blogPosts
          .filter((post: { isPublished?: boolean }) => post.isPublished !== false)
          .slice(0, 3)
      : siteConfig.blogPosts.slice(0, 3);

  return (
    <>
      <Hero />
      <Services services={services} />
      <About />
      <Team />
      <BlogPreview posts={featuredPosts} />
      <Process />
      <Testimonials />
      <FAQAccordion />
      <Contact />
    </>
  );
}
