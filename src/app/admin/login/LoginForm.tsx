"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Admin email
        </label>
        <input
          type="email"
          name="username"
          required
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={254}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-all placeholder:text-white/28 focus:border-cyan-400 focus:bg-white/[0.08] focus:shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
          placeholder="Enter your admin email"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          maxLength={128}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-all placeholder:text-white/28 focus:border-cyan-400 focus:bg-white/[0.08] focus:shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
          placeholder="Enter admin password"
        />
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Authenticating..." : "Login to Admin"}
      </button>
    </form>
  );
}
