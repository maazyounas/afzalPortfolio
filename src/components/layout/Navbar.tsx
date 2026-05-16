"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "@/lib/motion";

import { navigation } from "@/lib/data/navigation";

import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const sectionIds = useMemo(
    () => navigation.map((item) => item.href.replace(/^\//, "")),
    []
  );

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find(
          (entry) => entry.isIntersecting
        );

        if (visibleSection?.target?.id) {
          setActive(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 20);
      setShowCTA(scrollY > 320);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (window.location.pathname !== "/") return;

    const section = document.getElementById(id);

    if (!section) return;

    e.preventDefault();

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-(--color-line) bg-[rgba(255,255,255,0.82)] shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-accent) text-lg font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-105">
              S
            </div>

            <div className="flex flex-col">
              <span className="font-(family-name:--font-display) text-xl font-bold tracking-tight text-(--color-ink)">
                Softech Financials
              </span>

              <span className="text-xs font-medium tracking-[0.2em] text-(--color-muted) uppercase">
                Finance & Consulting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 rounded-full border border-(--color-line) bg-white/70 px-3 py-2 shadow-sm backdrop-blur-lg md:flex">
            {navigation.map((item) => {
              const id = item.href.replace(/^\//, "");
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

          {/* CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl bg-(--color-accent) px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-accent-strong) hover:shadow-xl"
            >
              Get Started

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Floating CTA */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed right-5 bottom-5 z-60"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-(--color-accent) px-5 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-(--color-accent-strong)"
            >
              Get Started

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
