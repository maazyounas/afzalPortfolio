"use client";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { motion } from "@/lib/motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ContactForm } from "@/components/ui/ContactForm";

type ContactProps = {
  email?: string;
  phone?: string;
  mapLocation?: string;
};

const getInfoCards = (email?: string, phone?: string) => [
  {
    icon: Mail,
    title: "Email",
    value: email || "hello@softechfinancials.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: phone || "+92 300 1234567",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Contact({ email, phone, mapLocation }: ContactProps) {
  const infoCards = getInfoCards(email, phone);
  const defaultMapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=0.0%2C51.5%2C0.1%2C51.52&layer=mapnik";
  const googleMapUrl = mapLocation 
    ? `https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed` 
    : defaultMapUrl;

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Get Started"
      title="Let us build a finance function that supports better decisions."
      intro="Share your reporting setup, team structure, or compliance goals and we'll outline a practical path forward."
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10"
      >
        <motion.div variants={item} className="relative">
          <div className="rounded-4xl border border-(--color-line) bg-white/80 p-6 shadow-sm backdrop-blur-xl sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-accent-light)">
                <MapPin className="h-5 w-5 text-(--color-accent-strong)" />
              </div>

              <div>
                <p className="text-sm font-semibold text-(--color-ink)">
                  Remote-first consulting
                </p>

                <p className="text-sm text-(--color-muted)">
                  Worldwide collaboration & strategic advisory
                </p>
              </div>
            </div>

            <p className="mt-6 leading-8 text-(--color-muted)">
              Most engagements begin with a focused diagnostic to identify
              reporting friction, close-cycle bottlenecks, and operational blind
              spots affecting leadership decisions.
            </p>
          </div>

          <motion.div variants={container} className="mt-6 grid gap-4">
            {infoCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={item}
                  className="group flex items-center rounded-[1.6rem] border border-(--color-line) bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent-light) hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-(--color-accent-light) to-white">
                      <Icon className="h-5 w-5 text-(--color-accent-strong)" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-(--color-ink)">
                        {card.title}
                      </p>

                      <p className="mt-1 break-all text-sm text-(--color-muted)">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="relative">
          <div className="absolute inset-0 rounded-4xl bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.10),transparent_35%)]" />

          <div className="relative rounded-4xl border border-(--color-line) bg-white/85 p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
                Contact Form
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-(--color-ink)">
                Start the conversation
              </h3>

              <p className="mt-2 text-sm leading-7 text-(--color-muted)">
                Tell us about your business goals and we&apos;ll recommend the best
                next steps.
              </p>
            </div>

            <ContactForm />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 overflow-hidden rounded-4xl border border-(--color-line) bg-white shadow-sm"
      >
        <div className="border-b border-(--color-line) px-5 py-5 sm:px-6">
          <p className="text-sm font-semibold text-(--color-ink)">
            Office & Meetings
          </p>

          <p className="mt-1 text-sm leading-7 text-(--color-muted)">
            We operate as a remote-first consultancy and schedule virtual or
            on-site meetings based on client requirements.
          </p>
        </div>

        <iframe
          title="office-location"
          src={googleMapUrl}
          className="h-64 w-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </motion.div>
    </SectionWrapper>
  );
}
