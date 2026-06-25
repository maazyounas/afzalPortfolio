"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Settings, 
  FileText, 
  Star,
  LogOut,
  HelpCircle,
  X,
  KeyRound,
} from "lucide-react";
import { logout } from "@/actions/auth";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/services", icon: Briefcase, label: "Services" },
  { href: "/admin/team", icon: Users, label: "Team" },
  { href: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { href: "/admin/blogs", icon: FileText, label: "Blogs" },
  { href: "/admin/faq", icon: HelpCircle, label: "FAQ" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/change-password", icon: KeyRound, label: "Credentials" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(9,13,24,0.92)] text-white shadow-lg backdrop-blur lg:hidden"
      >
        <span className="sr-only">Open admin menu</span>
        <div className="flex h-4 w-4 flex-col justify-between">
          <span className="block h-0.5 w-full rounded-full bg-current" />
          <span className="block h-0.5 w-full rounded-full bg-current" />
          <span className="block h-0.5 w-full rounded-full bg-current" />
        </div>
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close admin menu overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[var(--color-ink)] px-6 py-6 text-white shadow-2xl transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              Admin CMS
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">Control Panel</h2>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close admin menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 lg:hidden"
          >
            <span className="sr-only">Close admin menu</span>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-400/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
