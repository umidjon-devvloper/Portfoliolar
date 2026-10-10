import clsx from "clsx";
import { profile } from "@/content/profile";

/* A key-shaped mark: initials in a frame whose amber corner reads as a
   lock notch. Stands in for the portrait until one is supplied. */
export function Monogram({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span
      aria-hidden
      className={clsx(
        "relative inline-grid place-items-center border border-seam bg-hull font-display font-semibold tracking-tight text-frost",
        size === "sm" ? "size-9 text-[0.8rem]" : "size-28 text-3xl",
      )}
    >
      {profile.initials}
      <span
        className={clsx(
          "absolute right-0 top-0 bg-signal",
          size === "sm" ? "size-2" : "size-4",
        )}
      />
    </span>
  );
}
