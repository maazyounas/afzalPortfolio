"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "@/lib/motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-100 w-100 -translate-x-1/2 rounded-full bg-(--color-accent-light) opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-75 w-75 rounded-full bg-cyan-100 opacity-40 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl text-center"
      >
        <p className="mx-auto mb-4 inline-flex items-center rounded-full border border-(--color-line) bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent) backdrop-blur-md">
          Error 404
        </p>

        <h1 className="font-(family-name:--font-display) text-4xl leading-tight text-(--color-ink) sm:text-5xl">
          We couldn&apos;t find that page
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-(--color-muted)">
          The page you&apos;re looking for may have been moved, renamed, or
          doesn&apos;t exist anymore. Try going back or return to the homepage.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-2xl bg-(--color-accent) px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-accent-strong) hover:shadow-xl"
          >
            <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Go Home
          </Link>

          <button
            onClick={() => history.back()}
            className="group inline-flex items-center gap-2 rounded-2xl border border-(--color-line) bg-white px-6 py-3 text-sm font-semibold text-(--color-ink) shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-accent-light) hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>

        <p className="mt-8 text-xs text-(--color-muted)">
          Tip: Check the URL or use navigation to find what you need.
        </p>
      </motion.div>
    </div>
  );
}
