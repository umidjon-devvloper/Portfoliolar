import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-5", className)}>
      <div className="flex flex-col gap-2.5">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="type-section text-balance">{title}</h2>
        {description ? (
          <p className="max-w-2xl leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/** Page-level heading: `My <accent>Work</accent>.` */
export function PageHeading({
  lead,
  accent,
  suffix = ".",
}: {
  lead: string;
  accent: string;
  suffix?: string;
}) {
  return (
    <h1 className="type-page text-balance">
      {lead} <span className="text-accent">{accent}</span>
      {suffix}
    </h1>
  );
}
