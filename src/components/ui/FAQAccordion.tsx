"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "@/lib/motion";

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
      <div className="grid gap-3">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={it.q}
              layout
              className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"
              initial={false}
            >
              <button
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <div className="text-sm font-medium text-[var(--color-ink)]">
                  {it.q}
                </div>

                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.32 }}
                className="mt-3 text-sm text-[var(--color-muted)]"
              >
                <div className="pb-2">{it.a}</div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
