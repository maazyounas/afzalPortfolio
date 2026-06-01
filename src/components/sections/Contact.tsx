"use client";

import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Send,
  CheckCircle,
  Globe,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import { motion, useInView } from "@/lib/motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ContactForm } from "@/components/ui/ContactForm";
import { useRef, useState } from "react";

type ContactProps = {
  email?: string;
  phone?: string;
  mapLocation?: string;
};

const getInfoCards = (email?: string, phone?: string) => [
  {
    icon: Mail,
    title: "Email Us",
    value: email || "hello@softechfinancials.com",
    description: "We'll respond within 24 hours",
    action: "mailto",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: phone || "+92 300 1234567",
    description: "Mon-Fri, 9am-6pm",
    action: "tel",
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
  
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null!);
  const sectionRef = useRef<HTMLDivElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAction = (action: string, value: string) => {
    if (action === "mailto") {
        window.location.assign(`mailto:${value}`);
      } else if (action === "tel") {
        window.location.assign(`tel:${value.replace(/\s/g, '')}`);
      console.log("Open chat");
    }
  };

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Get Started"
      title="Let us build a finance function that supports better decisions."
      intro="Share your reporting setup, team structure, or compliance goals and we'll outline a practical path forward."
    >
      <div ref={sectionRef}>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Left Column - Contact Info */}
          <motion.div variants={item} className="relative">
            {/* Remote-first Card */}
            <div className="relative overflow-hidden rounded-2xl border border-(--color-line) bg-gradient-to-br from-white to-gray-50/50 p-6 shadow-md backdrop-blur-sm sm:p-7">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_40%)]" />
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) shadow-md">
                  <Globe className="h-6 w-6 text-white" />
                </div>

                <div>
                  <p className="text-lg font-semibold text-(--color-ink)">
                    Remote-first consulting
                  </p>
                  <p className="mt-1 text-sm text-(--color-muted)">
                    Worldwide collaboration & strategic advisory
                  </p>
                </div>
              </div>

              <p className="relative z-10 mt-5 text-sm leading-relaxed text-(--color-muted)">
                Most engagements begin with a focused diagnostic to identify
                reporting friction, close-cycle bottlenecks, and operational blind
                spots affecting leadership decisions.
              </p>

              {/* Trust Badge */}
              <div className="relative z-10 mt-4 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-(--color-accent)" />
                <span className="text-xs font-medium text-(--color-accent)">
                  100% Satisfaction Guarantee
                </span>
              </div>
            </div>

            {/* Contact Cards */}
            <motion.div variants={container} className="mt-6 grid gap-4">
              {infoCards.map((card) => {
                const Icon = card.icon;
                const isCopied = copiedField === card.title;

                return (
                  <motion.div
                    key={card.title}
                    variants={item}
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer rounded-xl border border-(--color-line) bg-white p-4 shadow-sm transition-all duration-300 hover:border-(--color-accent-light) hover:shadow-lg"
                    onClick={() => handleAction(card.action, card.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-(--color-accent-light) to-white transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-5 w-5 text-(--color-accent-strong)" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-(--color-ink)">
                            {card.title}
                          </p>
                          <p className="text-sm text-(--color-muted)">
                            {card.value}
                          </p>
                          {card.description && (
                            <p className="mt-0.5 text-xs text-(--color-accent)">
                              {card.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (card.action === "mailto" || card.action === "tel") {
                            handleCopy(card.value, card.title);
                          }
                        }}
                        className="rounded-lg p-2 text-(--color-muted) opacity-0 transition-all hover:bg-(--color-accent-light) group-hover:opacity-100"
                        aria-label="Copy"
                      >
                        {isCopied ? (
                          <CheckCircle className="h-4 w-4 text-(--color-accent)" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={item} className="relative">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.08),transparent_40%)]" />

            <div className="relative rounded-2xl border border-(--color-line) bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-7">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-(--color-accent)" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent)">
                    Contact Form
                  </p>
                </div>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-(--color-ink)">
                  Start the conversation
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">
                  Tell us about your business goals and we&apos;ll recommend the best
                  next steps.
                </p>
              </div>

              <ContactForm />

              {/* Response Time Note */}
              <div className="mt-4 flex items-center justify-center gap-2 border-t border-(--color-line) pt-4">
                <Send className="h-3 w-3 text-(--color-accent)" />
                <span className="text-xs text-(--color-muted)">
                  We typically respond within 2-4 business hours
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10"
        >
          <div className="overflow-hidden rounded-2xl border border-(--color-line) bg-white shadow-md">
            <div className="border-b border-(--color-line) px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--color-ink)">
                    Our Location
                  </p>
                  <p className="mt-0.5 text-xs text-(--color-muted)">
                    Virtual headquarters with global reach
                  </p>
                </div>
                <a
                  href={googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-(--color-accent) transition-all hover:gap-2"
                >
                  View larger map
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden sm:h-80">
              <iframe
                title="office-location"
                src={googleMapUrl}
                className="h-full w-full border-0 transition-transform duration-500 hover:scale-105"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Map Note */}
            <div className="border-t border-(--color-line) bg-gray-50/50 px-5 py-3 sm:px-6">
              <p className="text-center text-xs text-(--color-muted)">
                🌍 Serving clients worldwide with remote-first approach. In-person meetings available upon request.
              </p>
            </div>
          </div>
        </motion.div>

        
      </div>
    </SectionWrapper>
  );
}