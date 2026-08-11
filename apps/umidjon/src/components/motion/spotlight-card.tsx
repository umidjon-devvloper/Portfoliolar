"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps content in a card that tracks the cursor and renders a soft
 * accent highlight underneath it (see `.spotlight` in globals.css).
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onMouseMove={handleMove}
      className={cn("spotlight relative isolate overflow-hidden", className)}
    >
      {children}
    </div>
  );
}
