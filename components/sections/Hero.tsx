import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.18),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(186,139,88,0.16),_transparent_25%)]" />
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
        </div>
        <div className="relative rounded-[2.5rem] bg-[linear-gradient(180deg,#103d3a,#1f5e58)] p-8 text-white shadow-[0_24px_80px_rgba(17,33,31,0.2)]">
          <p className="text-sm uppercase tracking-[0.18em] text-white/70">
            Snapshot
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-4xl font-bold">30%</p>
              <p className="mt-2 text-white/70">Faster closes with stronger reporting workflows.</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100%</p>
              <p className="mt-2 text-white/70">Customized advisory led by senior finance specialists.</p>
            </div>
            <div>
              <p className="text-4xl font-bold">24/7</p>
              <p className="mt-2 text-white/70">Visibility into the metrics leadership teams actually use.</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1 Team</p>
              <p className="mt-2 text-white/70">Advisory, tax, and compliance support in one operating model.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
