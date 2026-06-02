"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "@/lib/motion";

type FormValues = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network error");
      setToast("Message sent — we'll reply within 2 business days.");
      setSent(true);
      reset();
    } catch {
      setToast("Unable to send message. Please email hello@softechfinancials.com");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4500);
    }
  };

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 md:grid-cols-2">
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
        {...register("company")}
        placeholder="Company (optional)"
        className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      />

      <textarea
        {...register("message")}
        placeholder="How can we help?"
        className="md:col-span-2 min-h-[120px] rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        required
      />

      <div className="md:col-span-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between mt-2">
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
          <div className="rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800 shadow-sm">{toast}</div>
        </div>
      ) : null}
    </motion.form>
  );
}
