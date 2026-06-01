"use client";

import {
  BarChart3,
  ShieldCheck,
  Clock3,
  Layers3,
  TrendingUp,
  Zap,
  Target,
  Rocket,
} from "lucide-react";

import { motion } from "@/lib/motion";

const stats = [
  {
    value: "45%",
    label: "Efficiency Gain",
    description: "Automated workflows reduce manual tasks significantly.",
    icon: TrendingUp,
    trend: "+12%",
  },
  {
    value: "99.9%",
    label: "Accuracy Rate",
    description: "AI-powered insights eliminate human errors.",
    icon: Target,
    trend: "Certified",
  },
  {
    value: "Real-time",
    label: "Instant Sync",
    description: "Live data updates across all your devices.",
    icon: Zap,
    trend: "24/7",
  },
  {
    value: "3x",
    label: "Faster Growth",
    description: "Accelerate decisions with predictive analytics.",
    icon: Rocket,
    trend: "Scale",
  },
];

export function HeroStats() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.97,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative overflow-hidden rounded-4xl
        border border-(--color-line)
        bg-white/85
        p-5 shadow-2xl sm:p-7
        backdrop-blur-xl
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.10),transparent_35%)]" />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--color-accent)">
            Performance Overview
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-700">
            Live
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
              }}
              whileHover={{ y: -3 }}
              className="
                group rounded-3xl
                border border-(--color-line)
                bg-white/90
                p-4 sm:p-5
                shadow-sm
                transition-all duration-300
                hover:border-(--color-accent-light)
                hover:shadow-lg
              "
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-(--color-accent-light) to-white">
                  <Icon className="h-5 w-5 text-(--color-accent-strong)" />
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold tracking-tight text-(--color-ink)">
                    {stat.value}
                  </div>
                  {stat.trend && (
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-(--color-accent)">
                      {stat.trend}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-(--color-ink)">
                  {stat.label}
                </h4>

                <p className="mt-1 text-sm leading-6 text-(--color-muted)">
                  {stat.description}
                </p>
              </div>

              {/* Accent Line */}
              <div className="mt-4 h-0.5 w-0 bg-(--color-accent) transition-all duration-300 group-hover:w-12" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}