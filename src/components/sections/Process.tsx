"use client";

import {
  
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";

import { motion } from "@/lib/motion";
import { SectionWrapper } from "../ui/SectionWrapper";

const steps = [
  {
    title: "Discovery & Analysis",
    description:
      "We identify reporting gaps, operational friction, and financial blind spots affecting leadership decisions.",
    icon: BarChart3,
  },
  {
    title: "Strategy & Architecture",
    description:
      "We design scalable finance systems, workflows, and governance structures with clear milestones.",
    icon: LayoutDashboard,
  },
  {
    title: "Implementation & Growth",
    description:
      "We deploy practical tools, dashboards, and reporting processes your teams can sustain long-term.",
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
    y: 28,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Process() {
  return (
    <SectionWrapper
      eyebrow="Process"
      title="A delivery system designed for clarity, speed, and momentum."
      intro="We focus on lean execution, transparent collaboration, and measurable outcomes instead of bloated transformation programs."
      centered
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.title}
              variants={item}
              whileHover={{
                y: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
              className="
                group relative overflow-hidden rounded-[2rem]
                border border-[var(--color-line)]
                bg-white/85
                p-7 shadow-sm
                backdrop-blur-xl
                transition-all duration-300
                hover:border-[var(--color-accent-light)]
                hover:shadow-2xl
              "
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top */}
              <div className="relative z-10 flex items-start justify-between">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent-light)] to-white shadow-sm">
                  <Icon className="h-6 w-6 text-[var(--color-accent-strong)]" />
                </div>

                {/* Step Number */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-sand)] text-sm font-bold text-[var(--color-ink)] transition-all duration-300 group-hover:border-[var(--color-accent-light)] group-hover:text-[var(--color-accent)]">
                  0{index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Step {index + 1}
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                  {step.title}
                </h3>

                <p className="mt-4 text-[15px] leading-8 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}