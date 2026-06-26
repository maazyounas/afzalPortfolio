"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bookmark, CheckCircle2, Share2 } from "lucide-react";

import { motion } from "@/lib/motion";
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
      } catch (error) {
        console.log("Error sharing:", error);
      }
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)] sm:p-8"
      >
        {service.featuredImage && (
          <div className="mb-8 overflow-hidden rounded-[1.5rem]">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={service.featuredImage}
                alt={service.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
          <span className="rounded-full bg-[var(--color-panel)] px-3 py-1 text-[var(--color-accent)]">
            Service Detail
          </span>
          <span className="text-[var(--color-muted)]">Updated {publishedOrUpdated}</span>
        </div>

        <div
          className="prose prose-zinc mt-6 max-w-none prose-headings:text-[var(--color-ink)] prose-p:text-[var(--color-muted)] prose-a:text-[var(--color-accent)]"
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
            className="inline-flex items-center justify-center rounded-xl border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-gray-50"
          >
            View All Services
          </Link>
        </div>
      </motion.article>

      <aside className="space-y-6">
        <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">Actions</h2>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-panel)]">
              <ServiceIcon name={service.icon} className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsBookmarked((current) => !current)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-all hover:border-[var(--color-accent-light)] hover:shadow-md"
            >
              <Bookmark
                className={`h-4 w-4 transition-all ${
                  isBookmarked ? "fill-[var(--color-accent)] text-[var(--color-accent)]" : ""
                }`}
              />
              {isBookmarked ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-all hover:border-[var(--color-accent-light)] hover:shadow-md"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">Service Info</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[var(--color-muted)]">Slug</dt>
              <dd className="font-medium text-[var(--color-ink)]">{service.slug}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[var(--color-muted)]">Order</dt>
              <dd className="font-medium text-[var(--color-ink)]">{service.order}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[var(--color-muted)]">Status</dt>
              <dd className="inline-flex items-center gap-1.5 font-medium text-[var(--color-ink)]">
                <CheckCircle2
                  className={`h-4 w-4 ${
                    service.isActive ? "text-emerald-500" : "text-amber-500"
                  }`}
                />
                {service.isActive ? "Active" : "Inactive"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[var(--color-muted)]">Updated</dt>
              <dd className="font-medium text-[var(--color-ink)]">{publishedOrUpdated}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-[1.75rem] bg-gradient-to-br from-[var(--color-accent-light)] to-[var(--color-accent)] p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold">Need help with this service?</h2>
          <p className="mt-2 text-sm leading-6 opacity-90">
            Reach out and we&apos;ll walk you through the details, process, and next steps.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[var(--color-accent)] transition hover:bg-gray-50"
          >
            Contact Us
          </Link>
          <Link
            href="/services"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
          >
            Browse all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
