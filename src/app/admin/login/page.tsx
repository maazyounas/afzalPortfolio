import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { LoginForm } from "./LoginForm";
import { ShieldCheck } from "lucide-react";


export const metadata = {
  title: "Login | Afzal's Portfolio",
  description: "Login page of Afzal's Portfolio.",
  keywords: ["portfolio", "login", "Afzal"],
  alternates: {
    canonical: "/admin/login",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Login | Afzal's Portfolio",
    description: "Login page of Afzal's Portfolio.",
    url: "/admin/login",
  },
};


const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_me";
const secret = new TextEncoder().encode(JWT_SECRET);

async function hasValidAdminToken() {
  const token = (await cookies()).get("admin_token")?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export default async function LoginPage() {
  if (await hasValidAdminToken()) {
    redirect("/admin");
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <ShieldCheck size={28} />
        </div>
        <h1 className="admin-login-title">Sign in securely</h1>
        <p className="admin-login-subtitle" style={{ marginBottom: 32 }}>
          Use your admin email and password to access the dashboard.
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
