import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getServiceBySlug } from "@/actions/services";

type Props = {
  params: Promise<{ service: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <SectionWrapper
      eyebrow="Service Detail"
      title={service.name}
      intro={service.description}
    >
      <Breadcrumb
        items={[
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      />
      <div className="space-y-6 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_60px_rgba(17,33,31,0.08)]">
        <div className="text-lg leading-8 text-[var(--color-muted)] font-medium">
          {service.description}
        </div>

        {service.content && (
          <div className="mt-8 pt-8 border-t border-[var(--color-line)] whitespace-pre-wrap leading-relaxed text-[var(--color-ink)]">
            {service.content}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
