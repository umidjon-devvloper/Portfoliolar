"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One IntersectionObserver per element, no scroll listeners and no work
 * between intersections. Replaces the framer-motion viewport hooks, which
 * ran a shared scroll loop on every frame.
 */
export function useInView<T extends HTMLElement>(margin = "-10% 0px -10% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { rootMargin: margin, threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView };
}
