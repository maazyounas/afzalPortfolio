import React from "react";

export function TrustLogos({ className = "" }: { className?: string }) {
  const logos = ["ACME", "NORTH", "HARB", "ZENCO"];

  return (
    <div
      className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}
    >
      {logos.map((l) => (
        <div
          key={l}
          className="
            group relative flex h-11 w-28 items-center justify-center
            overflow-hidden rounded-xl
            border border-[var(--color-line)]
            bg-white
            text-sm font-medium text-[var(--color-muted)]
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-md
            hover:border-[var(--color-accent-light)]
          "
        >
          {/* subtle shimmer on hover */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.08),_transparent_60%)]" />

          <span className="relative tracking-wide group-hover:text-[var(--color-ink)] transition-colors">
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}