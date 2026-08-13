"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  /** Seconds for one full pass. Lower is faster. */
  duration?: number;
};

/**
 * Infinite ticker. The list is rendered twice and the track slides exactly
 * -50%, so the seam lands where the second copy begins and the loop is
 * invisible.
 */
export function Marquee({ items, className, duration = 42 }: MarqueeProps) {
  return (
    <div
      className={cn("marquee-mask min-w-0 flex-1 overflow-hidden", className)}
    >
      <div
        className="marquee-track flex w-max shrink-0 items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            {item}
            <span className="text-accent/70" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
