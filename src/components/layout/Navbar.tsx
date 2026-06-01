"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "@/lib/motion";

import { navigation } from "@/lib/data/navigation";

import { MobileNav } from "./MobileNav";
import { siteConfig } from "@/lib/data/site-config";

export function Navbar({ siteName }: { siteName?: string }) {
  const displaySiteName = siteName || siteConfig.name;
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(
    () =>
      navigation
        .map((item) => item.href.split("#")[1] ?? "")
        .filter(Boolean),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const marker = 160;

      setScrolled(scrollY > 20);

      if (pathname !== "/") {
        setActive("");
        return;
      }

      const hero = document.getElementById("hero");
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (hero) {
        const heroRect = hero.getBoundingClientRect();

        if (heroRect.bottom > marker) {
          setActive("");
          return;
        }
      }

      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });

      setActive(currentSection?.id ?? "");
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname, sectionIds]);

  const handleNavigation = (
  e: MouseEvent<HTMLAnchorElement>,
  id: string
) => {
  if (pathname !== "/" || !id) return;

  e.preventDefault();

  setActive(id); // 🔥 THIS is what drives active state

  window.history.replaceState(null, "", `/#${id}`);

  requestAnimationFrame(() => {
    const section = document.getElementById(id);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    e.preventDefault();
    setActive("");
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="h-[4.5rem] sm:h-20 w-full shrink-0" />
      <header className="fixed w-full top-0 z-50">
        {/* Background with blur (separated to prevent containing block bug for fixed MobileNav) */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            scrolled
              ? "bg-[rgba(255,255,255,0.85)] shadow-sm backdrop-blur-xl"
              : "bg-transparent"
          }`}
        />

        <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-(--color-accent) text-lg font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
              S
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="truncate font-(family-name:--font-display) text-base font-bold tracking-tight text-(--color-ink) sm:text-xl">
                {displaySiteName}
              </span>

              <span className="truncate text-[10px] font-medium tracking-[0.18em] text-(--color-muted) uppercase sm:text-xs">
                Finance & Consulting
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-(--color-line) bg-white/70 px-2 py-2 shadow-sm backdrop-blur-lg lg:flex">
            {navigation.map((item) => {
              const id = item.href.split("#")[1] ?? "";
              const isActive = active === id;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-(--color-accent-strong)"
                      : "text-(--color-muted) hover:text-(--color-ink)"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-(--color-accent-light)"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/#contact"
              onClick={(e) => handleNavigation(e, "contact")}
              className="group inline-flex items-center gap-2 rounded-2xl bg-(--color-accent) px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-accent-strong) hover:shadow-xl"
            >
              Get Started

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="lg:hidden">
            <MobileNav activeSection={active} onNavigate={handleNavigation} siteName={displaySiteName} />
          </div>
        </div>
      </header>

    </>
  );
}
