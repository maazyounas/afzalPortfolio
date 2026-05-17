"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  BadgeCheck,
} from "lucide-react";

import { motion } from "@/lib/motion";
import { testimonials } from "@/lib/data/testimonials";

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
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
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

export function Testimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  Autoplay                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (isHover) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHover]);

  /* -------------------------------------------------------------------------- */
  /*                                Scroll Logic                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const child = slider.children[index] as HTMLElement | undefined;

    if (!child) return;

    slider.scrollTo({
      left: child.offsetLeft - 16,
      behavior: "smooth",
    });
  }, [index]);

  /* -------------------------------------------------------------------------- */
  /*                                Keyboard Nav                                */
  /* -------------------------------------------------------------------------- */

  const handleKey = (
    e: KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "ArrowLeft") {
      setIndex((prev) =>
        prev === 0
          ? testimonials.length - 1
          : prev - 1
      );
    }

    if (e.key === "ArrowRight") {
      setIndex((prev) =>
        (prev + 1) % testimonials.length
      );
    }
  };

  return (
    <SectionWrapper
      eyebrow="Client Testimonials"
      title="Trusted by growing teams and finance leaders."
      intro="We help organizations improve reporting visibility, operational clarity, and decision-making confidence."
      centered
    >
      <div
        className="relative overflow-x-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onKeyDown={handleKey}
        tabIndex={0}
        aria-label="Testimonials carousel"
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-[rgba(20,184,166,0.08)] blur-3xl" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[rgba(59,130,246,0.06)] blur-3xl" />
        </div>

        {/* Cards */}
        <motion.div
          ref={sliderRef}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="
            relative z-10
            -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-5
            scrollbar-hide
            sm:-mx-6 sm:px-6
            lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0
          "
        >
          {testimonials.map((testimonial) => (
            <motion.blockquote
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{
                y: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
              className="
                group relative w-[92%] flex-shrink-0 snap-center
                overflow-hidden rounded-[2rem]
                border border-[var(--color-line)]
                bg-white/85
                p-6 shadow-sm
                backdrop-blur-xl
                transition-all duration-300
                hover:border-[var(--color-accent-light)]
                hover:shadow-2xl
                sm:w-[78%]
                md:w-[58%]
                lg:w-auto
              "
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Quote Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent-light)] to-white shadow-sm">
                  <Quote className="h-5 w-5 text-[var(--color-accent-strong)]" />
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p className="relative z-10 mt-6 text-[15px] leading-8 text-[var(--color-muted)]">
                “{testimonial.quote}”
              </p>

              {/* Footer */}
              <div className="relative z-10 mt-8 flex items-center gap-4">
                {/* Avatar */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent-light)] via-white to-slate-100 text-sm font-bold text-[var(--color-accent-strong)] shadow-md">
                  {initials(testimonial.name)}

                  <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>

                {/* User */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-[var(--color-ink)]">
                      {testimonial.name}
                    </p>

                    <BadgeCheck className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>

                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {testimonial.title}
                  </p>
                </div>
              </div>

              {/* Accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
            </motion.blockquote>
          ))}
        </motion.div>

        {/* Mobile Navigation */}
        <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
          <button
            onClick={() =>
              setIndex((prev) =>
                prev === 0
                  ? testimonials.length - 1
                  : prev - 1
              )
            }
            className="
              flex h-11 w-11 items-center justify-center rounded-full
              border border-[var(--color-line)]
              bg-white text-[var(--color-ink)]
              shadow-sm transition-all duration-300
              hover:border-[var(--color-accent-light)]
              hover:text-[var(--color-accent)]
              hover:shadow-md
            "
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`
                  h-2.5 rounded-full transition-all duration-300
                  ${
                    i === index
                      ? "w-10 bg-[var(--color-accent)]"
                      : "w-2.5 bg-zinc-300"
                  }
                `}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setIndex((prev) =>
                (prev + 1) % testimonials.length
              )
            }
            className="
              flex h-11 w-11 items-center justify-center rounded-full
              border border-[var(--color-line)]
              bg-white text-[var(--color-ink)]
              shadow-sm transition-all duration-300
              hover:border-[var(--color-accent-light)]
              hover:text-[var(--color-accent)]
              hover:shadow-md
            "
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
