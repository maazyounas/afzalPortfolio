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
  title: "Softtech Financials | Tax & Financial Consultancy in Pakistan",
  description:
    "Certified bookkeepers and tax advisors in GAAP and IFRS Compliance, helping businesses strengthen accounting, tax planning, and finance operations.",
  keywords: [
    "accounting firm",
    "tax advisory",
    "bookkeeping Islamabad",
    "finance consultancy",
    "corporate finance Pakistan",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Softtech Financials | Tax & Financial Consultancy in Pakistan",
    description:
      "Certified bookkeepers and tax advisors in GAAP and IFRS Compliance, helping businesses strengthen accounting, tax planning, and finance operations.",
    url: "/",
  },
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function HomePage() {
  const [services, teamMembers, settings, blogPosts, testimonialsData, faqsData] =
    await Promise.all([
      getServices(true),
      getTeamMembers(),
      getSettings(),
      getBlogPosts(),
      getTestimonials(),
      getFaqs(),
    ]);

  const featuredPosts =
    blogPosts.length > 0
      ? blogPosts
          .filter((post: { isPublished?: boolean }) => post.isPublished !== false)
          .slice(0, 3)
      : siteConfig.blogPosts.slice(0, 3);

  const activeTestimonials = testimonialsData.filter(
    (t: { isActive?: boolean }) => t.isActive
  );

  const activeFaqs = faqsData.filter((f: { isActive?: boolean }) => f.isActive);

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

