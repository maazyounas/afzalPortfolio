"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTestimonial, updateTestimonial } from "@/actions/testimonials";
import { ImageUploadField } from "@/features/admin/components/ImageUploadField";
import { CheckCircle, XCircle } from "lucide-react";

type TestimonialFormData = {
  author: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  isActive: boolean;
};

type TestimonialInitialData = Partial<TestimonialFormData> & {
  _id?: string;
};

interface TestimonialFormProps {
  initialData?: TestimonialInitialData;
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
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
  } = useForm<TestimonialFormData>({
    defaultValues: {
      author: initialData?.author || "",
      role: initialData?.role || "",
      company: initialData?.company || "",
      content: initialData?.content || "",
      rating: initialData?.rating || 5,
      image: initialData?.image || "",
      isActive: initialData?.isActive ?? true,
    },
  });

  const avatarImage = watch("image");

  async function onSubmit(data: TestimonialFormData) {
    setLoading(true);
    setMessage(null);

    const payload = {
      ...data,
      rating: Number(data.rating),
    };

    let result;

    if (isEdit) {
      result = await updateTestimonial(initialData!._id!, payload);
    } else {
      result = await createTestimonial(payload);
    }

    if (result.success) {
      setMessage({ text: isEdit ? "Testimonial updated!" : "Testimonial created!", type: "success" });
      router.push("/admin/testimonials");
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
            <label className="admin-label">Author Name</label>
            <input
              {...register("author", { required: "Author is required" })}
              className={`admin-input${errors.author ? " error" : ""}`}
              placeholder="e.g. Jane Doe"
            />
            {errors.author && <p className="admin-field-error">{errors.author.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              {...register("rating", { required: "Rating is required", min: 1, max: 5 })}
              className={`admin-input${errors.rating ? " error" : ""}`}
            />
            {errors.rating && <p className="admin-field-error">{errors.rating.message}</p>}
          </div>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Role (Optional)</label>
            <input
              {...register("role")}
              className="admin-input"
              placeholder="e.g. CEO"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Company (Optional)</label>
            <input
              {...register("company")}
              className="admin-input"
              placeholder="e.g. Acme Corp"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Testimonial Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className={`admin-textarea${errors.content ? " error" : ""}`}
            placeholder="What did they say?"
            style={{ minHeight: 100 }}
          />
          {errors.content && <p className="admin-field-error">{errors.content.message}</p>}
        </div>

        <ImageUploadField
          label="Avatar Image"
          helperText="Upload a headshot, then crop it like a social profile photo before saving."
          value={avatarImage}
          onChange={(url) =>
            setValue("image", url, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          folder="testimonials"
          aspectRatio={1}
        />

        <div className="admin-form-section">
          <div className="admin-checkbox-group" style={{ maxWidth: "max-content" }}>
            <input type="checkbox" id="isActive" {...register("isActive")} />
            <label htmlFor="isActive">Make this testimonial active on the website</label>
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
            {loading ? "Saving..." : isEdit ? "Update Testimonial" : "Create Testimonial"}
          </button>
        </div>
      </form>
    </div>
  );
}
