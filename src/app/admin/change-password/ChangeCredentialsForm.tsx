"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateAdminCredentials } from "@/actions/auth";

type ChangeCredentialsFormProps = {
  initialUsername: string;
};

export function ChangeCredentialsForm({
  initialUsername,
}: ChangeCredentialsFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateAdminCredentials(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(result.message || "Credentials updated successfully.");
    setLoading(false);

    window.setTimeout(() => {
      router.replace("/admin/login");
      router.refresh();
    }, 1200);
  }

  const inputClasses =
    "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-white/30 focus:border-cyan-400 focus:bg-white/[0.07]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Change credentials
        </p>
        <h2 className="text-2xl font-bold text-white">Update your login</h2>
        <p className="text-sm leading-6 text-white/65">
          Confirm your current username and password first, then set the new
          credentials you want to use going forward.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/35 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Current credentials
          </h3>

          <div>
            <label className="block text-sm font-medium text-white/80">
              Current username
            </label>
            <input
              type="email"
              name="currentUsername"
              required
              autoComplete="username"
              defaultValue={initialUsername}
              className={inputClasses}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">
              Current password
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              autoComplete="current-password"
              className={inputClasses}
              placeholder="Enter current password"
            />
          </div>
        </div>

        <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/35 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            New credentials
          </h3>

          <div>
            <label className="block text-sm font-medium text-white/80">
              New username
            </label>
            <input
              type="email"
              name="newUsername"
              required
              autoComplete="email"
              className={inputClasses}
              placeholder="new-admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">
              New password
            </label>
            <input
              type="password"
              name="newPassword"
              required
              autoComplete="new-password"
              className={inputClasses}
              placeholder="Create a strong password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">
              Confirm new password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              required
              autoComplete="new-password"
              className={inputClasses}
              placeholder="Repeat the new password"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
        After saving, you&apos;ll be signed out automatically and should log in
        again with the new username and password.
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {success}
        </div>
      )}

      <div className="flex justify-end border-t border-white/10 pt-5">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving changes..." : "Save credentials"}
        </button>
      </div>
    </form>
  );
}
