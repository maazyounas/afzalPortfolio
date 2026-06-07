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
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl">
        <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.16),_transparent_30%),linear-gradient(to_right,_rgba(8,17,31,0.98),_rgba(15,23,42,0.94))] px-6 py-8 text-white sm:px-8 sm:py-10">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            <Shield className="h-4 w-4" />
            Admin Dashboard
          </div>
          <div className="mt-5 max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Welcome back, manage everything from a single dark workspace.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Use the links below to manage your site content, services, team, and settings.
              The layout stays consistent across screens so the admin panel feels comfortable on
              mobile, tablet, and desktop.
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 sm:p-6 lg:p-8">
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/[0.06] hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition group-hover:bg-cyan-400 group-hover:text-slate-950">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">{item.label}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{item.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
