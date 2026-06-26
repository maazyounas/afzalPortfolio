"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateAdminCredentials } from "@/actions/auth";
import { CheckCircle, XCircle } from "lucide-react";

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

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {error && (
        <div className="admin-alert admin-alert-error">
          <XCircle size={16} />
          {error}
        </div>
      )}

      {success && (
        <div className="admin-alert admin-alert-success">
          <CheckCircle size={16} />
          {success}
        </div>
      )}

      <div style={{ padding: 16, background: "var(--admin-accent-light)", color: "var(--admin-accent)", borderRadius: "var(--admin-radius-sm)", fontSize: 13, fontWeight: 500 }}>
        After saving, you'll be signed out automatically and should log in again with the new username and password.
      </div>

      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Current credentials</h3>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Current username</label>
            <input
              type="email"
              name="currentUsername"
              required
              autoComplete="username"
              defaultValue={initialUsername}
              className="admin-input"
              placeholder="admin@example.com"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Current password</label>
            <input
              type="password"
              name="currentPassword"
              required
              autoComplete="current-password"
              className="admin-input"
              placeholder="Enter current password"
            />
          </div>
        </div>
      </div>

      <div className="admin-form-section">
        <h3 className="admin-form-section-title">New credentials</h3>
        <div className="admin-form-group" style={{ marginBottom: 20 }}>
          <label className="admin-label">New username</label>
          <input
            type="email"
            name="newUsername"
            required
            autoComplete="email"
            className="admin-input"
            placeholder="new-admin@example.com"
          />
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">New password</label>
            <input
              type="password"
              name="newPassword"
              required
              autoComplete="new-password"
              className="admin-input"
              placeholder="Create a strong password"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Confirm new password</label>
            <input
              type="password"
              name="confirmNewPassword"
              required
              autoComplete="new-password"
              className="admin-input"
              placeholder="Repeat the new password"
            />
          </div>
        </div>
      </div>

      <div className="admin-form-footer">
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading ? "Saving changes..." : "Save credentials"}
        </button>
      </div>
    </form>
  );
}
