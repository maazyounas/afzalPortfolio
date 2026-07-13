import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getBlogPostBySlug } from "@/actions/blogs";
import { richTextToHtml } from "@/lib/utils/richText";
import JsonLd from "@/components/JsonLd";

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
  const contentHtml = richTextToHtml(post.content);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.featuredImage || "https://yourdomain.com/default-blog.png",
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author || "Softtech Financials",
    },
    publisher: {
      "@type": "Organization",
      name: "Softtech Financials",
      logo: {
        "@type": "ImageObject",
        url: "https://yourdomain.com/logo.png",
      },
    },
    description: post.excerpt,
  };

  return (
    <SectionWrapper eyebrow={post.category} title={post.title} intro={post.excerpt}>
      <JsonLd data={jsonLdData} />
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_60px_rgba(17,33,31,0.08)]">
        {post.featuredImage && (
          <div className="relative mb-8 overflow-hidden rounded-[1.75rem]">
            <div className="relative aspect-[16/9] w-full">
              <Image src={post.featuredImage} alt={post.title} fill sizes="100vw" className="object-cover" priority />
            </div>
          </div>
        )}

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
        <div
          className="prose prose-zinc mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </SectionWrapper>
  );
}

