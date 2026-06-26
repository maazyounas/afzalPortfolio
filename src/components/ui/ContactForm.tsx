"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "@/lib/motion";

type FormValues = {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
};

export function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setSent(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(payload?.error || "Network error");
      }
      setToast({ text: "Message sent - we'll reply within 2 business days.", type: "success" });
      setSent(true);
      reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send message. Please email hello@softechfinancials.com";
      setToast({ text: message, type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4500);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 md:grid-cols-2"
    >
      <input
        {...register("name")}
        placeholder="Full name"
        className="md:col-span-2 rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        required
      />

      <input
        {...register("email")}
        placeholder="Email address"
        className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        required
      />

      <input
        {...register("subject")}
        placeholder="Subject (optional)"
        className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      />

      <input
        {...register("company")}
        placeholder="Company (optional)"
        className="md:col-span-2 rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      />

      <textarea
        {...register("message")}
        placeholder="How can we help?"
        className="md:col-span-2 min-h-[120px] rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        required
      />

      <div className="md:col-span-2 mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg"
          disabled={loading}
        >
          {loading ? "Sending..." : sent ? "Sent" : "Send message"}
        </button>
      </div>
      {toast ? (
        <div aria-live="polite" className="md:col-span-2 mt-2">
          <div
            className={
              toast.type === "success"
                ? "rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800 shadow-sm"
                : "rounded-md bg-rose-50 px-4 py-2 text-sm text-rose-800 shadow-sm"
            }
          >
            {toast.text}
          </div>
        </div>
      ) : null}
    </motion.form>
  );
}
