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
        "inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
