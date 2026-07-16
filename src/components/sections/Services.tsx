import { Card } from "../ui/Card";
import { SectionWrapper } from "../ui/SectionWrapper";
import { IService } from "@/models/Service";

interface ServicesProps {
  services: Pick<IService, "slug" | "name" | "description" | "icon">[];
}

export function Services({ services }: ServicesProps) {
  return (
    <SectionWrapper
      id="services"
      eyebrow="Services"
      title="Support across forecasting, controls, reporting, and compliance."
      intro="Designed as modular service lines so clients can engage where the pressure is highest."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services?.length > 0 ? (
          services.map((service) => (
            <div key={service.slug} className="group relative h-full flex flex-col">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex-1 flex flex-col h-full">
                <Card
                  title={service.name}
                  description={service.description}
                  href={`/services/${encodeURIComponent(service.slug)}`}
                  icon={service.icon}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-[var(--color-line)] bg-white/60 p-10 text-center text-sm text-[var(--color-muted)]">
            <div className="mb-2 text-lg font-semibold text-[var(--color-ink)]">
              No services available
            </div>
            <p>Please check back later or contact support for updates.</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
