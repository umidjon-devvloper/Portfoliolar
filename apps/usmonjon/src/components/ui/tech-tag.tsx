import { TechIcon } from "./tech-icon";
import { cn } from "@/lib/utils";

export function TechTag({
  name,
  icon,
  className,
}: {
  name: string;
  icon?: string | null;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted",
        className,
      )}
    >
      {icon !== undefined ? (
        <TechIcon slug={icon} fallback={name} className="h-3 w-3" />
      ) : null}
      {name}
    </span>
  );
}
