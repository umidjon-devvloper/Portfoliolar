import type { ReactNode } from "react";
import { Breadcrumb } from "./breadcrumb";
import { cn } from "@/lib/utils";

/**
 * Shared page opener: breadcrumb, bracketed index, two-tone heading and
 * a lede. `caret` appends the terminal-style underscore used on Work.
 */
export function PageHeader({
  breadcrumb,
  index,
  lead,
  accent,
  suffix = ".",
  description,
  caret = false,
  visual,
  className,
}: {
  breadcrumb: string;
  index?: string;
  lead: string;
  accent: string;
  suffix?: string;
  description?: string;
  caret?: boolean;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-10",
        className,
      )}
    >
      <div className="flex flex-col">
        <Breadcrumb current={breadcrumb} />

        {index ? (
          <span className="mt-5 font-mono text-xs tracking-[0.2em] text-accent">
            [ {index} ]
          </span>
        ) : null}

        <h1 className="type-page mt-3">
          {lead} <span className="text-accent">{accent}</span>
          {caret ? (
            <span className="ml-1 inline-block h-[0.62em] w-[0.34em] translate-y-[0.04em] bg-accent align-baseline" />
          ) : (
            suffix
          )}
        </h1>

        {description ? (
          <>
            <p className="mt-5 max-w-[34ch] text-sm leading-[1.7] text-muted sm:text-[0.9375rem]">
              {description}
            </p>
            <span className="mt-6 h-[3px] w-16 rounded-full bg-accent" aria-hidden />
          </>
        ) : null}
      </div>

      {visual ? (
        <div className="hidden h-[17rem] w-full justify-self-center lg:block lg:max-w-[34rem]">
          {visual}
        </div>
      ) : null}
    </div>
  );
}
