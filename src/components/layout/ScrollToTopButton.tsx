"use client";

import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group flex items-center gap-2 rounded-full bg-(--color-accent-light) px-4 py-2 text-xs font-medium text-(--color-accent) transition-all hover:bg-(--color-accent) hover:text-white"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
      Back to Top
    </button>
  );
}
