"use client";

import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionDiv: any = motion.div;
import { services } from "@/lib/data/services";

import { Card } from "../ui/Card";
import { SectionWrapper } from "../ui/SectionWrapper";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <SectionWrapper
      eyebrow="Services"
      title="Support across forecasting, controls, reporting, and compliance."
      intro="Designed as modular service lines so clients can engage where the pressure is highest."
    >
      <MotionDiv variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <motion.div key={service.slug} variants={item}>
            <Card
              title={service.name}
              description={service.summary}
              href={`/services/${service.slug}`}
            />
          </motion.div>
        ))}
      </MotionDiv>
    </SectionWrapper>
  );
}
