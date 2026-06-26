"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  LayoutGrid,
  Menu,
  ShieldCheck,
} from "lucide-react";
import { logout } from "@/actions/auth";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview", exact: true },
  { href: "/admin/services", icon: Briefcase, label: "Services" },
  { href: "/admin/team", icon: Users, label: "Team" },
  { href: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { href: "/admin/blogs", icon: FileText, label: "Blogs" },
  { href: "/admin/faq", icon: HelpCircle, label: "FAQ" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
];

const settingsItems = [
  { href: "/admin/change-password", icon: KeyRound, label: "Credentials" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

function NavLink({
  item,
  onClick,
}: {
  item: (typeof navItems)[0];
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`admin-nav-item${isActive ? " active" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      <item.icon className="admin-nav-icon" aria-hidden="true" />
      {item.label}
    </Link>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close sidebar on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className="admin-menu-toggle"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="admin-overlay open"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar${open ? " open" : ""}`}
        aria-label="Admin navigation"
      >
        {/* Header */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <div className="admin-sidebar-logo-icon">
              <ShieldCheck size={20} aria-hidden="true" />
            </div>
            <div className="admin-sidebar-brand">
              <span className="admin-sidebar-brand-label">Admin CMS</span>
              <span className="admin-sidebar-brand-name">Control Panel</span>
            </div>
            {/* Close on mobile */}
            <button
              type="button"
              onClick={close}
              aria-label="Close admin menu"
              className="admin-btn-icon"
              style={{ marginLeft: "auto" }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav" aria-label="Main navigation">
          <span className="admin-sidebar-section-label">Content</span>
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} onClick={close} />
          ))}

          <span className="admin-sidebar-section-label">Administration</span>
          {settingsItems.map((item) => (
            <NavLink key={item.href} item={item} onClick={close} />
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <button
            type="button"
            onClick={() => logout()}
            className="admin-logout-btn"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
