import type { Metadata } from "next";

import { Contact } from "@/components/sections/Contact";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Start a conversation with Softech Financials. Get expert advice on accounting, tax planning, and finance operations.",
  openGraph: {
    title: "Contact Us | Softech Financials",
    description: "Start a conversation with Softech Financials. Get expert advice on accounting, tax planning, and finance operations.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <SectionWrapper
        isMainHeader={true}
        eyebrow="Contact"
        title="Talk through your finance priorities with our team."
        intro="Whether you need strategic advisory or better monthly reporting, we can map the next step."
      >
        <Breadcrumb items={[{ label: "Contact", href: "/contact" }]} />
      </SectionWrapper>
      <Contact />
    </>
  );
}
