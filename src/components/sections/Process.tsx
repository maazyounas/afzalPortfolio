"use client";

import { motion } from "@/lib/motion";
import { SectionWrapper } from "../ui/SectionWrapper";

const steps = [
  "Diagnose reporting gaps, control risks, and decision bottlenecks.",
  "Design a finance operating model with clear ownership and milestones.",
  "Implement tools, dashboards, and routines that leadership can sustain.",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Process() {
  return (
    <SectionWrapper
      eyebrow="Process"
      title="A simple delivery rhythm that keeps momentum high."
      intro="We prefer small, high-trust systems over bloated transformation programs."
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step}
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="group relative rounded-4xl border border-(--color-line) bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
                Step {index + 1}
              </p>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-line) bg-(--color-sand) text-xs font-bold text-(--color-ink) transition-colors group-hover:border-(--color-accent-light) group-hover:text-(--color-accent)">
                {index + 1}
              </span>
            </div>

            {/* Step Content */}
            <p className="mt-5 text-(--color-muted) leading-relaxed">
              {step}
            </p>

            {/* Accent line on hover */}
            <div className="mt-6 h-0.5 w-0 bg-(--color-accent) transition-all duration-300 group-hover:w-16" />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
