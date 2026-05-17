import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/site-config";
import { HeroStats } from "./HeroStats";
import { TrustLogos } from "@/components/ui/TrustLogos";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden scroll-mt-0">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.05),transparent_25%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:px-8 lg:py-16">
        {/* Left Content */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-(--color-accent) sm:text-xs">
            Finance systems for modern operators
          </p>

          <h1 className="mt-5 font-(family-name:--font-display) text-4xl font-bold leading-[1.02] text-(--color-ink) sm:text-5xl lg:text-6xl">
            Financial clarity that scales with your business.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-(--color-muted) sm:text-lg sm:leading-8">
            {siteConfig.description}
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button href="/#contact" className="w-full sm:w-auto">
              Book a discovery call
            </Button>

            <Button href="/#services" variant="secondary" className="w-full sm:w-auto">
              Explore services
            </Button>
          </div>

          {/* Trust */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-(--color-muted)">
              Trusted by
            </span>
            <TrustLogos />
          </div>
        </div>

        {/* Right Content */}
        <div className="relative w-full">
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
