import React from "react";

export function TrustLogos({ className = "" }: { className?: string }) {
  const logos = ["ACME", "NORTH", "HARB", "ZENCO"];
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {logos.map((l) => (
        <div key={l} className="h-10 w-24 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white text-sm text-slate-800 flex">
          {l}
        </div>
      ))}
    </div>
  );
}
