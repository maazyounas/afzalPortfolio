"use client";

import type { ReactNode, FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type MotionSectionProps = HTMLMotionProps<"section"> & { children?: ReactNode };
const MotionSection = motion.section as unknown as FC<MotionSectionProps>;

type SectionWrapperProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  id?: string;
};

const headerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SectionWrapper({
  eyebrow,
  title,
  intro,
  children,
  id,
}: SectionWrapperProps) {
  const slug = (s = "") =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const sectionId = id ?? slug(eyebrow ?? title);
  return (
    <MotionSection
      id={sectionId}
      className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={headerVariants} className="mb-10 max-w-3xl">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">
            {intro}
          </p>
        ) : null}
      </motion.div>
      {children}
    </MotionSection>
  );
}
