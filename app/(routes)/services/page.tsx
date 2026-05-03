import type { Metadata } from "next";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Softech Financials service lines across advisory, tax, reporting, and compliance.",
};

export default function ServicesPage() {
  return (
    <SectionWrapper
      eyebrow="Capabilities"
      title="Services tailored to each stage of financial maturity."
      intro="Each engagement is structured around measurable reporting improvements, stronger controls, and sharper executive visibility."
    >
      <Breadcrumb items={[{ label: "Services", href: "/services" }]} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Card
            key={service.slug}
            title={service.name}
            description={service.summary}
            href={`/services/${service.slug}`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
