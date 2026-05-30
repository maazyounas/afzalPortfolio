"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBlogPost, updateBlogPost } from "@/actions/blogs";

type BlogFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string;
  isPublished: boolean;
};

type BlogInitialData = Partial<BlogFormData> & {
  _id?: string;
};

interface BlogFormProps {
  initialData?: BlogInitialData;
}

export function BlogForm({ initialData }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const router = useRouter();
  const isEdit = !!initialData?._id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      category: initialData?.category || "",
      author: initialData?.author || "",
      featuredImage: initialData?.featuredImage || "",
      isPublished: initialData?.isPublished ?? false,
    },
  });

  const title = watch("title");

  function generateSlug() {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setValue("slug", slug);
  }

  async function onSubmit(data: BlogFormData) {
    setLoading(true);
    setMessage(null);

    const payload = {
      ...data,
      publishedAt: data.isPublished ? new Date() : undefined,
    };

    let result;

    if (isEdit) {
      result = await updateBlogPost(initialData!._id!, payload);
    } else {
      result = await createBlogPost(payload);
    }

    if (result.success) {
      setMessage({ text: isEdit ? "Post updated!" : "Post created!", type: "success" });
      router.push("/admin/blogs");
      router.refresh();
    } else {
      setMessage({ text: result.error || "Something went wrong", type: "error" });
      setLoading(false);
    }
  }

  const inputClasses =
    "w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500 transition-all";
  const labelClasses = "block text-sm font-medium text-neutral-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {message && (
        <div
          className={`rounded-xl p-4 text-sm ${
            message.type === "success"
              ? "border border-green-500/20 bg-green-500/10 text-green-400"
              : "border border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Post Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className={inputClasses}
            placeholder="e.g. 5 Tax Planning Strategies for Startups"
          />
          {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>URL Slug</label>
          <div className="flex gap-2">
            <input
              {...register("slug", { required: "Slug is required" })}
              className={inputClasses}
              placeholder="5-tax-planning-strategies"
            />
            <button
              type="button"
              onClick={generateSlug}
              className="shrink-0 rounded-xl bg-white/10 px-4 py-3 text-xs font-semibold text-white transition-all hover:bg-white/20"
            >
              Auto
            </button>
          </div>
          {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug.message}</p>}
        </div>
      </div>

      {/* Category & Author */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Category</label>
          <input
            {...register("category", { required: "Category is required" })}
            className={inputClasses}
            placeholder="e.g. Tax Planning, Finance, Advisory"
          />
          {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Author</label>
          <input
            {...register("author", { required: "Author is required" })}
            className={inputClasses}
            placeholder="e.g. John Doe"
          />
          {errors.author && <p className="mt-1 text-xs text-red-400">{errors.author.message}</p>}
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelClasses}>Excerpt (Preview Text)</label>
        <textarea
          {...register("excerpt", { required: "Excerpt is required" })}
          rows={3}
          className={`${inputClasses} resize-none`}
          placeholder="A short summary that appears in blog cards and previews..."
        />
        {errors.excerpt && <p className="mt-1 text-xs text-red-400">{errors.excerpt.message}</p>}
        <p className="mt-1 text-xs text-neutral-500">This appears on the homepage Blog Preview and blog listing page.</p>
      </div>

      {/* Content */}
      <div>
        <label className={labelClasses}>Full Content</label>
        <textarea
          {...register("content", { required: "Content is required" })}
          rows={16}
          className={`${inputClasses} resize-y font-mono text-sm leading-relaxed`}
          placeholder="Write the full blog post content here. Use double-newlines to create separate paragraphs..."
        />
        {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content.message}</p>}
        <p className="mt-1 text-xs text-neutral-500">
          Separate paragraphs with blank lines. Content is displayed on the individual blog post page.
        </p>
      </div>

      {/* Featured Image */}
      <div>
        <label className={labelClasses}>Featured Image URL (Optional)</label>
        <input
          {...register("featuredImage")}
          className={inputClasses}
          placeholder="https://example.com/my-image.jpg"
        />
      </div>

      {/* Publish Toggle */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
        <input
          type="checkbox"
          id="isPublished"
          {...register("isPublished")}
          className="h-4 w-4 rounded border-white/20 bg-white/10 accent-blue-500"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-neutral-300">
          Publish this post (visible on the website)
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl px-6 py-3 text-sm font-medium text-neutral-400 transition-all hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
