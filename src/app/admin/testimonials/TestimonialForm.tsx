"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTestimonial, updateTestimonial } from "@/actions/testimonials";
import { ImageUploadField } from "@/features/admin/components/ImageUploadField";

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

    // Parse rating to number
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

  const inputClasses =
    "w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500 transition-all";
  const labelClasses = "block text-sm font-medium text-neutral-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
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

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Author Name</label>
          <input
            {...register("author", { required: "Author is required" })}
            className={inputClasses}
            placeholder="e.g. Jane Doe"
          />
          {errors.author && <p className="mt-1 text-xs text-red-400">{errors.author.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            {...register("rating", { required: "Rating is required", min: 1, max: 5 })}
            className={inputClasses}
          />
          {errors.rating && <p className="mt-1 text-xs text-red-400">{errors.rating.message}</p>}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Role (Optional)</label>
          <input
            {...register("role")}
            className={inputClasses}
            placeholder="e.g. CEO"
          />
        </div>

        <div>
          <label className={labelClasses}>Company (Optional)</label>
          <input
            {...register("company")}
            className={inputClasses}
            placeholder="e.g. Acme Corp"
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Testimonial Content</label>
        <textarea
          {...register("content", { required: "Content is required" })}
          rows={4}
          className={`${inputClasses} resize-y`}
          placeholder="What did they say?"
        />
        {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content.message}</p>}
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

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
        <input
          type="checkbox"
          id="isActive"
          {...register("isActive")}
          className="h-4 w-4 rounded border-white/20 bg-white/10 accent-blue-500"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-neutral-300">
          Make this testimonial active on the website
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end sm:gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl px-6 py-3 text-sm font-medium text-neutral-400 transition-all hover:bg-white/5 hover:text-white sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Saving..." : isEdit ? "Update Testimonial" : "Create Testimonial"}
        </button>
      </div>
    </form>
  );
}
