"use client";

import { 
  CheckCircle2, 
  ShieldCheck, 
  LineChart, 
 
} from "lucide-react";
import { motion, useInView } from "@/lib/motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useRef } from "react";
import Link from "next/link";

const items = [
  {
    title: "Board-ready reporting frameworks",
    description:
      "Clear, structured reporting systems designed for executive and board-level decision-making with real-time analytics.",
    icon: LineChart,
    gradient: "from-emerald-50 to-cyan-50",
    color: "emerald",
    stat: "45% Faster",
    delay: 0,
  },
  {
    title: "Audit-conscious workflows & controls",
    description:
      "Built-in compliance, traceability, and financial control systems that reduce operational risk by up to 60%.",
    icon: ShieldCheck,
    gradient: "from-blue-50 to-indigo-50",
    color: "blue",
    stat: "99.9% Secure",
    delay: 0.1,
  },
  {
    title: "Leadership decision support",
    description:
      "Forecasting models and insights that help leadership act with confidence and speed using predictive analytics.",
    icon: CheckCircle2,
    gradient: "from-purple-50 to-pink-50",
    color: "purple",
    stat: "Real-time",
    delay: 0.2,
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
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function About() {
  const statsRef = useRef(null);

  return (
    <SectionWrapper
      id="about"
      eyebrow="Why Softech"
      title="A partner that turns financial complexity into operating confidence."
      intro="We combine strategy with implementation so teams leave with better systems, not just slide decks."
    >
      {/* Main Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="
          grid gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          mb-16
        "
      >
        {items.map((itemData) => {
          const Icon = itemData.icon;

          return (
            <motion.div
              key={itemData.title}
              variants={item}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-(--color-line)
                bg-white/90
                p-6 shadow-md
                backdrop-blur-sm
                transition-all duration-300
                hover:border-(--color-accent-light)
                hover:shadow-2xl
              "
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-(--color-accent-light)/0 via-transparent to-(--color-accent)/0 opacity-0 transition-all duration-500 group-hover:from-(--color-accent-light)/10 group-hover:to-(--color-accent)/5 group-hover:opacity-100" />

              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-(--color-accent-light) to-(--color-accent) opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

              {/* Icon with gradient background */}
              <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${itemData.gradient} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="h-6 w-6 text-(--color-accent-strong)" />
              </div>

              {/* Stat Badge */}
              {itemData.stat && (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-(--color-accent) shadow-sm backdrop-blur-sm">
                  {itemData.stat}
                </div>
              )}

              {/* Content */}
              <h3 className="relative z-10 mt-5 text-lg font-semibold text-(--color-ink) group-hover:text-(--color-accent) transition-colors">
                {itemData.title}
              </h3>

              <p className="relative z-10 mt-3 text-sm leading-relaxed text-(--color-muted)">
                {itemData.description}
              </p>

              {/* Animated accent line */}
              <div className="relative z-10 mt-6 h-0.5 w-8 rounded-full bg-(--color-accent-light) transition-all duration-300 group-hover:w-16" />
            </motion.div>
          );
        })}
      </motion.div>

      

     

     
    </SectionWrapper>
  );
}