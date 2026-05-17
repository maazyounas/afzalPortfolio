"use client";

import type { ReactNode } from "react";
import { motion } from "@/lib/motion";

type FloatingCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FloatingCard({
  children,
  className = "",
  delay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.96,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group relative overflow-hidden rounded-[1.8rem]
        border border-[var(--color-line)]
        bg-white/85
        p-5
        shadow-lg
        backdrop-blur-xl
        transition-all duration-300
        hover:border-[var(--color-accent-light)]
        hover:shadow-2xl
        ${className}
      `}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-emerald-300 to-transparent opacity-70" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}