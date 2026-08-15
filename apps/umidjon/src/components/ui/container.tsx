import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full px-5 sm:px-7 lg:pl-12 lg:pr-8 xl:pl-16 xl:pr-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
