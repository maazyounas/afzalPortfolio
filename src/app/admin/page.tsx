import Link from "next/link";
import { ArrowRight, FileText, Settings, Shield, Users, Wrench } from "lucide-react";

export const dynamic = "force-dynamic";

const quickLinks = [
  { href: "/admin/blogs", label: "Manage Blogs", icon: FileText, description: "Create, update, and publish blog content." },
  { href: "/admin/services", label: "Manage Services", icon: Wrench, description: "Edit service offerings and public descriptions." },
  { href: "/admin/team", label: "Manage Team", icon: Users, description: "Update team member profiles and bios." },
  { href: "/admin/settings", label: "Site Settings", icon: Settings, description: "Adjust contact and branding settings." },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-100 bg-slate-950 px-6 py-8 text-white sm:px-8">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-cyan-300">
              <Shield className="h-4 w-4" />
              Admin Dashboard
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Use the links below to manage your site content, services, team, and settings.
              This landing page stays static so Vercel can build without needing MongoDB at compile time.
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-700">
                    Open
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
