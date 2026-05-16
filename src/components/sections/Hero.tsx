import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/site-config";
import { HeroStats } from "./HeroStats";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { TrustLogos } from "@/components/ui/TrustLogos";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,164,0.08),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.04),_transparent_20%)]" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Finance systems for modern operators
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-tight text-[var(--color-ink)] md:text-7xl">
            Financial clarity that scales with your business.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Book a discovery call</Button>
            <Button href="/services" variant="secondary">
              Explore services
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="text-xs text-zinc-500">Trusted by</div>
            <TrustLogos />
          </div>
        </div>

        <div className="relative">
          <HeroStats />

          <div className="pointer-events-none absolute -right-10 top-6 hidden lg:block">
            <FloatingCard className="w-64">
              <div className="text-sm text-[var(--color-muted)]">Monthly burn</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">$42,300</div>
            </FloatingCard>
          </div>

          <div className="pointer-events-none absolute -right-16 top-52 hidden lg:block">
            <FloatingCard className="w-52">
              <div className="text-sm text-[var(--color-muted)]">Runway</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">9 months</div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
