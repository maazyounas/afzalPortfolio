"use client";

import Link from "next/link";
import { useState } from "react";

import { navigation } from "@/lib/data/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-ink)]"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      {open ? (
        <div className="absolute right-0 top-14 min-w-48 rounded-3xl border border-[var(--color-line)] bg-white p-4 shadow-[0_18px_60px_rgba(17,33,31,0.08)]">
          <div className="grid gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-muted)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
