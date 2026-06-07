"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createFaq, updateFaq } from "@/actions/faq";

type FaqFormData = {
  question: string;
  answer: string;
  category?: string;
  isActive: boolean;
};

type FaqInitialData = Partial<FaqFormData> & {
  _id?: string;
};

interface FaqFormProps {
  initialData?: FaqInitialData;
}

export function FaqForm({ initialData }: FaqFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const router = useRouter();
  const isEdit = !!initialData?._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqFormData>({
    defaultValues: {
      question: initialData?.question || "",
      answer: initialData?.answer || "",
      category: initialData?.category || "",
      isActive: initialData?.isActive ?? true,
    },
  });

  async function onSubmit(data: FaqFormData) {
    setLoading(true);
    setMessage(null);

    let result;

    if (isEdit) {
      result = await updateFaq(initialData!._id!, data);
    } else {
      result = await createFaq(data);
    }

    if (result.success) {
      setMessage({ text: isEdit ? "FAQ updated!" : "FAQ created!", type: "success" });
      router.push("/admin/faq");
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

      <div>
        <label className={labelClasses}>Question</label>
        <input
          {...register("question", { required: "Question is required" })}
          className={inputClasses}
          placeholder="e.g. How do I start working with your company?"
        />
        {errors.question && <p className="mt-1 text-xs text-red-400">{errors.question.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Answer</label>
        <textarea
          {...register("answer", { required: "Answer is required" })}
          rows={5}
          className={`${inputClasses} resize-y`}
          placeholder="Detailed answer to the question..."
        />
        {errors.answer && <p className="mt-1 text-xs text-red-400">{errors.answer.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Category (Optional)</label>
        <input
          {...register("category")}
          className={inputClasses}
          placeholder="e.g. Services, Pricing, General"
        />
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
        <input
          type="checkbox"
          id="isActive"
          {...register("isActive")}
          className="h-4 w-4 rounded border-white/20 bg-white/10 accent-blue-500"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-neutral-300">
          Make this FAQ active and visible on the website
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
          {loading ? "Saving..." : isEdit ? "Update FAQ" : "Create FAQ"}
        </button>
      </div>
    </form>
  );
}
