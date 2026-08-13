import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** `bleed` skips the container so a child can run edge to edge. */
  bleed?: boolean;
};

export function Section({ children, id, className, bleed }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 sm:py-32 lg:py-40", className)}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

/**
 * Two-column shell: a label that stays pinned while the content column
 * scrolls past it. The pinning is what gives the page its rhythm — it
 * tells you which part of the site you're inside without a sticky nav.
 */
export function LabelledSection({
  label,
  children,
  id,
  className,
}: {
  label: string;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <Section id={id} className={className}>
      <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16 xl:grid-cols-[14rem_1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="label flex items-center gap-3">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {label}
          </span>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </Section>
  );
}
