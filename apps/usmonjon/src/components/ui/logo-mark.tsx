import { cn } from "@/lib/utils";

/**
 * The shield mark. Drawn as a mask rather than an <img> so it takes the
 * current text colour and stays legible in both themes.
 */
export function LogoMark({
  className,
  label = "Usmonjon",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("logo-mark block shrink-0 bg-current", className)}
    />
  );
}
