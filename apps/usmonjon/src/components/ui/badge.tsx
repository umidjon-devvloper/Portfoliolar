import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "accent" | "live" | "online";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "muted" && "border border-border bg-surface-2 text-muted",
        tone === "accent" && "bg-accent-soft text-accent",
        tone === "live" && "bg-accent-soft text-accent",
        tone === "online" &&
          "bg-emerald-500/10 text-emerald-400 dark:text-emerald-300",
        className,
      )}
    >
      {tone === "live" || tone === "online" ? (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-70",
              tone === "online" ? "bg-emerald-400" : "bg-accent",
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              tone === "online" ? "bg-emerald-400" : "bg-accent",
            )}
          />
        </span>
      ) : null}
      {children}
    </span>
  );
}
