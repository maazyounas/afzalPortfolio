import { KeyRound, ShieldCheck, LockKeyhole, UserCog } from "lucide-react";
import { getAdminCredentialSummary } from "@/lib/auth/admin-credential";
import { ChangeCredentialsForm } from "./ChangeCredentialsForm";

export const dynamic = "force-dynamic";

export default async function ChangePasswordPage() {
  const { username } = await getAdminCredentialSummary();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Change Credentials</h1>
          <p className="admin-page-subtitle">
            Change your admin username and password securely.
          </p>
        </div>
      </div>

      <div className="admin-grid-2" style={{ gridTemplateColumns: "1fr 1.5fr" }}>
        {/* Info Sidebar */}
        <aside className="admin-info-block">
          <div className="admin-info-item" style={{ flexDirection: "column", padding: 24 }}>
            <div className="admin-info-item-icon" style={{ width: 48, height: 48 }}>
              <ShieldCheck size={24} />
            </div>
            <div style={{ marginTop: 8 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--admin-primary)" }}>Current access</h2>
              <p style={{ fontSize: 13, color: "var(--admin-muted)", marginTop: 4 }}>
                Your current admin username is shown below for convenience.
              </p>
            </div>
            
            <div style={{ background: "#f1f5f9", padding: 16, borderRadius: "var(--admin-radius-sm)", marginTop: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--admin-muted)" }}>
                Active username
              </p>
              <p style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: "var(--admin-primary)", wordBreak: "break-all" }}>
                {username}
              </p>
            </div>
          </div>

          <div className="admin-info-item">
            <div className="admin-info-item-icon"><LockKeyhole size={18} /></div>
            <div>
              <h3 className="admin-info-item-title">Passwords are hashed</h3>
              <p className="admin-info-item-desc">No plain-text password storage anywhere in the app.</p>
            </div>
          </div>

          <div className="admin-info-item">
            <div className="admin-info-item-icon"><UserCog size={18} /></div>
            <div>
              <h3 className="admin-info-item-title">Together in one step</h3>
              <p className="admin-info-item-desc">Keep your admin email and password aligned.</p>
            </div>
          </div>
        </aside>

        {/* Form Card */}
        <div className="admin-card">
          <div className="admin-card-body">
            <ChangeCredentialsForm initialUsername={username} />
          </div>
        </div>
      </div>
    </div>
  );
}
