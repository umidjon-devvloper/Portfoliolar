import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  title,
  subtitle,
  className,
}: {
  index?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {index ? (
        <span className="text-sm font-medium tracking-[0.3em] text-accent">
          {index}
        </span>
      ) : null}
      <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight sm:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-xl text-balance text-base text-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
