import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

import { SectionWrapper } from "../ui/SectionWrapper";
import MobileScroller from "@/components/ui/MobileScroller";

type BlogPreviewPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt?: string | Date | null;
  featuredImage?: string;
};

interface BlogPreviewProps {
  posts: BlogPreviewPost[];
}

function formatPublishedAt(value?: string | Date | null) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <SectionWrapper
      id="blog"
      eyebrow="Insights"
      title="Useful finance writing for founders and leadership teams."
      intro="A quick view of recent thinking across operations, reporting, and growth-stage finance."
    >
      <div className="hidden sm:block">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.length > 0 ? (
            posts.map((post) => {
              const publishedAt = formatPublishedAt(post.publishedAt);

              return (
                <article
                  key={post.slug}
                  className="
                    group relative flex h-full flex-col
                    overflow-hidden rounded-[2rem]
                    border border-[var(--color-line)]
                    bg-white/85 p-6
                    shadow-sm backdrop-blur-xl
                    transition-all duration-300
                    hover:border-[var(--color-accent-light)]
                    hover:shadow-2xl
                  "
                >
                  {post.featuredImage && (
                    <div className="relative z-10 overflow-hidden rounded-[1.5rem]">
                      <div className="relative aspect-[16/10] w-full">
                        <Image src={post.featuredImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
                    <span className="rounded-full bg-[var(--color-panel)] px-3 py-1 text-[var(--color-accent)]">
                      {post.category}
                    </span>

                    {publishedAt && (
                      <span className="inline-flex items-center gap-1 text-[var(--color-muted)]">
                        <Calendar className="h-3.5 w-3.5" />
                        {publishedAt}
                      </span>
                    )}
                  </div>

                  <h3 className="relative z-10 mt-5 text-xl font-semibold leading-snug text-[var(--color-ink)]">
                    {post.title}
                  </h3>

                  <p className="relative z-10 mt-3 flex-1 text-sm leading-7 text-[var(--color-muted)]">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="
                      relative z-10 mt-6 inline-flex items-center gap-2
                      text-sm font-semibold text-[var(--color-accent)]
                      transition-all duration-300
                      group-hover:text-[var(--color-accent-strong)]
                    "
                  >
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
                </article>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-[var(--color-line)] bg-white/60 p-10 text-center text-sm text-[var(--color-muted)]">
              <div className="text-lg font-semibold text-[var(--color-ink)]">
                No articles yet
              </div>
              <p className="mt-1">
                New insights will be published soon. Stay tuned.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="sm:hidden">
        {posts?.length > 0 ? (
          <MobileScroller itemClassName="w-[85%] flex-shrink-0">
            {posts.map((post) => (
              <article key={post.slug} className="relative rounded-2xl border border-[var(--color-line)] bg-white/85 p-5 shadow-sm">
                {post.featuredImage && (
                  <div className="mb-4 overflow-hidden rounded-xl">
                    <div className="relative aspect-[16/10] w-full">
                      <Image src={post.featuredImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    </div>
                  </div>
                )}
                <div className="text-xs font-semibold uppercase text-[var(--color-muted)]">{post.category}</div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--color-ink)]">{post.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] line-clamp-3">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[var(--color-accent)]">Read article <ArrowRight className="h-4 w-4"/></Link>
              </article>
            ))}
          </MobileScroller>
        ) : (
          <div className="rounded-2xl border border-[var(--color-line)] bg-white/60 p-6 text-center">
            <div className="text-lg font-semibold text-[var(--color-ink)]">No articles yet</div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
