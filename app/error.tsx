"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4 px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Something went wrong
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
        We hit an unexpected issue.
      </h1>
      <p className="max-w-xl text-[var(--color-muted)]">{error.message}</p>
      <button
        className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
