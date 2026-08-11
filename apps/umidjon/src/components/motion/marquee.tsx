"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
};

/** Infinite horizontal ticker; the list is duplicated for a seamless loop. */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("marquee-mask flex overflow-hidden", className)}>
      <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.18em] text-muted"
          >
            {item}
            <span className="text-accent" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
