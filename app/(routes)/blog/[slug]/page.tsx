import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { siteConfig } from "@/lib/data/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return siteConfig.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = siteConfig.blogPosts.find((item) => item.slug === slug);

  return post
    ? {
        title: post.title,
        description: post.excerpt,
      }
    : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = siteConfig.blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <SectionWrapper eyebrow={post.category} title={post.title} intro={post.excerpt}>
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_60px_rgba(17,33,31,0.08)]">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
          Published {post.publishedAt}
        </p>
        <div className="prose prose-zinc mt-6 max-w-none">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </SectionWrapper>
  );
}
