"use client";

import {
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import { motion, useInView } from "@/lib/motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useRef } from "react";

const steps = [
  {
    title: "Discovery & Analysis",
    description:
      "We identify reporting gaps, operational friction, and financial blind spots affecting leadership decisions.",
    icon: BarChart3,
    gradient: "from-emerald-50 to-cyan-50",
    color: "emerald",
    duration: "2-3 weeks",
  },
  {
    title: "Strategy & Architecture",
    description:
      "We design scalable finance systems, workflows, and governance structures with clear milestones.",
    icon: LayoutDashboard,
    gradient: "from-blue-50 to-indigo-50",
    color: "blue",
    duration: "3-4 weeks",
  },
  {
    title: "Implementation & Growth",
    description:
      "We deploy practical tools, dashboards, and reporting processes your teams can sustain long-term.",
    icon: CheckCircle2,
    gradient: "from-purple-50 to-pink-50",
    color: "purple",
    duration: "4-6 weeks",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
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
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Process() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper
      eyebrow="Process"
      title="A delivery system designed for clarity, speed, and momentum."
      intro="We focus on lean execution, transparent collaboration, and measurable outcomes instead of bloated transformation programs."
      centered
    >
      {/* Desktop Grid View */}
      <div ref={sectionRef} className="hidden sm:block">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {steps.map((step, index) => (
            <ProcessCard key={step.title} step={step} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Mobile Horizontal Scroll View */}
      <div className="relative sm:hidden">
        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label="Scroll left"
        >
          <ArrowRight className="h-5 w-5 rotate-180 text-(--color-accent)" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-5 w-5 text-(--color-accent)" />
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
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-[300px] shrink-0"
            >
              <ProcessCard step={step} index={index} isMobile />
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollRef.current) {
                  const scrollAmount = idx * 320;
                  scrollRef.current.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                  });
                }
              }}
              className="transition-all duration-300"
            >
              <div className="h-2 w-2 rounded-full bg-(--color-muted)/30 hover:bg-(--color-accent) transition-colors" />
            </button>
          ))}
        </div>

        {/* Swipe Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Zap className="h-3 w-3 text-(--color-accent)" />
          <span className="text-xs text-(--color-muted)">Swipe to explore steps</span>
        </div>
      </div>
    </SectionWrapper>
  );
}

// Separate Process Card Component
function ProcessCard({ step, index, isMobile = false }: { step: typeof steps[0]; index: number; isMobile?: boolean }) {
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef as unknown as React.RefObject<Element>, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      variants={!isMobile ? item : undefined}
      initial={!isMobile ? undefined : { opacity: 0, y: 30 }}
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

      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between">
        {/* Icon with Gradient */}
        <div className="relative">
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="h-6 w-6 text-(--color-accent-strong)" />
          </div>
          
          {/* Pulse effect on hover */}
          <div className="absolute inset-0 rounded-xl bg-(--color-accent-light) opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
        </div>

        {/* Step Number Badge */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line) bg-white/80 text-sm font-bold text-(--color-ink) shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-(--color-accent-light) group-hover:text-(--color-accent)">
            0{index + 1}
          </div>
          
          {/* Duration Badge */}
          {step.duration && (
            <div className="text-[10px] font-medium text-(--color-accent) opacity-0 transition-opacity group-hover:opacity-100">
              {step.duration}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-6">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-(--color-accent)" />
          <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent)">
            Step {index + 1}
          </p>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-(--color-ink) group-hover:text-(--color-accent) transition-colors">
          {step.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-(--color-muted)">
          {step.description}
        </p>
      </div>

      {/* Key Features for each step */}
      <div className="relative z-10 mt-5">
        <div className="flex flex-wrap gap-2">
          {index === 0 && (
            <>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                Assessment
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                Gap Analysis
              </span>
            </>
          )}
          {index === 1 && (
            <>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700">
                Architecture
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700">
                Roadmap
              </span>
            </>
          )}
          {index === 2 && (
            <>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-[10px] font-medium text-purple-700">
                Deployment
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-[10px] font-medium text-purple-700">
                Training
              </span>
            </>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="relative z-10 mt-6">
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-(--color-line)">
            <div 
              className="h-full rounded-full bg-(--color-accent) transition-all duration-500 group-hover:w-full"
              style={{ width: `${(index + 1) * 33}%` }}
            />
          </div>
          <TrendingUp className="h-3 w-3 text-(--color-accent) opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>


      {/* Card Decorative Elements */}
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-(--color-accent-light) opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
    </motion.div>
  );
}