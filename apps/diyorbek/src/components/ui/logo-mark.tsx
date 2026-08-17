import { cn } from "@/lib/utils";

/** Text mark until a drawn logo exists. TODO: swap for the real file. */
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
        "grid shrink-0 place-items-center font-extrabold leading-none tracking-tight",
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
