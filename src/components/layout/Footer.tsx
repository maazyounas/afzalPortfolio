import Link from "next/link";

import { navigation } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/data/site-config";
import { TrustLogos } from "@/components/ui/TrustLogos";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
            {siteConfig.name}
          </p>
          <p className="mt-4 max-w-xl text-[var(--color-muted)]">{siteConfig.description}</p>

          <div className="mt-6">
            <div className="text-sm text-[var(--color-muted)]">Trusted by</div>
            <div className="mt-3">
              <TrustLogos />
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <form className="mt-2 flex gap-2">
            <input
              aria-label="Subscribe"
              placeholder="Email address"
              className="w-full rounded-full border border-[var(--color-line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
            <button className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
