"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createFaq, updateFaq } from "@/actions/faq";
import { CheckCircle, XCircle } from "lucide-react";

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

  return (
    <div className="admin-card" style={{ maxWidth: 800 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-card-body" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {message && (
          <div className={message.type === "success" ? "admin-alert admin-alert-success" : "admin-alert admin-alert-error"}>
            {message.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {message.text}
          </div>
        )}

        <div className="admin-form-group">
          <label className="admin-label">Question</label>
          <input
            {...register("question", { required: "Question is required" })}
            className={`admin-input${errors.question ? " error" : ""}`}
            placeholder="e.g. How do I start working with your company?"
          />
          {errors.question && <p className="admin-field-error">{errors.question.message}</p>}
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Answer</label>
          <textarea
            {...register("answer", { required: "Answer is required" })}
            className={`admin-textarea${errors.answer ? " error" : ""}`}
            placeholder="Detailed answer to the question..."
            style={{ minHeight: 120 }}
          />
          {errors.answer && <p className="admin-field-error">{errors.answer.message}</p>}
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Category (Optional)</label>
          <input
            {...register("category")}
            className="admin-input"
            placeholder="e.g. Services, Pricing, General"
          />
        </div>

        <div className="admin-form-section">
          <div className="admin-checkbox-group" style={{ maxWidth: "max-content" }}>
            <input type="checkbox" id="isActive" {...register("isActive")} />
            <label htmlFor="isActive">Make this FAQ active and visible on the website</label>
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
            {loading ? "Saving..." : isEdit ? "Update FAQ" : "Create FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
}
