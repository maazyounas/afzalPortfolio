import type { ReactNode } from "react";

type SectionWrapperProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function SectionWrapper({
  eyebrow,
  title,
  intro,
  children,
}: SectionWrapperProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mb-10 max-w-3xl">
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
      </div>
      {children}
    </section>
  );
}
