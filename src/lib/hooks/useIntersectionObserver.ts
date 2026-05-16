"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

export function useIntersectionObserver<T extends Element>(
  target: RefObject<T | null>,
  options?: IntersectionObserverInit,
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!target.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(target.current);

    return () => observer.disconnect();
  }, [options, target]);

  return isIntersecting;
}
