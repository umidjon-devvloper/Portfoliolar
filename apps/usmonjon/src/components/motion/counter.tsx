"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/use-in-view";

export function Counter({
  value,
  suffix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  /* Starts at the final value so the number is in the HTML itself,
     not only once the count-up has run. */
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - progress, 3)) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
