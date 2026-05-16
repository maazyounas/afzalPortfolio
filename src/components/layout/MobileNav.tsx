"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { navigation } from "@/lib/data/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white p-2 text-[var(--color-ink)] shadow-sm"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30"
            />

            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-4 top-16 z-50 w-[86vw] max-w-xs rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-[var(--color-ink)]"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-2 border-t border-[var(--color-line)] pt-4">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg bg-[var(--color-accent)] px-4 py-2 text-center text-sm font-semibold text-white shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
