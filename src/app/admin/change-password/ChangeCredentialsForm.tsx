"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateAdminCredentials } from "@/actions/auth";
import {
  CheckCircle,
  Eye,
  EyeOff,
  ShieldAlert,
  UserRound,
  XCircle,
} from "lucide-react";

type ChangeCredentialsFormProps = {
  initialUsername: string;
};

function PasswordToggleButton({
  visible,
  onClick,
  label,
}: {
  visible: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="admin-btn-icon"
      aria-label={label}
      style={{ position: "absolute", right: 10, top: 34 }}
    >
      {visible ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );
}

export function ChangeCredentialsForm({
  initialUsername,
}: ChangeCredentialsFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = String(formData.get("newPassword") || "");
    const confirmNewPassword = String(formData.get("confirmNewPassword") || "");

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirmation do not match.");
      setLoading(false);
      return;
    }

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
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      {error && (
        <div className="admin-alert admin-alert-error" role="alert">
          <XCircle size={16} />
          {error}
        </div>
      )}

      {success && (
        <div className="admin-alert admin-alert-success" role="status">
          <CheckCircle size={16} />
          {success}
        </div>
      )}

      <div
        className="admin-info-item"
        style={{
          alignItems: "flex-start",
          background: "var(--admin-accent-light)",
          borderColor: "rgba(20, 184, 166, 0.18)",
        }}
      >
        <div className="admin-info-item-icon" style={{ width: 40, height: 40 }}>
          <ShieldAlert size={18} />
        </div>
        <div>
          <h3 className="admin-info-item-title">Before you save</h3>
          <p className="admin-info-item-desc">
            After saving, you&apos;ll be signed out automatically and should log in again
            with the new username and password.
          </p>
        </div>
      </div>

      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Current credentials</h3>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Current username</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                name="currentUsername"
                required
                autoComplete="username"
                defaultValue={initialUsername}
                className="admin-input"
                style={{ paddingRight: 42 }}
                placeholder="admin@example.com"
              />
              <UserRound
                size={16}
                style={{
                  position: "absolute",
                  right: 12,
                  top: 36,
                  color: "var(--admin-muted)",
                }}
              />
            </div>
            <p className="admin-field-hint">
              This should match the username you currently use to sign in.
            </p>
          </div>

          <div className="admin-form-group" style={{ position: "relative" }}>
            <label className="admin-label">Current password</label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              required
              autoComplete="current-password"
              className="admin-input"
              style={{ paddingRight: 44 }}
              placeholder="Enter current password"
            />
            <PasswordToggleButton
              visible={showCurrentPassword}
              onClick={() => setShowCurrentPassword((value) => !value)}
              label={showCurrentPassword ? "Hide current password" : "Show current password"}
            />
            <p className="admin-field-hint">Use the password you have right now.</p>
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
            style={{ paddingRight: 14 }}
            placeholder="new-admin@example.com"
          />
          <p className="admin-field-hint">
            Choose an email address you can access for future sign-ins.
          </p>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group" style={{ position: "relative" }}>
            <label className="admin-label">New password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              required
              autoComplete="new-password"
              className="admin-input"
              style={{ paddingRight: 44 }}
              placeholder="Create a strong password"
            />
            <PasswordToggleButton
              visible={showNewPassword}
              onClick={() => setShowNewPassword((value) => !value)}
              label={showNewPassword ? "Hide new password" : "Show new password"}
            />
            <p className="admin-field-hint">
              Use a strong password with a mix of letters, numbers, and symbols.
            </p>
          </div>

          <div className="admin-form-group" style={{ position: "relative" }}>
            <label className="admin-label">Confirm new password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              required
              autoComplete="new-password"
              className="admin-input"
              style={{ paddingRight: 44 }}
              placeholder="Repeat the new password"
            />
            <PasswordToggleButton
              visible={showConfirmPassword}
              onClick={() => setShowConfirmPassword((value) => !value)}
              label={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
            />
            <p className="admin-field-hint">
              Re-enter the new password so we can check for typos.
            </p>
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
