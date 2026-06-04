import Link from "next/link";
import type { ReactNode } from "react";

type InfoPageShellProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function InfoPageShell({ eyebrow, title, intro, children }: InfoPageShellProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-(--color-accent-light)/10 via-white to-white">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-accent)"
          >
            Back to Home
          </Link>

          {eyebrow && (
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-(--color-accent)">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-(family-name:--font-display) text-3xl font-bold tracking-tight text-(--color-ink) sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-(--color-muted) sm:text-lg sm:leading-8">
            {intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </section>
    </main>
  );
}
