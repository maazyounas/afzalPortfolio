"use client";

import {
  
  BadgeCheck,
  BriefcaseBusiness,
} from "lucide-react";

import { motion } from "@/lib/motion";
import { teamMembers } from "@/lib/data/team";
import { SectionWrapper } from "../ui/SectionWrapper";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Team() {
  return (
    <SectionWrapper
      id="team"
      eyebrow="Team"
      title="Senior specialists who stay close to the work."
      intro="Our model keeps experienced operators involved in both strategic direction and hands-on implementation."
      centered
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {teamMembers.map((member) => (
          <motion.article
            key={member.slug}
            variants={item}
            whileHover={{
              y: -8,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 18,
            }}
            className="
              group relative overflow-hidden rounded-[2rem]
              border border-[var(--color-line)]
              bg-white/85
              p-6 shadow-sm
              backdrop-blur-xl
              transition-all duration-300
              hover:border-[var(--color-accent-light)]
              hover:shadow-2xl
            "
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top Section */}
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-accent-light)] via-white to-slate-100 text-lg font-bold text-[var(--color-accent-strong)] shadow-md">
                  {initials(member.name)}

                  <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>

                {/* Name & Role */}
                <div>
                  <div className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-sand)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    <BriefcaseBusiness className="h-3 w-3" />
                    {member.role}
                  </div>

                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                    {member.name}
                  </h3>
                </div>
              </div>

             
            </div>

            {/* Bio */}
            <p className="relative z-10 mt-6 text-[15px] leading-8 text-[var(--color-muted)]">
              {member.bio}
            </p>

            {/* Specialties */}
            {member.specialties?.length ? (
              <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                {member.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="
                      inline-flex items-center gap-1.5 rounded-full
                      border border-[var(--color-line)]
                      bg-[var(--color-panel)]
                      px-3 py-1.5 text-xs font-medium
                      text-[var(--color-ink)]
                      transition-all duration-300
                      hover:border-[var(--color-accent-light)]
                      hover:bg-white
                    "
                  >
                    <BadgeCheck className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    {specialty}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}