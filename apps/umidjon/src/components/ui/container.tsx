import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wide by default — this layout leans on full-bleed rows rather than a
 * narrow centred column, so the container mostly manages gutters.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[88rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
