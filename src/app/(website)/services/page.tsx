import type { Metadata } from "next";
import { motion } from "@/lib/motion";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getServices } from "@/actions/services";
import type { IService } from "@/models/Service";
import {
  ShieldCheck,
  LineChart,
  Calculator,
  BriefcaseBusiness,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Softech Financials service lines across advisory, tax, reporting, and compliance.",
};

const highlights = [
  {
    icon: LineChart,
    title: "Strategic Forecasting",
    text: "Real-time reporting and decision-ready dashboards.",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Compliance",
    text: "Reliable controls and audit-ready documentation.",
  },
  {
    icon: Calculator,
    title: "Tax Planning",
    text: "Structured tax strategies aligned with growth.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Operational Finance",
    text: "Systems that scale with leadership and teams.",
  },
];

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
      <Breadcrumb items={[{ label: "Services", href: "/services" }]} />

      {/* Hero Highlight Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative mt-8 overflow-hidden rounded-[2.5rem] border border-(--color-line) bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 lg:p-10"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.10),_transparent_35%)]" />

        <div className="relative">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <div
                  key={highlight.title}
                  className="group rounded-3xl border border-(--color-line) bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 text-(--color-accent)">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-(--color-ink)">
                    {highlight.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-(--color-muted)">
                    {highlight.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {services?.length > 0 ? (
          services.map((service: IService) => (
            <motion.div
              key={service.slug}
              variants={item}
              whileHover={{
                y: -8,
                scale: 1.01,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
            >
              <Card
                title={service.name}
                description={service.description}
                href={`/services/${service.slug}`}
              />
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
      </motion.div>
    </SectionWrapper>
  );
}