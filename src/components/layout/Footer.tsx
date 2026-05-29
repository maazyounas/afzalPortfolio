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
} from "lucide-react";

import { navigation } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/data/site-config";
import { getSettings } from "@/actions/settings";

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
  ].filter(link => link.href !== "#" && link.href !== "");

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-line)] bg-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[var(--color-accent-light)] opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100 opacity-40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        {/* Top Grid */}
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.7fr_0.9fr]">
          
          {/* Brand */}
          <div className="max-w-xl">
            <Link
              href="/"
              className="inline-flex items-center gap-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-xl font-bold text-white shadow-lg">
                S
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
                  {siteName}
                </h2>

                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Modern Financial Solutions
                </p>
              </div>
            </Link>

            <p className="mt-6 text-[15px] leading-8 text-[var(--color-muted)]">
              {description}
            </p>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {dynamicSocialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-2xl border border-[var(--color-line)]
                      bg-white text-[var(--color-muted)]
                      shadow-sm transition-all duration-300
                      hover:-translate-y-1
                      hover:border-[var(--color-accent-light)]
                      hover:text-[var(--color-accent)]
                      hover:shadow-lg
                    "
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)]">
              Navigation
            </h3>

            <div className="mt-6 flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group flex items-center justify-between
                    rounded-xl py-2 text-sm font-medium
                    text-[var(--color-muted)]
                    transition-all duration-300
                    hover:translate-x-1
                    hover:text-[var(--color-ink)]
                  "
                >
                  <span>{item.label}</span>

                  <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)]">
              Contact
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-light)]">
                  <Mail className="h-4 w-4 text-[var(--color-accent-strong)]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    Email
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[var(--color-muted)] break-all">
                    {email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-light)]">
                  <Phone className="h-4 w-4 text-[var(--color-accent-strong)]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    Phone
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                    {phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-light)]">
                  <MapPin className="h-4 w-4 text-[var(--color-accent-strong)]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    Address
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-16 flex flex-col items-center justify-between
            gap-5 border-t border-[var(--color-line)]
            pt-6 text-center text-sm
            text-[var(--color-muted)]
            md:flex-row md:text-left
          "
        >
          <p>
            © {currentYear} {siteName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-[var(--color-ink)]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-[var(--color-ink)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}