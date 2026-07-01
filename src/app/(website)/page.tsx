import { getBlogPosts } from "@/actions/blogs";
import { getServices } from "@/actions/services";
import { getTeamMembers } from "@/actions/team";
import { getSettings } from "@/actions/settings";
import { getTestimonials } from "@/actions/testimonials";
import { getFaqs } from "@/actions/faq";
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


export const metadata = {
  title: "Home | Afzal's Portfolio",
  description: "Home page of Afzal's Portfolio.",
  keywords: ["portfolio", "home", "Afzal"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Home | Afzal's Portfolio",
    description: "Home page of Afzal's Portfolio.",
    url: "/",
  },
};


export const dynamic = "force-dynamic";

export default async function HomePage() {
  const services = await getServices(true);
  const teamMembers = await getTeamMembers();
  const settings = await getSettings();
  const blogPosts = await getBlogPosts();
  const featuredPosts =
    blogPosts.length > 0
      ? blogPosts
          .filter((post: { isPublished?: boolean }) => post.isPublished !== false)
          .slice(0, 3)
      : siteConfig.blogPosts.slice(0, 3);
  
  const testimonialsData = await getTestimonials();
  const activeTestimonials = testimonialsData.filter((t: any) => t.isActive);

  const faqsData = await getFaqs();
  const activeFaqs = faqsData.filter((f: any) => f.isActive);

  return (
    <>
      <Hero />
      <Services services={services} />
      <About />
      <Team members={teamMembers} />
      <BlogPreview posts={featuredPosts} />
      <Process />
      <Testimonials data={activeTestimonials} />
      <FAQAccordion faqs={activeFaqs} />
      <Contact 
        email={settings?.contactEmail} 
        phone={settings?.contactPhone} 
        mapLocation={settings?.mapLocation} 
        mapLatitude={settings?.mapLatitude}
        mapLongitude={settings?.mapLongitude}
      />
    </>
  );
}
