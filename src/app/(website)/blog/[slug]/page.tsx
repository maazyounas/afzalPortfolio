import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getBlogPostBySlug } from "@/actions/blogs";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  return post
    ? {
        title: post.title,
        description: post.excerpt,
      }
    : {};
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = formatDate(post.publishedAt || post.createdAt);
  const paragraphs = post.content
    .split(/\n\s*\n/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <SectionWrapper eyebrow={post.category} title={post.title} intro={post.excerpt}>
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_60px_rgba(17,33,31,0.08)]">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {publishedDate && (
            <p className="uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Published {publishedDate}
            </p>
          )}
          {post.author && (
            <p className="text-[var(--color-muted)]">
              by <span className="font-semibold text-[var(--color-ink)]">{post.author}</span>
            </p>
          )}
        </div>
        <div className="prose prose-zinc mt-6 max-w-none">
          {paragraphs.map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </SectionWrapper>
  );
}
