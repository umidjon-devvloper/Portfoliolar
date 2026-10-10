import Image from "next/image";
import type { ReactNode } from "react";
import { pageVisuals } from "@/content/page-visuals";

/**
 * Renders the uploaded illustration when there is one, otherwise the
 * drawn fallback passed in.
 */
export function PageVisual({
  page,
  alt,
  fallback,
}: {
  page: keyof typeof pageVisuals;
  alt: string;
  fallback: ReactNode;
}) {
  const src = pageVisuals[page];

  if (!src) return <>{fallback}</>;

  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 30rem, 0px"
        className="object-contain object-center"
      />
    </div>
  );
}
