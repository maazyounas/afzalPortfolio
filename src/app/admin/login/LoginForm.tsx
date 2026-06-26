"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { XCircle } from "lucide-react";

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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {error && (
        <div className="admin-alert admin-alert-error" style={{ marginBottom: 4 }}>
          <XCircle size={16} />
          {error}
        </div>
      )}

      <div className="admin-form-group">
        <label className="admin-label">Admin email</label>
        <input
          type="email"
          name="username"
          required
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={254}
          className="admin-input"
          placeholder="Enter your admin email"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-label">Password</label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          maxLength={128}
          className="admin-input"
          placeholder="Enter admin password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="admin-btn admin-btn-primary admin-btn-lg"
        style={{ width: "100%", marginTop: 8 }}
      >
        {loading ? "Authenticating..." : "Login to Admin"}
      </button>
    </form>
  );
}
