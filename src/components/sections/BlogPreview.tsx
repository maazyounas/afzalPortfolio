import Link from "next/link";

import { SectionWrapper } from "../ui/SectionWrapper";

type BlogPreviewPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt?: string | Date | null;
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
      <div className="grid gap-6 lg:grid-cols-3">
        {posts.map((post) => {
          const publishedAt = formatPublishedAt(post.publishedAt);

          return (
            <article
              key={post.slug}
              className="flex h-full flex-col rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                <span>{post.category}</span>
                {publishedAt ? (
                  <span className="text-[var(--color-muted)]">
                    {publishedAt}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-[var(--color-ink)]">
                {post.title}
              </h3>

              <p className="mt-3 flex-1 text-[var(--color-muted)]">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex text-sm font-semibold text-[var(--color-accent)] transition-colors duration-300 hover:text-[var(--color-accent-strong)]"
              >
                Read article
              </Link>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
