import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on finance operations, advisory strategy, tax planning, and reporting systems.",
};

export default function BlogPage() {
  return (
    <SectionWrapper
      eyebrow="Insights"
      title="Practical writing for finance leaders and founders."
      intro="A content hub designed to answer real operational questions before they become problems."
    >
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }]} />
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {siteConfig.blogPosts.map((post) => (
          <article
            key={post.slug}
            className="
              group relative flex h-full flex-col
              rounded-[2rem]
              border border-[var(--color-line)]
              bg-white p-6 sm:p-8
              shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              hover:border-[var(--color-accent-light)]
            "
          >
            {/* Category */}
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <span>{post.category}</span>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-xl font-semibold leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent-strong)]">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-muted)]">
              {post.excerpt}
            </p>

            {/* CTA */}
            <Link
              href={`/blog/${post.slug}`}
              className="
                mt-6 inline-flex items-center gap-2 text-sm font-semibold
                text-[var(--color-accent)]
                transition-colors
                group-hover:text-[var(--color-accent-strong)]
              "
            >
              Read article
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}