import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Team />
      <Process />
      <Testimonials />
      <FAQAccordion />
      <Contact />
    </>
  );
}
