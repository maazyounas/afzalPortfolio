"use client";

import { CheckCircle2, ShieldCheck, LineChart } from "lucide-react";
import { motion } from "@/lib/motion";
import { SectionWrapper } from "../ui/SectionWrapper";

const items = [
  {
    title: "Board-ready reporting frameworks",
    description:
      "Clear, structured reporting systems designed for executive and board-level decision-making.",
    icon: LineChart,
  },
  {
    title: "Audit-conscious workflows & controls",
    description:
      "Built-in compliance, traceability, and financial control systems that reduce operational risk.",
    icon: ShieldCheck,
  },
  {
    title: "Leadership decision support",
    description:
      "Forecasting models and insights that help leadership act with confidence and speed.",
    icon: CheckCircle2,
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function About() {
  return (
    <SectionWrapper
      id="about"
      eyebrow="Why Softech"
      title="A partner that turns financial complexity into operating confidence."
      intro="We combine strategy with implementation so teams leave with better systems, not just slide decks."
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="
          grid gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {items.map((itemData) => {
          const Icon = itemData.icon;

          return (
            <motion.div
              key={itemData.title}
              variants={item}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 18,
              }}
              className="
                group relative overflow-hidden
                rounded-[2rem]
                border border-[var(--color-line)]
                bg-white/80
                p-6 shadow-sm
                backdrop-blur-xl
                transition-all duration-300
                hover:border-[var(--color-accent-light)]
                hover:shadow-xl
              "
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent-light)] to-white shadow-sm">
                <Icon className="h-5 w-5 text-[var(--color-accent-strong)]" />
              </div>

              {/* Content */}
              <h3 className="relative z-10 mt-5 text-lg font-semibold text-[var(--color-ink)]">
                {itemData.title}
              </h3>

              <p className="relative z-10 mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {itemData.description}
              </p>

              {/* Accent line */}
              <div className="relative z-10 mt-6 h-0.5 w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-16" />
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}