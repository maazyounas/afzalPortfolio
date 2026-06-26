"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBlogPost, updateBlogPost } from "@/actions/blogs";
import slugify from "@/lib/slugify";
import { ImageUploadField } from "@/features/admin/components/ImageUploadField";
import { RichTextEditor } from "@/features/admin/components/RichTextEditor";
import { CheckCircle, XCircle } from "lucide-react";

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
  const featuredImage = watch("featuredImage");

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
      slug: slugify(data.slug),
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

  return (
    <div className="admin-card" style={{ maxWidth: 800 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-card-body" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {message && (
          <div className={message.type === "success" ? "admin-alert admin-alert-success" : "admin-alert admin-alert-error"}>
            {message.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {message.text}
          </div>
        )}

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Post Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className={`admin-input${errors.title ? " error" : ""}`}
              placeholder="e.g. 5 Tax Planning Strategies for Startups"
            />
            {errors.title && <p className="admin-field-error">{errors.title.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">URL Slug</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                {...register("slug", { required: "Slug is required" })}
                className={`admin-input${errors.slug ? " error" : ""}`}
                placeholder="5-tax-planning-strategies"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="admin-btn admin-btn-secondary"
                style={{ padding: "0 16px" }}
              >
                Auto
              </button>
            </div>
            {errors.slug && <p className="admin-field-error">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Category</label>
            <input
              {...register("category", { required: "Category is required" })}
              className={`admin-input${errors.category ? " error" : ""}`}
              placeholder="e.g. Tax Planning, Finance, Advisory"
            />
            {errors.category && <p className="admin-field-error">{errors.category.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Author</label>
            <input
              {...register("author", { required: "Author is required" })}
              className={`admin-input${errors.author ? " error" : ""}`}
              placeholder="e.g. John Doe"
            />
            {errors.author && <p className="admin-field-error">{errors.author.message}</p>}
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Excerpt (Preview Text)</label>
          <textarea
            {...register("excerpt", { required: "Excerpt is required" })}
            className={`admin-textarea${errors.excerpt ? " error" : ""}`}
            placeholder="A short summary that appears in blog cards and previews..."
            style={{ minHeight: 80 }}
          />
          {errors.excerpt && <p className="admin-field-error">{errors.excerpt.message}</p>}
          <p className="admin-field-hint">This appears on the homepage Blog Preview and blog listing page.</p>
        </div>

        <div className="admin-form-group">
          <RichTextEditor
            label="Full Content"
            helperText="Use the toolbar to make text bold, italic, or underlined."
            value={watch("content")}
            onChange={(html) =>
              setValue("content", html, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            placeholder="Write the full blog post content here..."
          />
          {errors.content && <p className="admin-field-error">{errors.content.message}</p>}
        </div>

        <ImageUploadField
          label="Featured Image"
          helperText="Upload a cover image, then drag and zoom to frame it before saving."
          value={featuredImage}
          onChange={(url) =>
            setValue("featuredImage", url, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          folder="blogs"
          aspectRatio={16 / 9}
        />

        <div className="admin-form-section">
          <div className="admin-checkbox-group" style={{ maxWidth: "max-content" }}>
            <input type="checkbox" id="isPublished" {...register("isPublished")} />
            <label htmlFor="isPublished">Publish this post (visible on the website)</label>
          </div>
        </div>

        <div className="admin-form-footer">
          <button
            type="button"
            onClick={() => router.back()}
            className="admin-btn admin-btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary"
          >
            {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
