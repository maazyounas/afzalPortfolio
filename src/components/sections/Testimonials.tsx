"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  BadgeCheck,
  Sparkles,
  
} from "lucide-react";

import { motion, useInView } from "@/lib/motion";
import { testimonials as staticTestimonials } from "@/lib/data/testimonials";

export type TestimonialData = {
  _id: string;
  author: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
};

import { SectionWrapper } from "../ui/SectionWrapper";
import Image from "next/image";

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



export function Testimonials({ data = [] }: { data?: TestimonialData[] }) {
  const testimonials = data.length > 0 
    ? data.map(item => ({
        id: item._id,
        name: item.author,
        title: [item.role, item.company].filter(Boolean).join(" at "),
        quote: item.content,
        rating: item.rating,
        image: item.image,
      }))
    : staticTestimonials.map((t, idx) => ({ ...t, id: String(idx) }));
    
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (isHover || testimonials.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHover, testimonials.length]);

  // Scroll to current testimonial
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || testimonials.length === 0) return;

    const child = slider.children[index] as HTMLElement;
    if (!child) return;

    const scrollLeft = child.offsetLeft - (slider.offsetWidth / 2) + (child.offsetWidth / 2);
    slider.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }, [index, testimonials.length]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next
      setIndex((prev) => (prev + 1) % testimonials.length);
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right - previous
      setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
    if (e.key === "ArrowRight") {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <SectionWrapper
      eyebrow="Client Testimonials"
      title="Trusted by growing teams and finance leaders."
      intro="We help organizations improve reporting visibility, operational clarity, and decision-making confidence."
      centered
    >

      {/* Testimonials Carousel */}
      <div
        className="relative"
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

        {/* Desktop Grid View - Hidden on mobile */}
        <div className="hidden lg:block">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Mobile/Tablet Carousel View */}
        <div className="lg:hidden">
          {/* Cards Container */}
          <div
            ref={sliderRef}
            className="relative z-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[85%] flex-shrink-0 snap-center sm:w-[70%] md:w-[60%]"
              >
                <TestimonialCard testimonial={testimonial} isCarousel />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line) bg-white shadow-sm transition-all hover:border-(--color-accent-light) hover:text-(--color-accent) hover:shadow-md"
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
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-(--color-accent)"
                      : "w-2 bg-(--color-muted)/30 hover:bg-(--color-muted)/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line) bg-white shadow-sm transition-all hover:border-(--color-accent-light) hover:text-(--color-accent) hover:shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        
      </div>
    </SectionWrapper>
  );
}

// Separate Testimonial Card Component
function TestimonialCard({ testimonial, isCarousel = false }: { testimonial: TestimonialData; isCarousel?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const hasImage = !!testimonial.image;

  return (
    <motion.blockquote
      ref={cardRef}
      initial={!isCarousel ? { opacity: 0, y: 30 } : undefined}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{
        y: -8,
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

      {/* Quote Icon & Rating */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Quote className="h-5 w-5 text-white" />
        </div>

        <div className="flex items-center gap-0.5">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-amber-400 text-amber-400"
            />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="relative z-10 mt-6 text-sm leading-relaxed text-(--color-muted) line-clamp-4">
        “{testimonial.quote}”
      </p>

      {/* Footer */}
      <div className="relative z-10 mt-6 flex items-center gap-3">
        {/* Avatar/Image */}
        <div className="relative">
          {hasImage ? (
            <div className="relative h-12 w-12 overflow-hidden rounded-xl shadow-md">
              <Image
                src={testimonial.image!}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-(--color-accent-light) via-(--color-accent) to-(--color-accent-strong) text-base font-bold text-white shadow-md">
              {initials(testimonial.name)}
            </div>
          )}
          
          {/* Verified Badge */}
          <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-emerald-500 p-0.5">
            <BadgeCheck className="h-2.5 w-2.5 text-white" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-(--color-ink) group-hover:text-(--color-accent) transition-colors">
              {testimonial.name}
            </p>
            <Sparkles className="h-3 w-3 text-(--color-accent)" />
          </div>
          {testimonial.title && (
            <p className="mt-0.5 text-xs text-(--color-muted)">
              {testimonial.title}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-gradient-to-r from-(--color-accent-light) to-(--color-accent) transition-all duration-500 group-hover:w-full" />

      {/* Card Decorative Elements */}
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-(--color-accent-light) opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
    </motion.blockquote>
  );
}