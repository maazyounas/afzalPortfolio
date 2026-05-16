"use client";

import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";

export function HeroStats() {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative -mt-6 rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-lg lg:mt-0"
    >
      <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">Snapshot</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <StatCard value={30} label="Faster closes" />
        <StatCard value={100} label="Customization rate" />
        <StatCard value="24/7" label="Operational visibility" />
        <StatCard value={1} label="Integrated teams" />
      </div>
    </motion.div>
  );
}
