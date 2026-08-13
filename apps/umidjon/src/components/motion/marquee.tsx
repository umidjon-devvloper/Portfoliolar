"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  duration = 18,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn("marquee-mask w-full overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max items-center"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 font-mono text-xs uppercase tracking-[0.18em] text-muted"
          >
            {item}
            <span className="text-accent-2" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
