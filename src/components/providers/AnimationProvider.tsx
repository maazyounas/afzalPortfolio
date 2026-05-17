"use client";

import type { ReactNode } from "react";

import {
  AnimatePresence,
  motion,
} from "@/lib/motion";

type AnimationProviderProps = {
  children: ReactNode;
};

export function AnimationProvider({
  children,
}: AnimationProviderProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: 14,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: -14,
          filter: "blur(10px)",
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative min-h-screen will-change-transform"
      >
        {/* Global Background Glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-[28rem] w-[28rem] rounded-full bg-[rgba(20,184,166,0.08)] blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full bg-[rgba(59,130,246,0.06)] blur-3xl" />
        </div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
}