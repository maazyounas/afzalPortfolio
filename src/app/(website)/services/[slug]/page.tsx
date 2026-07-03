import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getServiceBySlug } from "@/actions/services";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { IService } from "@/models/Service";
import JsonLd from "@/components/JsonLd";

import { ServiceDetailClient } from "./ServiceDetailClient";
import { ServiceSkeleton } from "./ServiceSkeleton";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  return service
    ? {
        title: service.name,
        description: service.description,
      }
    : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service: IService | null = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Softech Financials",
    },
    areaServed: "Worldwide",
  };

  return (
    <SectionWrapper
      eyebrow="Services"
      title={service.name}
      intro={service.description}
    >
      <JsonLd data={jsonLdData} />
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: service.name, href: `/services/${service.slug}` },
          ]}
        />
      </div>

      <Suspense fallback={<ServiceSkeleton />}>
        <ServiceDetailClient service={service} />
      </Suspense>
    </SectionWrapper>
  );
}
