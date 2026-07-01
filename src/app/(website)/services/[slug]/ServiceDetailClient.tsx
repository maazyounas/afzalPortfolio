"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { motion } from "@/lib/motion";
import type { IService } from "@/models/Service";
import { richTextToHtml } from "@/lib/utils/richText";

interface ServiceDetailClientProps {
  service: IService;
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const contentHtml = richTextToHtml(service.content || service.description);
  const publishedOrUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(service.updatedAt || service.createdAt));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-4xl border border-(--color-line) bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)] sm:p-8"
      >
        {service.featuredImage && (
          <div className="mb-8 overflow-hidden rounded-3xl">
            <div className="relative aspect-video w-full">
              <Image
                src={service.featuredImage}
                alt={service.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
          <span className="rounded-full bg-(--color-panel) px-3 py-1 text-(--color-accent)">
            Service Detail
          </span>
          <span className="text-(--color-muted)">Updated {publishedOrUpdated}</span>
        </div>

        <div
          className="prose prose-zinc mt-6 max-w-none prose-headings:text-(--color-ink) prose-p:text-(--color-muted) prose-a:text-(--color-accent)"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-(--color-line) pt-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-(--color-accent) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Request This Service
          </Link>
        </div>
      </motion.article>

      <aside className="space-y-6">
        <div className="rounded-[1.75rem] border border-(--color-line) bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-(--color-ink)">Service Info</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-(--color-muted)">Slug</dt>
              <dd className="font-medium text-(--color-ink)">{service.slug}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-(--color-muted)">Status</dt>
              <dd className="inline-flex items-center gap-1.5 font-medium text-(--color-ink)">
                <CheckCircle2
                  className={`h-4 w-4 ${
                    service.isActive ? "text-emerald-500" : "text-amber-500"
                  }`}
                />
                {service.isActive ? "Active" : "Inactive"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-(--color-muted)">Updated</dt>
              <dd className="font-medium text-(--color-ink)">{publishedOrUpdated}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
