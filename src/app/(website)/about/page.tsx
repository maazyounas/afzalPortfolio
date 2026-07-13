import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn how Softtech Financials helps leadership teams build stronger finance operations, reporting, and resilient controls.",
  openGraph: {
    title: "About Us | Softtech Financials",
    description: "Learn how Softtech Financials helps leadership teams build stronger finance operations, reporting, and resilient controls.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <SectionWrapper
        isMainHeader={true}
        eyebrow="About Us"
        title="A finance partner focused on operational clarity."
        intro="We help founders and finance leaders design dependable reporting, resilient controls, and better decision rhythms."
      >
        <Breadcrumb items={[{ label: "About", href: "/about" }]} />
      </SectionWrapper>
      <About />
      <Process />
    </>
  );
}

