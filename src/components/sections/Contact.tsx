"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapPin } from "lucide-react";

export function Contact() {
  return (
    <SectionWrapper
      eyebrow="Get Started"
      title="Let us build a finance function that supports better decisions."
      intro="Share your current reporting setup, team shape, or upcoming compliance needs and we’ll outline a practical starting point."
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="max-w-xl text-[var(--color-muted)]">
            Most engagements begin with a short diagnostic to understand reporting friction, close-cycle pain points, and leadership information gaps.
          </p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-lg border border-[var(--color-line)] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50 p-2">
                  <MapPin className="h-5 w-5 text-slate-800" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--color-ink)]">Email</div>
                  <div className="text-sm text-[var(--color-muted)]">hello@softechfinancials.com</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--color-line)] bg-white p-4">
              <div className="text-sm text-[var(--color-muted)]">Our offices are remote-first. We schedule virtual meetings and on-site visits by arrangement.</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--color-line)] overflow-hidden">
            <iframe
              title="office-location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=0.0%2C51.5%2C0.1%2C51.52&layer=mapnik"
              className="h-48 w-full"
            />
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </SectionWrapper>
  );
}
