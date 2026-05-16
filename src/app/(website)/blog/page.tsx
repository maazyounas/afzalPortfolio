import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on finance operations, advisory strategy, tax planning, and reporting systems.",
};

export default function BlogPage() {
  return (
    <SectionWrapper
      eyebrow="Insights"
      title="Practical writing for finance leaders and founders."
      intro="A content lane built for search visibility and for answering the questions clients ask before they buy."
    >
      <Breadcrumb items={[{ label: "Blog", href: "/blog" }]} />
      <div className="grid gap-6">
        {siteConfig.blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_60px_rgba(17,33,31,0.08)]"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {post.category}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
              {post.title}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-6 inline-flex text-sm font-semibold text-[var(--color-accent)]"
            >
              Read article
            </Link>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
