"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Mail,
  Sparkles,
  Star,
  Quote,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

import { motion, useInView } from "@/lib/motion";
import { teamMembers as staticMembers } from "@/lib/data/team";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ITeamMember } from "@/models/TeamMember";
import { useRef } from "react";
import Image from "next/image";

interface TeamProps {
  members?: ITeamMember[];
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
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Fallback to static members if DB has none, so the site doesn't look blank
  const displayMembers = members.length > 0 ? members : staticMembers;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SectionWrapper
      id="team"
      eyebrow="Team"
      title="Senior specialists who stay close to the work."
      intro="Our model keeps experienced operators involved in both strategic direction and hands-on implementation."
      centered
    >
      {/* Desktop Grid View */}
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

      {/* Mobile Horizontal Scroll View */}
      <div className="relative sm:hidden">
        {/* Gradient Overlays for scroll indication */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent" />

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label="Scroll left"
        >
          <ArrowRight className="h-4 w-4 rotate-180 text-(--color-accent)" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-4 w-4 text-(--color-accent)" />
        </button>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 pb-6 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
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

        {/* Scroll Indicator */}
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

// Separate Team Card Component for better organization
function TeamCard({ member, isMobile = false }: { member: ITeamMember; isMobile?: boolean }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Get social links
  const socialLinks = member.socialLinks || {};
  
  // Determine if we should show image or initials
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
        bg-gradient-to-br from-white to-gray-50/50
        p-6 shadow-md
        backdrop-blur-sm
        transition-all duration-300
        hover:border-(--color-accent-light)
        hover:shadow-2xl
      "
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-(--color-accent-light) via-(--color-accent) to-(--color-accent-light) opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-(--color-accent)" />
      </div>

      {/* Card Header with Avatar */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Enhanced Avatar / Image */}
            <div className="relative">
              {hasImage ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={member.image!}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-emerald-500 p-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-(--color-accent-light) via-(--color-accent) to-(--color-accent-strong) text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  {initials(member.name)}
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-emerald-500 p-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div>
              <div className="inline-flex items-center gap-1 rounded-full border border-(--color-line) bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-(--color-accent) shadow-sm backdrop-blur-sm">
                <BriefcaseBusiness className="h-3 w-3" />
                {member.role}
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-(--color-ink) group-hover:text-(--color-accent) transition-colors">
                {member.name}
              </h3>
            </div>
          </div>

          {/* Social Icons */}
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
                  <FaLinkedin className="h-4 w-4" />
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
                  <FaTwitter className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quote Icon */}
      <div className="relative z-10 mt-4">
        <Quote className="h-6 w-6 text-(--color-accent-light) opacity-50" />
      </div>

      {/* Bio */}
      <p className="relative z-10 mt-2 text-sm leading-relaxed text-(--color-muted) line-clamp-3">
        {member.bio}
      </p>

      {/* Specialties Section */}
      {member.specialties?.length ? (
        <div className="relative z-10 mt-5">
          <div className="mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-(--color-accent)" />
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

      

      {/* Experience Level Indicator */}
      <div className="relative z-10 mt-5 flex items-center gap-2">
        <div className="flex flex-1 gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-3 w-3 fill-(--color-accent-light) text-(--color-accent-light)"
            />
          ))}
        </div>
        <span className="text-[10px] font-medium text-(--color-muted)">
          Senior Level
        </span>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-gradient-to-r from-(--color-accent-light) to-(--color-accent) transition-all duration-500 group-hover:w-full" />

      {/* Card Decorative Elements */}
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-(--color-accent-light) opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
    </motion.article>
  );
}