import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4 px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        404
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
        The page you requested could not be found.
      </h1>
      <p className="max-w-xl text-[var(--color-muted)]">
        The route may have moved, or it may not exist yet in the new content
        architecture.
      </p>
      <Link
        href="/"
        className="rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold transition hover:bg-white"
      >
        Return home
      </Link>
    </div>
  );
}
