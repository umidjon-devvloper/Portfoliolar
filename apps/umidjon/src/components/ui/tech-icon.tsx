import * as icons from "simple-icons";
import { cn } from "@/lib/utils";

type SimpleIcon = { title: string; path: string; hex: string };

function lookup(slug: string): SimpleIcon | null {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const found = (icons as unknown as Record<string, SimpleIcon | undefined>)[key];
  return found ?? null;
}

function relativeLuminance(hex: string): number {
  const value = Number.parseInt(hex, 16);
  const r = ((value >> 16) & 255) / 255;
  const g = ((value >> 8) & 255) / 255;
  const b = (value & 255) / 255;
  const channel = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function TechIcon({
  slug,
  fallback,
  className,
}: {
  slug: string | null;
  fallback: string;
  className?: string;
}) {
  const icon = slug ? lookup(slug) : null;

  if (!icon) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid place-items-center rounded font-mono text-[0.5625rem] font-bold text-muted",
          className,
        )}
      >
        {fallback.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  const luminance = relativeLuminance(icon.hex);
  const tooDark = luminance < 0.16;
  const tooLight = luminance > 0.82;

  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className={cn(className, (tooDark || tooLight) && "brand-neutral")}
      style={tooDark || tooLight ? undefined : { fill: `#${icon.hex}` }}
    >
      <path d={icon.path} />
    </svg>
  );
}
