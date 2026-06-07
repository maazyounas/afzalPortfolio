import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { Shield, LockKeyhole, ArrowRight } from "lucide-react";
import Link from "next/link";
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.10),_transparent_28%),linear-gradient(to_bottom,_#020617,_#0f172a_55%,_#020617)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            <Shield className="h-4 w-4" />
            Private Admin Portal
          </div>

          <div className="max-w-xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Sign in to manage the site from one clean dashboard.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Access the CMS to update services, blog posts, team profiles, testimonials, FAQs, and
              global site settings.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Secure token-based access",
              "Mobile-friendly admin controls",
              "Consistent dark interface",
              "Fast redirects after login",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/80">
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-cyan-300" />
              Admin access only
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              Return to website
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[#08111f]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mb-8 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Admin Login
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">Welcome back</h2>
            <p className="text-sm leading-6 text-white/65">
              Enter the admin password to continue to the overview page.
            </p>
          </div>

          <LoginForm />
        </section>
      </div>
    </div>
  );
}
