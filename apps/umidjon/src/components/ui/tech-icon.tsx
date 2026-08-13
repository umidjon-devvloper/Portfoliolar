import * as icons from "simple-icons";
import { cn } from "@/lib/utils";

type SimpleIcon = { title: string; path: string; hex: string };

function lookup(slug: string): SimpleIcon | null {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const found = (icons as unknown as Record<string, SimpleIcon | undefined>)[key];
  return found ?? null;
}

export function TechIcon({
  slug,
  fallback,
  className,
  colored = false,
}: {
  slug: string | null;
  fallback: string;
  className?: string;
  colored?: boolean;
}) {
  const icon = slug ? lookup(slug) : null;

  if (!icon) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid place-items-center rounded-md border border-border font-mono text-[0.625rem] font-semibold text-muted",
          className,
        )}
      >
        {fallback.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className={className}
      fill={colored ? `#${icon.hex}` : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
