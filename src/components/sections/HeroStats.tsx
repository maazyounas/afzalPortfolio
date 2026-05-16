"use client";

import { StatCard } from "@/components/ui/StatCard";
import { motion } from "@/lib/motion";

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl border border-(--color-line) bg-white/80 p-7 shadow-xl backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
          Live Snapshot
        </p>

        <span className="h-2 w-2 animate-pulse rounded-full bg-(--color-accent)" />
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard value={30} label="Faster closes" />
        <StatCard value={100} label="Automation coverage" />
        <StatCard value="24/7" label="Operational visibility" />
        <StatCard value={1} label="Unified system" />
      </div>
    </motion.div>
  );
}
