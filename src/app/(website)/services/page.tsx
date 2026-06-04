import type { Metadata } from "next";
import { motion } from "@/lib/motion";
import Link from "next/link";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getServices } from "@/actions/services";
import type { IService } from "@/models/Service";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "@/lib/utils/icons";
import MobileScroller from "@/components/ui/MobileScroller";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | Softech Financials",
  description:
    "Explore Softech Financials service lines across advisory, tax, reporting, and compliance. Tailored solutions for every stage of financial maturity.",
};


const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const highlights = [
  {
    title: "Faster Turnaround",
    text: "Actionable insights delivered with speed and precision.",
    icon: TrendingUp,
    gradient: "from-emerald-400 to-blue-500",
    stat: "Fast",
  },
  {
    title: "Trusted Expertise",
    text: "A proven team with compliance-first financial strategy.",
    icon: Award,
    gradient: "from-violet-500 to-pink-500",
    stat: "Trusted",
  },
  {
    title: "Reliable Delivery",
    text: "Clear timelines, dependable execution, and consistent results.",
    icon: Clock,
    gradient: "from-sky-500 to-cyan-500",
    stat: "Reliable",
  },
  {
    title: "Smooth Transitions",
    text: "Seamless onboarding and continuous support for every client.",
    icon: ChevronRight,
    gradient: "from-orange-400 to-amber-500",
    stat: "Seamless",
  },
];

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <SectionWrapper
      id="services"
      eyebrow="Capabilities"
      title="Services tailored to each stage of financial maturity."
      intro="Each engagement is structured around measurable reporting improvements, stronger controls, and sharper executive visibility."
    >
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={[{ label: "Services", href: "/services" }]} />
      </div>

      {/* Hero Highlight Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative mt-4 overflow-hidden rounded-[2rem] border border-(--color-line) bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 lg:p-10"
      >

        <div className="relative">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((highlight, idx) => {
              const Icon = highlight.icon;

              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative rounded-2xl border border-(--color-line) bg-white/70 p-5 transition-all duration-300 hover:shadow-xl"
                >

                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${highlight.gradient} text-(--color-accent)`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-(--color-ink)">
                      {highlight.title}
                    </h3>
                    {highlight.stat && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-(--color-accent)">
                        {highlight.stat}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-(--color-muted)">
                    {highlight.text}
                  </p>

                  <div className="mt-4 h-0.5 w-8 rounded-full bg-(--color-accent-light) transition-all duration-300 group-hover:w-12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Services Section Title */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-(--color-ink) sm:text-3xl">
            Our Service Offerings
          </h2>
          <p className="mt-2 text-(--color-muted)">
            Comprehensive solutions designed for modern financial challenges
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-(--color-muted) sm:hidden">
          <span>Swipe to explore</span>
          <ChevronRight className="h-3 w-3 animate-pulse" />
        </div>
      </motion.div>

      {/* Services Grid with Horizontal Scroll on Mobile */}
      <div className="mt-6">
        {/* Mobile Horizontal Scroll View */}
        <div className="sm:hidden">
          {services?.length > 0 ? (
            <MobileScroller>
              {services.map((service: IService, index: number) => (
                <Link href={`/services/${service.slug}`} key={service.slug}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-[280px] shrink-0"
                  >
                    <div className="group relative">
                      <div className="absolute -bottom-2 -right-2 h-full w-full rounded-2xl bg-(--color-accent-light)/20 transition-all duration-300 group-hover:-bottom-3 group-hover:-right-3" />
                      <div className="absolute -bottom-1 -right-1 h-full w-full rounded-2xl bg-(--color-accent-light)/10 transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2" />
                      
                      <div className="relative rounded-2xl border border-(--color-line) bg-white p-5 shadow-md transition-all duration-300 group-hover:shadow-xl">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="rounded-xl bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) p-2.5">
                            <ServiceIcon name={service.icon} className="h-4 w-4 text-white" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-(--color-muted) transition-transform duration-300 group-hover:translate-x-1 group-hover:text-(--color-accent)" />
                        </div>

                        <h3 className="text-lg font-semibold text-(--color-ink)">
                          {service.name}
                        </h3>
                        
                        <p className="mt-2 text-sm leading-relaxed text-(--color-muted) line-clamp-3">
                          {service.description}
                        </p>

                        <div className="mt-4 flex items-center gap-2 pt-3">
                          <div className="h-px flex-1 bg-(--color-line)" />
                          <span className="text-[10px] font-medium uppercase tracking-wider text-(--color-accent)">
                            Learn More
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </MobileScroller>
          ) : (
            <div className="w-[calc(100vw-2rem)] rounded-2xl border border-dashed border-(--color-line) bg-white/70 px-6 py-14 text-center">
              <h3 className="text-lg font-semibold text-(--color-ink)">
                No services available
              </h3>
              <p className="mt-2 text-sm text-(--color-muted)">
                Service offerings will appear here once they are published.
              </p>
            </div>
          )}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.length > 0 ? (
            services.map((service: IService) => (
              <motion.div
                key={service.slug}
                variants={item}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
              >
                <div className="group relative h-full">
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-(--color-accent-light) to-(--color-accent) opacity-0 blur transition duration-500 group-hover:opacity-20" />
                  <Card
                    title={service.name}
                    description={service.description}
                    href={`/services/${service.slug}`}
                    icon={service.icon}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full rounded-3xl border border-dashed border-(--color-line) bg-white/70 px-6 py-14 text-center shadow-sm"
            >
              <h3 className="text-lg font-semibold text-(--color-ink)">
                No services available
              </h3>
              <p className="mt-2 text-sm text-(--color-muted)">
                Service offerings will appear here once they are published.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Trust Indicators Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 rounded-2xl border border-(--color-line) bg-gradient-to-br from-(--color-accent-light)/5 to-transparent p-6 sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <div className="font-semibold text-(--color-ink)">500+</div>
              <div className="text-xs text-(--color-muted)">Clients Served</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Award className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-(--color-ink)">15+ Years</div>
              <div className="text-xs text-(--color-muted)">Industry Experience</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-100 p-2">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-(--color-ink)">24/7 Support</div>
              <div className="text-xs text-(--color-muted)">Dedicated Assistance</div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
