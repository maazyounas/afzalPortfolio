"use client";

import { motion } from "framer-motion";

export function FloatingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}
