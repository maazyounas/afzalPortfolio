"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  enter: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

export function Testimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const handleResize = () => {
      // keep visible card aligned
      const child = el.children[index] as HTMLElement | undefined;
      if (child) el.scrollTo({ left: child.offsetLeft - 12, behavior: "smooth" });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [index]);

  useEffect(() => {
    if (isHover) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHover]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - 12, behavior: "smooth" });
  }, [index]);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % testimonials.length);
  };

  return (
    <SectionWrapper
      eyebrow="Client Voice"
      title="Trusted by teams who need sharper financial visibility."
      intro="A few examples of the outcomes clients cite most often after implementation."
    >
      <div
        className="relative"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        tabIndex={0}
        onKeyDown={handleKey}
        aria-label="Testimonials carousel"
      >
        <motion.div
          ref={sliderRef}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:overflow-visible lg:snap-none lg:grid lg:grid-cols-3 lg:gap-6"
        >
          {testimonials.map((t, idx) => (
            <motion.blockquote
              key={t.name}
              custom={idx}
              initial="hidden"
              whileInView="enter"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className="snap-start w-[90%] sm:w-[70%] lg:w-auto rounded-2xl bg-white/60 backdrop-blur-md border border-zinc-100 p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50 text-xl font-semibold text-slate-700 shadow-sm">
                  {initials(t.name)}
                </div>

                <div className="flex-1">
                  <p className="text-lg leading-relaxed text-slate-800">“{t.quote}”</p>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{t.name}</div>
                      <div className="text-xs text-zinc-500">{t.title}</div>
                    </div>
                    <div className="hidden items-center gap-1 sm:flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </motion.div>

        {/* subtle floating gradient */}
        <div className="pointer-events-none absolute -right-24 top-0 -z-10 hidden h-72 w-72 translate-x-1/3 rounded-full bg-gradient-to-br from-sky-50 to-emerald-50 opacity-30 blur-3xl lg:block" />
        {/* controls (mobile) */}
        <div className="absolute left-4 top-1/2 z-20 -translate-y-1/2 lg:hidden">
          <button onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} className="rounded-full bg-white/90 p-2 shadow">
            <ChevronLeft className="h-4 w-4 text-slate-700" />
          </button>
        </div>

        <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2 lg:hidden">
          <button onClick={() => setIndex((i) => (i + 1) % testimonials.length)} className="rounded-full bg-white/90 p-2 shadow">
            <ChevronRight className="h-4 w-4 text-slate-700" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Show testimonial ${i + 1}`} className={`h-2 w-8 rounded-full ${i === index ? "bg-[var(--color-accent)]" : "bg-zinc-200"}`}></button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
