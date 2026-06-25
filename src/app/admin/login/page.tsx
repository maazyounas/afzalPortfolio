import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { LoginForm } from "./LoginForm";

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.14),_transparent_26%),linear-gradient(180deg,_#020617_0%,_#07111f_48%,_#020617_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-2xl items-center justify-center">
        <section className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.06),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_28%)]" />
          <div className="relative">
            <div className="mb-8 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Admin Login
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in securely
              </h1>
              <p className="max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Use your admin email and password to access the dashboard. The
                login is validated server-side with hashed passwords, origin
                checks, and brute-force throttling.
              </p>
            </div>

            

            <LoginForm />
          </div>
        </section>
      </div>
    </div>
  );
}
