import { KeyRound, ShieldCheck, LockKeyhole, UserCog } from "lucide-react";
import { getAdminCredentialSummary } from "@/lib/auth/admin-credential";
import { ChangeCredentialsForm } from "./ChangeCredentialsForm";


export const metadata = {
  title: "Change Password | Softech Financials",
  description: "Change Password page of Softech Financials.",
  keywords: ["portfolio", "change password", "Softech Financials"],
  alternates: {
    canonical: "/admin/change-password",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Change Password | Softech Financials",
    description: "Change Password page of Softech Financials.",
    url: "/admin/change-password",
  },
};


export const dynamic = "force-dynamic";

export default async function ChangePasswordPage() {
  const { username } = await getAdminCredentialSummary();

  return (
    <div className="space-y-6">
      <div className="admin-page-header">
        <div className="max-w-2xl">
          <div className="admin-hero-tag" style={{ marginBottom: 12 }}>
            <KeyRound size={13} aria-hidden="true" />
            Credentials
          </div>
          <h1 className="admin-page-title">Change Credentials</h1>
          <p className="admin-page-subtitle">
            Update your admin username and password in one place. The layout
            stacks cleanly on mobile, and the form guides you through each step.
          </p>
        </div>
      </div>

      <div className="admin-grid-2" style={{ alignItems: "start" }}>
        <aside className="admin-info-block">
          <div className="admin-card" style={{ overflow: "hidden" }}>
            <div
              style={{
                padding: 24,
                background:
                  "linear-gradient(180deg, rgba(20,184,166,0.08) 0%, rgba(255,255,255,0.95) 100%)",
                borderBottom: "1px solid var(--admin-border)",
              }}
            >
              <div className="admin-info-item-icon" style={{ width: 48, height: 48 }}>
                <ShieldCheck size={24} />
              </div>
              <div style={{ marginTop: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--admin-primary)" }}>
                  Current access
                </h2>
                <p style={{ fontSize: 13, color: "var(--admin-muted)", marginTop: 4, lineHeight: 1.6 }}>
                  Your current admin username is shown below for convenience.
                </p>
              </div>
            </div>

            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "#f8fafc", padding: 16, borderRadius: "var(--admin-radius-sm)", border: "1px solid var(--admin-border)" }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--admin-muted)" }}>
                  Active username
                </p>
                <p style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: "var(--admin-primary)", wordBreak: "break-all" }}>
                  {username}
                </p>
              </div>
            </div>
          </div>

          <div className="admin-info-item">
            <div className="admin-info-item-icon">
              <LockKeyhole size={18} />
            </div>
            <div>
              <h3 className="admin-info-item-title">Passwords are hashed</h3>
              <p className="admin-info-item-desc">
                No plain-text password storage anywhere in the app.
              </p>
            </div>
          </div>

          <div className="admin-info-item">
            <div className="admin-info-item-icon">
              <UserCog size={18} />
            </div>
            <div>
              <h3 className="admin-info-item-title">One guided update</h3>
              <p className="admin-info-item-desc">
                Change username and password together, then sign in again with the new details.
              </p>
            </div>
          </div>
        </aside>

        <div className="admin-card" style={{ maxWidth: 920, width: "100%" }}>
          <div className="admin-card-body">
            <ChangeCredentialsForm initialUsername={username} />
          </div>
        </div>
      </div>
    </div>
  );
}
