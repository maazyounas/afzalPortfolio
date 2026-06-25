import { KeyRound, ShieldCheck, LockKeyhole, UserCog } from "lucide-react";
import { getAdminCredentialSummary } from "@/lib/auth/admin-credential";
import { ChangeCredentialsForm } from "./ChangeCredentialsForm";

export const dynamic = "force-dynamic";

export default async function ChangePasswordPage() {
  const { username } = await getAdminCredentialSummary();

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
        <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_30%),linear-gradient(to_right,_rgba(8,17,31,0.98),_rgba(15,23,42,0.94))] px-6 py-8 text-white sm:px-8 sm:py-10">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            <KeyRound className="h-4 w-4" />
            Admin Security
          </div>
          <div className="mt-5 max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Change your admin username and password in one place.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Update your sign-in email and password safely. The credentials are
              stored in MongoDB with bcrypt hashing, and you will be signed out
              after saving so the new details take effect immediately.
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
          <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Current access</h2>
              <p className="text-sm leading-6 text-white/65">
                Your current admin username is shown here for convenience.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Active username
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-cyan-200">
                {username}
              </p>
            </div>

            <div className="grid gap-3">
              {[
                {
                  icon: LockKeyhole,
                  title: "Passwords are hashed",
                  text: "No plain-text password storage anywhere in the app.",
                },
                {
                  icon: UserCog,
                  title: "Username and password together",
                  text: "Keep your admin email and password aligned in one step.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-[#09111f]/70 p-4"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-white/60">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:p-8">
            <ChangeCredentialsForm initialUsername={username} />
          </div>
        </div>
      </section>
    </div>
  );
}
