"use client";

import { Card } from "../ui/Card";
import { SectionWrapper } from "../ui/SectionWrapper";
import { motion } from "@/lib/motion";
import { IService } from "@/models/Service";

interface ServicesProps {
  services: Pick<IService, "slug" | "name" | "description">[];
}

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
    y: 18,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
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
      {/* Grid Container */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {services?.length > 0 ? (
          services.map((service) => (
            <motion.div
              key={service.slug}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
            className="col-span-full text-center text-sm text-(--color-muted)"
          >
            No services available at the moment.
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}
