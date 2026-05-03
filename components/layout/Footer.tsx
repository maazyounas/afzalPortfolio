import Link from "next/link";

import { navigation } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/data/site-config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
            {siteConfig.name}
          </p>
          <p className="mt-4 max-w-xl text-[var(--color-muted)]">
            {siteConfig.description}
          </p>
        </div>
        <div className="grid gap-3">
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
      </div>
    </footer>
  );
}
