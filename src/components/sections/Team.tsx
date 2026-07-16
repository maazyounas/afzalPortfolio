"use client";

import { useRef } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ExternalLink,
  Quote,
  Share2,
} from "lucide-react";

import { motion, useInView } from "@/lib/motion";
import { teamMembers as staticMembers } from "@/lib/data/team";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ITeamMember } from "@/models/TeamMember";
import Image from "next/image";
import type { TeamMember } from "@/types";

export interface TeamProps {
  members?: (ITeamMember | TeamMember)[];
}

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

export function Team({ members = [] }: TeamProps) {
  const displayMembers = members.length > 0 ? members : staticMembers;

  return (
    <SectionWrapper
      id="team"
      eyebrow="Team"
      title="Senior specialists who stay close to the work."
      intro="Our model keeps experienced operators involved in both strategic direction and hands-on implementation."
      centered
    >
      <div className="hidden sm:block">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {displayMembers.map((member, index) => (
            <TeamCard key={member.slug || index} member={member} />
          ))}
        </motion.div>
      </div>

      <div className="relative sm:hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-linear-to-l from-white to-transparent" />

        <div
          className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {displayMembers.map((member, index) => (
            <motion.div
              key={member.slug || index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-[320px] shrink-0"
            >
              <TeamCard member={member} isMobile />
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-1">
          {displayMembers.map((_, idx) => (
            <div
              key={idx}
              className="h-1.5 w-1.5 rounded-full bg-(--color-muted)/30 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function TeamCard({
  member,
  isMobile = false,
}: {
  member: ITeamMember | TeamMember;
  isMobile?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null!);
  const isInView = useInView(cardRef as unknown as React.RefObject<Element>, {
    once: true,
    margin: "-50px",
  });

  const socialLinks = member.socialLinks || {};
  const hasImage = !!member.image;

  return (
    <motion.article
      ref={cardRef}
      variants={!isMobile ? item : undefined}
      initial={!isMobile ? undefined : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="
        group relative h-full overflow-hidden rounded-2xl
        border border-(--color-line)
        bg-linear-to-br from-white to-gray-50/50
        p-6 shadow-md
        backdrop-blur-sm
        transition-all duration-300
        hover:border-(--color-accent-light)
        hover:shadow-2xl
      "
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-(--color-accent-light) via-(--color-accent) to-(--color-accent-light) opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-(--color-accent)" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              {hasImage ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={member.image!}
                    alt={member.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-emerald-500 p-1">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  </div>
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-(--color-accent-light) via-(--color-accent) to-(--color-accent-strong) text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  {initials(member.name)}
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-emerald-500 p-1">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="inline-flex items-center gap-1 rounded-full border border-(--color-line) bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-(--color-accent) shadow-sm backdrop-blur-sm">
                <BriefcaseBusiness className="h-3 w-3" />
                {member.role}
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-(--color-ink) transition-colors group-hover:text-(--color-accent)">
                {member.name}
              </h3>
            </div>
          </div>

          {(socialLinks.linkedin || socialLinks.twitter) && (
            <div className="flex gap-1">
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-(--color-muted) transition-all hover:bg-(--color-accent-light) hover:text-(--color-accent)"
                  aria-label="LinkedIn"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-(--color-muted) transition-all hover:bg-(--color-accent-light) hover:text-(--color-accent)"
                  aria-label="Twitter"
                >
                  <Share2 className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-4">
        <Quote className="h-6 w-6 text-(--color-accent-light) opacity-50" />
      </div>

      <p className="relative z-10 mt-2 line-clamp-3 text-sm leading-relaxed text-(--color-muted)">
        {member.bio}
      </p>

      {member.specialties?.length ? (
        <div className="relative z-10 mt-5">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-(--color-muted)">
              Expertise
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {member.specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="
                  inline-flex items-center gap-1.5 rounded-full
                  border border-(--color-line)
                  bg-white/80
                  px-3 py-1.5 text-xs font-medium
                  text-(--color-ink)
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:border-(--color-accent-light)
                  hover:bg-white
                  hover:shadow-sm
                "
              >
                <BadgeCheck className="h-3 w-3 text-(--color-accent)" />
                {specialty}
              </span>
            ))}
            {member.specialties.length > 3 && (
              <span className="inline-flex items-center rounded-full border border-(--color-line) bg-white/80 px-3 py-1.5 text-xs font-medium text-(--color-muted)">
                +{member.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>
      ) : null}

      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-(--color-accent-light) opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
    </motion.article>
  );
}
