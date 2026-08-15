import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The shell already reserves the sidebar, so pages run to the available
 * width rather than sitting in a narrow centred column.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full px-5 sm:px-7 xl:px-10", className)}>{children}</div>
  );
}
