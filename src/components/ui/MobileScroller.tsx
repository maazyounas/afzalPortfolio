"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileScrollerProps {
  children: React.ReactNode[];
  itemClassName?: string;
}

export default function MobileScroller({ children, itemClassName = "w-[85%] flex-shrink-0" }: MobileScrollerProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const child = slider.children[i] as HTMLElement | undefined;
    if (!child) return;
    const left = child.offsetLeft - slider.offsetWidth / 2 + child.offsetWidth / 2;
    slider.scrollTo({ left, behavior: "smooth" });
    setIndex(i);
  };

  useEffect(() => {
    // update index on resize to keep the current centered
    const onResize = () => scrollToIndex(index);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const prev = () => setIndex((p) => { const next = p === 0 ? Math.max(0, children.length - 1) : p - 1; scrollToIndex(next); return next; });
  const next = () => setIndex((p) => { const next = (p + 1) % children.length; scrollToIndex(next); return next; });

  return (
    <div>
      <div
        ref={sliderRef}
        className="relative z-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {React.Children.map(children, (child, i) => (
          <div className={itemClassName} data-index={i}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Scroll left"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line) bg-white shadow-sm transition-all hover:border-(--color-accent-light) hover:text-(--color-accent)"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: children.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-(--color-accent)" : "w-2 bg-(--color-muted)/30 hover:bg-(--color-muted)/50"}`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Scroll right"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line) bg-white shadow-sm transition-all hover:border-(--color-accent-light) hover:text-(--color-accent)"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
