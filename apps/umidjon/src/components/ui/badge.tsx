import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-muted transition-colors hover:border-accent hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
