import { cn } from "@/lib/utils";

/** Text mark. TODO: swap for a drawn logo once one exists. */
export function LogoMark({
  className,
  label = "Diyorbek",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "grid shrink-0 place-items-center text-[1.5rem] font-extrabold leading-none tracking-tight",
        className,
      )}
    >
      <span>
        D
        <span className="text-accent">.</span>
      </span>
    </span>
  );
}
