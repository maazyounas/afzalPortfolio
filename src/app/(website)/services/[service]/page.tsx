import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { services } from "@/lib/data/services";

type Props = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.name,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <SectionWrapper
      eyebrow="Service Detail"
      title={service.name}
      intro={service.summary}
    >
      <Breadcrumb
        items={[
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_60px_rgba(17,33,31,0.08)]">
          <p className="text-lg leading-8 text-[var(--color-muted)]">
            {service.description}
          </p>
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">
              Outcomes
            </h2>
            <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>• {outcome}</li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="rounded-[2rem] bg-[var(--color-panel)] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Engagement Lens
          </p>
          <p className="mt-4 text-[var(--color-muted)]">
            Best for {service.audience}. Delivery typically starts with a
            discovery sprint and a reporting roadmap.
          </p>
        </aside>
      </div>
    </SectionWrapper>
  );
}
