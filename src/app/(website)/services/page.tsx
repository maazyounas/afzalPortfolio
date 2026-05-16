import type { Metadata } from "next";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getServices } from "@/actions/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Softech Financials service lines across advisory, tax, reporting, and compliance.",
};

export default async function ServicesPage() {
  const services = await getServices(true);

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
            description={service.description}
            href={`/services/${service.slug}`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
