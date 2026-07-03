import Link from "next/link";


export const metadata = {
  title: "Admin | Softech Financials",
  description: "Admin page of Softech Financials.",
  keywords: ["portfolio", "admin", "Softech Financials"],
  alternates: {
    canonical: "/admin",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Admin | Softech Financials",
    description: "Admin page of Softech Financials.",
    url: "/admin",
  },
};

import {
  ArrowRight,
  FileText,
  KeyRound,
  Settings,
  Users,
  Wrench,
  Star,
  HelpCircle,
  MessageSquare,
  LayoutDashboard,
  TrendingUp,
  Shield,
} from "lucide-react";

export const dynamic = "force-dynamic";

const quickLinks = [
  {
    href: "/admin/blogs",
    label: "Blog Posts",
    icon: FileText,
    description: "Create, update, and publish articles to your blog.",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: Wrench,
    description: "Edit service offerings and public descriptions.",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    href: "/admin/team",
    label: "Team Members",
    icon: Users,
    description: "Update team member profiles and bios.",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    icon: Star,
    description: "Manage client testimonials shown on the site.",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    href: "/admin/faq",
    label: "FAQ",
    icon: HelpCircle,
    description: "Manage frequently asked questions.",
    color: "#06b6d4",
    bg: "#ecfeff",
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: MessageSquare,
    description: "View contact form submissions from visitors.",
    color: "#ec4899",
    bg: "#fdf2f8",
  },
  {
    href: "/admin/change-password",
    label: "Credentials",
    icon: KeyRound,
    description: "Update the admin username and password securely.",
    color: "#ef4444",
    bg: "#fef2f2",
  },
  {
    href: "/admin/settings",
    label: "Site Settings",
    icon: Settings,
    description: "Adjust contact, branding, and social settings.",
    color: "#64748b",
    bg: "#f8fafc",
  },
];

export default function AdminPage() {
  return (
    <div>
      {/* Hero banner */}
      <div className="admin-hero-banner">
        <div className="admin-hero-tag">
          <Shield size={13} aria-hidden="true" />
          Admin Dashboard
        </div>
        <h1 className="admin-hero-title">
          Welcome back — your control panel is ready.
        </h1>
        <p className="admin-hero-subtitle">
          Manage all your site content, services, team, and settings from one
          centralized dashboard.
        </p>
      </div>

      {/* Quick links grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="admin-stat-card admin-card-hover"
              style={{ textDecoration: "none" }}
            >
              <div
                className="admin-stat-icon"
                style={{
                  background: item.bg,
                  color: item.color,
                }}
              >
                <Icon size={20} aria-hidden="true" />
              </div>
              <div className="admin-stat-label">{item.label}</div>
              <div className="admin-stat-desc">{item.description}</div>
              <div className="admin-stat-link" style={{ color: item.color }}>
                Open
                <ArrowRight size={14} aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
