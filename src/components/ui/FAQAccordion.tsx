"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";

type Item = { q: string; a: string };

const items: Item[] = [
  {
    q: "How quickly can we get started?",
    a: "We typically begin with a short diagnostic that runs 1-2 weeks, then propose a scoped plan for implementation within the following 30-90 days depending on priorities.",
  },
  {
    q: "Do you integrate with our accounting software?",
    a: "Yes - we work with common ERP and accounting systems, and we focus on delivering reporting that fits your existing tooling where possible.",
  },
  {
    q: "Can you support audit readiness?",
    a: "We prepare control documentation and evidence packages so teams enter assurance cycles with confidence and minimal last-minute work.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-0">
      <div className="space-y-4">
        {items.map((it, i) => {
          const isOpen = open === i;

          return (
            <motion.div
              key={it.q}
              layout
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`
                relative overflow-hidden rounded-2xl border
                bg-white p-5 sm:p-6
                transition-all duration-300
                ${
                  isOpen
                    ? "border-[var(--color-accent-light)] shadow-lg"
                    : "border-[var(--color-line)] hover:shadow-md"
                }
              `}
            >
              {/* subtle glow when open */}
              {isOpen && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_45%)]" />
              )}

              <button
                className="relative flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <div className="text-sm font-semibold text-[var(--color-ink)] sm:text-base">
                  {it.q}
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] bg-white"
                >
                  <ChevronDown className="h-4 w-4 text-[var(--color-muted)]" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="relative mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-[15px]">
                      {it.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}