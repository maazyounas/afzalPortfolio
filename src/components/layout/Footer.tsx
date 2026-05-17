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

import { TrustLogos } from "@/components/ui/TrustLogos";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-(--color-line) bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-(--color-accent-light) opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100 opacity-40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-accent) text-lg font-bold text-white shadow-lg">
                S
              </div>

              <div>
                <h2 className="font-(family-name:--font-display) text-2xl font-bold text-(--color-ink)">
                  {siteConfig.name}
                </h2>

                <p className="text-sm text-(--color-muted)">
                  Modern Financial Solutions
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-[15px] leading-8 text-(--color-muted)">
              {siteConfig.description}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 text-sm text-(--color-muted)">
                <Mail className="mt-0.5 h-4 w-4 text-(--color-accent)" />
                <span className="break-all">{siteConfig.company.email}</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-(--color-muted)">
                <Phone className="mt-0.5 h-4 w-4 text-(--color-accent)" />
                <span>{siteConfig.company.phone}</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-(--color-muted)">
                <MapPin className="mt-0.5 h-4 w-4 text-(--color-accent)" />
                <span>{siteConfig.location.address}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {[
                {
                  icon: Globe,
                  href: "#",
                },
                {
                  icon: Link2,
                  href: "#",
                },
                {
                  icon: Share2,
                  href: "#",
                },
                {
                  icon: ExternalLink,
                  href: "#",
                },
              ].map((social, index) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-(--color-line) bg-white text-(--color-muted) shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent-light) hover:text-(--color-accent) hover:shadow-lg"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-ink)">
              Navigation
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-xl py-1 text-sm font-medium text-(--color-muted) transition-all duration-300 hover:text-(--color-ink)"
                >
                  <span>{item.label}</span>

                  <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-ink)">
              Newsletter
            </h3>

            <p className="mt-6 text-sm leading-7 text-(--color-muted)">
              Subscribe to receive insights, updates, and financial strategies
              directly in your inbox.
            </p>

            <form className="mt-6">
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-2xl border border-(--color-line) bg-white px-4 text-sm text-(--color-ink) shadow-sm transition-all duration-300 placeholder:text-(--color-muted) focus:border-(--color-accent) focus:ring-4 focus:ring-[rgba(20,184,166,0.12)]"
                />

                <button
                  type="submit"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-(--color-accent) px-5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-accent-strong) hover:shadow-xl"
                >
                  Subscribe

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
                Trusted By
              </p>

              <div className="mt-4 rounded-2xl border border-(--color-line) bg-white/80 p-4 shadow-sm backdrop-blur-lg">
                <TrustLogos />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-(--color-line) pt-6 text-center text-sm text-(--color-muted) md:flex-row md:text-left">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-(--color-ink)"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-(--color-ink)"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
