"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navigation } from "@/lib/data/navigation";

import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const ids = navigation.map((n) => n.href.replace(/^\//, ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { root: null, threshold: 0.45 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const onScroll = () => setShowCTA(window.scrollY > 220);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-glass)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
          Softech Financials
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => {
            const id = item.href.replace(/^\//, "");
            const isActive = active === id;
            const handleClick = (e: React.MouseEvent) => {
              // if on homepage and section exists, smooth scroll instead of navigate
              if (window.location.pathname === "/") {
                const el = document.getElementById(id);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }
            };

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={`relative text-sm font-medium transition-colors ${isActive ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"}`}>
                {item.label}
                <span className={`absolute -bottom-3 left-0 h-0.5 w-0 rounded-full bg-[var(--color-accent)] ${isActive ? "w-full" : ""} transition-all`} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="rounded-xl border border-transparent bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg hover:translate-y-[-1px]"
          >
            Get Started
          </Link>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>

      {/* sticky CTA */}
      <div className={`fixed right-6 bottom-6 z-50 transition-opacity ${showCTA ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <a href="/contact" className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg">Get Started</a>
      </div>
    </header>
  );
}
