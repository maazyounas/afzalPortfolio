import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getBlogPosts } from "@/actions/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on finance operations, advisory strategy, tax planning, and reporting systems.",
};

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  const posts = allPosts.filter((p: { isPublished?: boolean }) => p.isPublished !== false);

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
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post: { slug: string; title: string; excerpt: string; category: string; publishedAt?: string; createdAt?: string; featuredImage?: string }) => {
            const dateStr = formatDate(post.publishedAt || post.createdAt);
            return (
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
                {post.featuredImage && (
                  <div className="relative z-10 mb-5 overflow-hidden rounded-[1.5rem]">
                    <div className="relative aspect-[16/10] w-full">
                      <Image src={post.featuredImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    </div>
                  </div>
                )}

                {/* Glow */}
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Meta */}
                <div className="relative z-10 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
                  <span className="rounded-full bg-[var(--color-panel)] px-3 py-1 text-[var(--color-accent)]">
                    {post.category}
                  </span>
                  {dateStr && (
                    <span className="inline-flex items-center gap-1 text-[var(--color-muted)]">
                      <Calendar className="h-3.5 w-3.5" />
                      {dateStr}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="relative z-10 mt-4 text-xl font-semibold leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent-strong)]">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="relative z-10 mt-3 flex-1 text-sm leading-7 text-[var(--color-muted)]">
                  {post.excerpt}
                </p>

                {/* CTA */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="
                    relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-semibold
                    text-[var(--color-accent)]
                    transition-all duration-300
                    group-hover:text-[var(--color-accent-strong)]
                  "
                >
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-[2rem] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--color-line)] bg-white/60 p-16 text-center">
          <div className="text-lg font-semibold text-[var(--color-ink)]">No articles yet</div>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            New insights will be published soon. Stay tuned.
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
