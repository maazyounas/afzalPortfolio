import { services } from "@/lib/data/services";

import { Card } from "../ui/Card";
import { SectionWrapper } from "../ui/SectionWrapper";

export function Services() {
  return (
    <SectionWrapper
      eyebrow="Services"
      title="Support across forecasting, controls, reporting, and compliance."
      intro="Designed as modular service lines so clients can engage where the pressure is highest."
    >
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
