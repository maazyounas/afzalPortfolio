"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "@/lib/motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging (optional integration with Sentry later)
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-105 w-105 -translate-x-1/2 rounded-full bg-red-100 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-75 w-75 rounded-full bg-(--color-accent-light) opacity-30 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl text-center"
      >
        {/* Badge */}
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
          <AlertTriangle className="h-3.5 w-3.5" />
          Error Occurred
        </div>

        {/* Heading */}
        <h1 className="font-(family-name:--font-display) text-4xl leading-tight text-(--color-ink) sm:text-5xl">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-(--color-muted)">
          An unexpected error occurred while processing your request. You can
          try again or return to a safe page.
        </p>

        {/* Error details (safe fallback) */}
        <div className="mt-6 rounded-2xl border border-(--color-line) bg-white/70 p-4 text-left text-xs text-red-500 backdrop-blur-md">
          {error?.message || "Unknown error"}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="group inline-flex items-center gap-2 rounded-2xl bg-(--color-accent) px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-accent-strong) hover:shadow-xl"
          >
            <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            Try Again
          </button>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-2xl border border-(--color-line) bg-white px-6 py-3 text-sm font-semibold text-(--color-ink) shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-accent-light) hover:shadow-md"
          >
            <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Go Home
          </Link>
        </div>

        {/* Hint */}
        <p className="mt-8 text-xs text-(--color-muted)">
          If this keeps happening, please refresh the page or contact support.
        </p>
      </motion.div>
    </div>
  );
}
