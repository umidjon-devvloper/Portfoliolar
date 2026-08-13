import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <h2 className="font-display type-display text-balance">{title}</h2>
      {subtitle ? (
        <p className="type-lead max-w-2xl text-balance leading-relaxed text-muted">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
