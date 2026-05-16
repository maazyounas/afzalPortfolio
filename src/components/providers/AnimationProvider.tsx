"use client";

import type { ReactNode } from "react";
import { motion } from "@/lib/motion";

type AnimationProviderProps = {
  children: ReactNode;
};

export function AnimationProvider({ children }: AnimationProviderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // smooth ease-out (better than default)
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
