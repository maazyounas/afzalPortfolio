"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import type { IService } from "@/models/Service";
import { ServiceIcon } from "@/lib/utils/icons";
import { richTextToHtml } from "@/lib/utils/richText";

interface ServiceDetailClientProps {
  service: IService;
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const hasCustomContent = Boolean(service.content?.trim());
  const contentHtml = richTextToHtml(hasCustomContent ? service.content || "" : service.description);

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
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-(--color-accent-light)/10 via-white to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Back Button */}
          <Link
            href="/services"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-accent)"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>

          {/* Title and Actions */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4 rounded-3xl bg-white/90 px-4 py-3 shadow-sm ring-1 ring-(--color-line)">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) text-white">
                    <ServiceIcon name={service.icon} className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-(--color-accent)">
                      Service Detail
                    </div>
                    <h1 className="text-2xl font-bold text-(--color-ink) sm:text-3xl">
                      {service.name}
                    </h1>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-(--color-muted) lg:text-xl">
                {service.description}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-3"
            >
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="group flex items-center gap-2 rounded-xl border border-(--color-line) bg-white px-4 py-2 text-sm font-medium text-(--color-ink) transition-all hover:border-(--color-accent-light) hover:shadow-md"
              >
                <Bookmark
                  className={`h-4 w-4 transition-all ${
                    isBookmarked ? "fill-(--color-accent) text-(--color-accent)" : ""
                  }`}
                />
                {isBookmarked ? "Saved" : "Save"}
              </button>
              <button
                onClick={handleShare}
                className="group flex items-center gap-2 rounded-xl border border-(--color-line) bg-white px-4 py-2 text-sm font-medium text-(--color-ink) transition-all hover:border-(--color-accent-light) hover:shadow-md"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            {service.featuredImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={service.featuredImage}
                  alt={service.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            )}

            {/* Content Sections */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Overview Section */}
              <section>
                <h2 className="mb-4 text-2xl font-bold text-(--color-ink)">
                  Overview
                </h2>
                <div
                  className="prose prose-lg max-w-none text-(--color-muted)"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
                {!hasCustomContent && (
                  <div className="prose prose-lg mt-4 max-w-none text-(--color-muted)">
                    <p>
                      Our comprehensive {service.name} solutions are designed to help
                      businesses achieve financial excellence through innovative
                      strategies and cutting-edge technology.
                    </p>
                  </div>
                )}
              </section>

              {/* Key Features */}
              <section>
                <h2 className="mb-4 text-2xl font-bold text-(--color-ink)">
                  Key Features
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Expert Consultation",
                    "Real-time Analytics",
                    "24/7 Support",
                    "Custom Solutions",
                    "Secure Platform",
                    "Scalable Infrastructure",
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="flex items-center gap-3 rounded-xl border border-(--color-line) bg-white p-3"
                    >
                      <CheckCircle className="h-5 w-5 text-(--color-accent)" />
                      <span className="text-sm font-medium text-(--color-ink)">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Benefits Section */}
              <section>
                <h2 className="mb-4 text-2xl font-bold text-(--color-ink)">
                  Why Choose This Service?
                </h2>
                <div className="space-y-4">
                  {[
                    "Industry-leading expertise and proven methodologies",
                    "Tailored solutions that scale with your business",
                    "Transparent pricing with no hidden costs",
                    "Dedicated account manager and priority support",
                  ].map((benefit, idx) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-gray-50"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 text-(--color-accent)" />
                      <span className="text-(--color-muted)">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {/* Info Card */}
              <div className="rounded-2xl border border-(--color-line) bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-(--color-ink)">
                  Service Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-(--color-accent)" />
                    <span className="text-(--color-muted)">Delivery: 2-4 weeks</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-(--color-accent)" />
                    <span className="text-(--color-muted)">Support: 24/7</span>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="rounded-2xl bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) p-6 text-white shadow-lg">
                <h3 className="mb-2 text-xl font-bold">Ready to get started?</h3>
                <p className="mb-4 text-sm opacity-90">
                  Contact our team to discuss how we can help your business grow.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-(--color-accent) transition-all hover:gap-3 hover:bg-gray-50"
                >
                  Contact Us
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Related Services */}
              <div className="rounded-2xl border border-(--color-line) bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-(--color-ink)">
                  Related Services
                </h3>
                <div className="space-y-3">
                  {["Financial Advisory", "Tax Planning", "Audit Services"].map(
                    (service) => (
                      <Link
                        key={service}
                        href="#"
                        className="group flex items-center justify-between rounded-lg p-2 transition-all hover:bg-gray-50"
                      >
                        <span className="text-sm text-(--color-muted) group-hover:text-(--color-accent)">
                          {service}
                        </span>
                        <ChevronRight className="h-3 w-3 text-(--color-muted) transition-transform group-hover:translate-x-1" />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}
