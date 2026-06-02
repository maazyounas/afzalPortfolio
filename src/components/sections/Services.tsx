"use client";

import { Card } from "../ui/Card";
import { SectionWrapper } from "../ui/SectionWrapper";
import { motion } from "@/lib/motion";
import { IService } from "@/models/Service";

interface ServicesProps {
  services: Pick<IService, "slug" | "name" | "description">[];
}

/* ----------------------------- Animation Set ----------------------------- */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // smoother “soft spring”
    },
  },
};

export function Services({ services }: ServicesProps) {
  return (
    <SectionWrapper
      id="services"
      eyebrow="Services"
      title="Support across forecasting, controls, reporting, and compliance."
      intro="Designed as modular service lines so clients can engage where the pressure is highest."
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="
          grid gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {services?.length > 0 ? (
          services.map((service) => (
            <motion.div
              key={service.slug}
              variants={item}
              whileHover={{
                scale: 1.03,
                y: -6,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="group relative h-full flex flex-col"
            >
              {/* Glow Background */}
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Card */}
              <div className="relative flex-1 flex flex-col h-full">
                <Card
                  title={service.name}
                  description={service.description}
                  href={`/services/${encodeURIComponent(service.slug)}`}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              col-span-full
              flex flex-col items-center justify-center
              rounded-2xl border border-[var(--color-line)]
              bg-white/60 p-10 text-center
              text-sm text-[var(--color-muted)]
            "
          >
            <div className="mb-2 text-lg font-semibold text-[var(--color-ink)]">
              No services available
            </div>
            <p>Please check back later or contact support for updates.</p>
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}
