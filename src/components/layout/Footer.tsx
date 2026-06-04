import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Link2,
  Mail,
  MapPin,
  Phone,
  Share2,
  Clock,
  Shield,
  Heart,
} from "lucide-react";

import { siteConfig } from "@/lib/data/site-config";
import { getSettings } from "@/actions/settings";

import ScrollToTopButton from "./ScrollToTopButton";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const settings = await getSettings();

  const siteName = settings?.siteName || siteConfig.name;
  const description = settings?.description || siteConfig.description;
  const email = settings?.contactEmail || siteConfig.company.email;
  const phone = settings?.contactPhone || siteConfig.company.phone;
  const address = settings?.address || siteConfig.location.address;

  const dynamicSocialLinks = [
    { icon: Link2, href: settings?.socialLinks?.linkedin || "#", label: "LinkedIn" },
    { icon: Share2, href: settings?.socialLinks?.twitter || "#", label: "Twitter" },
    { icon: Globe, href: settings?.socialLinks?.facebook || "#", label: "Facebook" },
  ].filter((link) => link.href !== "#" && link.href !== "");

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
  ];

  const resources = [
    { label: "Help Center", href: "/help" },
    { label: "FAQs", href: "/faq" },
    { label: "Support", href: "/support" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50/80">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-(--color-accent-light) opacity-30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan-100 opacity-30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-md sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3 transition-transform hover:scale-105">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) text-lg font-bold text-white shadow-lg transition-all duration-300 group-hover:shadow-xl">
                S
              </div>

              <div>
                <h2 className="font-(--font-display) text-xl font-bold tracking-tight text-(--color-ink)">
                  {siteName}
                </h2>
                <p className="text-xs text-(--color-muted)">Financial Excellence</p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-(--color-muted)">{description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1">
                <Shield className="h-3 w-3 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">Secure</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1">
                <Clock className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">24/7 Support</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1">
                <Heart className="h-3 w-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">Trusted</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {dynamicSocialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-(--color-line) bg-white text-(--color-muted) shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent-light) hover:text-(--color-accent) hover:shadow-lg"
                  >
                    <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-ink)">
              Quick Links
            </h3>
            <div className="mt-5 flex flex-col gap-2.5">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-(--color-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--color-accent)"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-ink)">
              Resources
            </h3>
            <div className="mt-5 flex flex-col gap-2.5">
              {resources.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-(--color-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--color-accent)"
                >
                  <ExternalLink className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-ink)">
              Contact
            </h3>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-(--color-accent)" />
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-(--color-muted) transition-colors hover:text-(--color-accent)"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-(--color-accent)" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-sm text-(--color-muted) transition-colors hover:text-(--color-accent)"
                >
                  {phone}
                </a>
              </div>
              {address && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                  <p className="text-sm text-(--color-muted)">{address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-(--color-line) pt-6 text-center text-sm text-(--color-muted) md:flex-row md:text-left">
          <p>© {currentYear} {siteName}. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/privacy"
              className="rounded-full border border-transparent px-3 py-1 transition-colors duration-300 hover:border-(--color-line) hover:text-(--color-accent)"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="rounded-full border border-transparent px-3 py-1 transition-colors duration-300 hover:border-(--color-line) hover:text-(--color-accent)"
            >
              Terms of Service
            </Link>
          </div>

          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
}
