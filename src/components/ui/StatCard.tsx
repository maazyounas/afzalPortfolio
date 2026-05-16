"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useInView } from "@/lib/motion";

type StatCardProps = {
  value: number | string;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  const isNumber = typeof value === "number";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as RefObject<Element>, {
    once: true,
    amount: 0.5,
  });
  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    if (!isNumber || !inView) return;
    const start = 0;
    const end = value as number;
    const duration = 1000;
    let rafId: number;
    const startTime = performance.now();

    const loop = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t; // linear OK for subtlety
      setDisplay(Math.floor(eased * (end - start) + start));
      if (t < 1) rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [inView, isNumber, value]);

  return (
    <motion.div ref={ref} className="rounded-xl bg-white p-4 shadow-sm">
      <div className="text-3xl font-bold text-slate-900">
        {isNumber ? display : value}
      </div>
      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </motion.div>
  );
}
