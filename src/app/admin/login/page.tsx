"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--color-ink)] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="mt-2 text-sm text-white/60">Enter your secure password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80">Password</label>
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 transition-all focus:ring-2 focus:ring-[var(--color-accent)]"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-accent)] py-3 font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
