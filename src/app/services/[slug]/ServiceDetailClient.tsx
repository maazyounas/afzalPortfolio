"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { useState } from "react";
import type { IService } from "@/models/Service";
import { ServiceIcon } from "@/lib/utils/icons";
import { richTextToHtml } from "@/lib/utils/richText";

interface ServiceDetailClientProps {
  service: IService;
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const contentHtml = richTextToHtml(service.content || service.description);
  const publishedOrUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(service.updatedAt || service.createdAt));

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.name,
          text: service.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative overflow-hidden bg-gradient-to-br from-(--color-accent-light)/10 via-white to-white">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            href="/services"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-accent)"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-(--color-line) bg-white/90 px-4 py-2 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) text-white">
                  <ServiceIcon name={service.icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-(--color-accent)">
                    Service Detail
                  </p>
                  <p className="text-xs text-(--color-muted)">Updated {publishedOrUpdated}</p>
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-(--color-ink) sm:text-4xl lg:text-5xl">
                {service.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-(--color-muted) lg:text-xl">
                {service.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="flex gap-3"
            >
              <button
                type="button"
                onClick={() => setIsBookmarked((current) => !current)}
                className="group inline-flex items-center gap-2 rounded-xl border border-(--color-line) bg-white px-4 py-2 text-sm font-medium text-(--color-ink) transition-all hover:border-(--color-accent-light) hover:shadow-md"
              >
                <Bookmark
                  className={`h-4 w-4 transition-all ${isBookmarked ? "fill-(--color-accent) text-(--color-accent)" : ""}`}
                />
                {isBookmarked ? "Saved" : "Save"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="group inline-flex items-center gap-2 rounded-xl border border-(--color-line) bg-white px-4 py-2 text-sm font-medium text-(--color-ink) transition-all hover:border-(--color-accent-light) hover:shadow-md"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)] sm:p-8"
          >
            {service.featuredImage && (
              <div className="mb-8 overflow-hidden rounded-[1.5rem]">
                <img
                  src={service.featuredImage}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-zinc max-w-none prose-headings:text-(--color-ink) prose-p:text-(--color-muted)"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--color-line)] pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Request This Service
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-(--color-ink) transition hover:bg-gray-50"
              >
                View All Services
              </Link>
            </div>
          </motion.article>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-(--color-ink)">Service Info</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-(--color-muted)">Slug</dt>
                  <dd className="font-medium text-(--color-ink)">{service.slug}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-(--color-muted)">Order</dt>
                  <dd className="font-medium text-(--color-ink)">{service.order}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-(--color-muted)">Status</dt>
                  <dd className="font-medium text-(--color-ink)">{service.isActive ? "Active" : "Inactive"}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-(--color-muted)">Updated</dt>
                  <dd className="font-medium text-(--color-ink)">{publishedOrUpdated}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[1.75rem] bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) p-6 text-white shadow-lg">
              <h2 className="text-xl font-bold">Need help with this service?</h2>
              <p className="mt-2 text-sm leading-6 opacity-90">
                Reach out and we&apos;ll walk you through the details, process, and next steps.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-(--color-accent) transition hover:bg-gray-50"
              >
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
