import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/site-config";
import { HeroStats } from "./HeroStats";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { TrustLogos } from "@/components/ui/TrustLogos";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.05),transparent_25%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-[1.2fr_0.8fr] md:py-32">
        
        {/* Left Content */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-(--color-accent)">
            Finance systems for modern operators
          </p>

          <h1 className="mt-6 font-(family-name:--font-display) text-4xl font-bold leading-[1.05] text-(--color-ink) md:text-5xl">
            Financial clarity that scales with your business.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-(--color-muted)">
            {siteConfig.description}
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact">
              Book a discovery call
            </Button>

            <Button href="/services" variant="secondary">
              Explore services
            </Button>
          </div>

          {/* Trust */}
          <div className="mt-10 flex items-center gap-5">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-(--color-muted)">
              Trusted by
            </span>
            <TrustLogos />
          </div>
        </div>

        {/* Right Content */}
        <div className="relative">
          <HeroStats />

          {/* Floating Cards */}
          <div className="pointer-events-none absolute -right-10 top-10 hidden lg:block">
            <FloatingCard className="w-64">
              <p className="text-xs uppercase tracking-[0.2em] text-(--color-muted)">
                Monthly burn
              </p>
              <p className="mt-2 text-2xl font-semibold text-(--color-ink)">
                $42,300
              </p>
            </FloatingCard>
          </div>

          <div className="pointer-events-none absolute -right-14 top-60 hidden lg:block">
            <FloatingCard className="w-52">
              <p className="text-xs uppercase tracking-[0.2em] text-(--color-muted)">
                Runway
              </p>
              <p className="mt-2 text-2xl font-semibold text-(--color-ink)">
                9 months
              </p>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
