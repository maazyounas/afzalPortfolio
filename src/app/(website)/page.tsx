import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { getServices } from "@/actions/services";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const services = await getServices(true);

  return (
    <>
      <Hero />
      <Services services={services} />
      <About />
      <Team />
      <Process />
      <Testimonials />
      <FAQAccordion />
      <Contact />
    </>
  );
}
