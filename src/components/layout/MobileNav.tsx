"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "@/lib/motion";

import { navigation } from "@/lib/data/navigation";

type MobileNavProps = {
  activeSection?: string;
  onNavigate?: (
    e: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => void;
  siteName?: string;
};

export function MobileNav({
  activeSection = "",
  onNavigate,
  siteName = "Softech Financials",
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-(--color-line) bg-white/80 text-(--color-ink) shadow-sm backdrop-blur-lg transition-all duration-300 hover:border-(--color-accent-light) hover:shadow-lg active:scale-95"
      >
        <span className="absolute inset-0 bg-linear-to-br from-(--color-accent-light) to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={open ? "close" : "menu"}
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col bg-white/95 shadow-[-20px_0_80px_rgba(15,23,42,0.15)] backdrop-blur-2xl sm:w-[400px]"
            >
              <div className="flex items-center justify-between border-b border-(--color-line) px-5 py-5 sm:px-6">
                <div className="min-w-0">
                  <h2 className="font-(family-name:--font-display) text-xl font-bold text-(--color-ink) truncate">
                    {siteName}
                  </h2>

                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-(--color-muted)">
                    Financial Services
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--color-line) bg-white text-(--color-ink) transition-all duration-300 hover:border-(--color-accent-light) hover:bg-(--color-accent-light)"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-6">
                {navigation.map((item, index) => {
                  const id = item.href.split("#")[1] ?? "";
                  const isActive = activeSection === id;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          onNavigate?.(e, id);
                          handleClose();
                        }}
                        className={`group flex items-center justify-between rounded-2xl border px-4 py-4 text-base font-semibold transition-all duration-300 ${
                          isActive
                            ? "border-(--color-accent-light) bg-(--color-accent-light) text-(--color-accent-strong)"
                            : "border-transparent text-(--color-ink) hover:border-(--color-line) hover:bg-white"
                        }`}
                      >
                        <span>{item.label}</span>

                        <ArrowRight
                          className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                            isActive
                              ? "text-(--color-accent)"
                              : "text-(--color-muted) group-hover:text-(--color-accent)"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="border-t border-(--color-line) bg-white p-6">
                <p className="text-center text-sm leading-relaxed text-(--color-muted)">
                  Helping businesses grow with modern financial solutions.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
