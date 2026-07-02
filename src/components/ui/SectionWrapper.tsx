"use client";

import type { ReactNode } from "react";
import { motion } from "@/lib/motion";

type SectionWrapperProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  id?: string;
  centered?: boolean;
  isMainHeader?: boolean;
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
  isMainHeader = false,
}: SectionWrapperProps) {
  const slug = (s = "") =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const sectionId = id ?? slug(eyebrow ?? title);

  const TitleComponent = isMainHeader ? "h1" : "h2";

  return (
    <motion.section
      id={sectionId}
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={headerVariants} className="mb-8 max-w-3xl sm:mb-10">
        {" "}
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
            {eyebrow}
          </p>
        ) : null}
        <TitleComponent className="mt-3 font-(family-name:--font-display) text-2xl font-bold leading-tight text-(--color-ink) sm:text-4xl lg:text-5xl">
          {title}
        </TitleComponent>
        {intro ? (
          <p className="mt-4 max-w-2xl text-sm leading-7 text-(--color-muted) sm:text-lg sm:leading-8">
            {intro}
          </p>
        ) : null}
      </motion.div>
      {children}
    </motion.section>
  );
}
