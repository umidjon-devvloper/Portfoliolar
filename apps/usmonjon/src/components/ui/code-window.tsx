"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

export type Token = { text: string; tone: keyof typeof toneClass };
export type CodeLine = Token[];

const toneClass = {
  kw: "text-accent",
  fn: "text-foreground",
  pr: "text-accent/80",
  st: "text-emerald-400/90",
  pn: "text-muted",
} as const;

const CHARS_PER_FRAME = 3;

/**
 * Types itself out when it first scrolls into view, and again on hover.
 * The loop only runs while typing — roughly a second — then stops, so
 * there is nothing ticking in the background.
 *
 * The window itself never moves: hover retypes the code and nothing else.
 * This is the rule for every code window on the site, so it lives here
 * rather than at each call site.
 */
export function CodeWindow({
  lines,
  filename,
  className,
}: {
  lines: CodeLine[];
  filename?: string;
  className?: string;
}) {
  const total = lines.reduce(
    (sum, line) => sum + line.reduce((acc, token) => acc + token.text.length, 0),
    0,
  );

  const { ref, inView } = useInView<HTMLDivElement>("-10% 0px -10% 0px");
  const [typed, setTyped] = useState(0);
  const frame = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const run = useCallback(() => {
    if (reduced.current) {
      setTyped(total);
      return;
    }

    cancelAnimationFrame(frame.current);
    let count = 0;

    const step = () => {
      count = Math.min(count + CHARS_PER_FRAME, total);
      setTyped(count);
      if (count < total) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
  }, [total]);

  useEffect(() => {
    if (inView) run();
    return () => cancelAnimationFrame(frame.current);
  }, [inView, run]);

  let remaining = typed;

  return (
    <div
      ref={ref}
      onMouseEnter={run}
      className={cn(
        "overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        {filename ? (
          <span className="ml-auto font-mono text-[0.625rem] text-muted">
            {filename}
          </span>
        ) : null}
      </div>

      <pre className="overflow-hidden px-4 py-3.5 font-mono text-[0.6875rem] leading-[1.8]">
        <code>
          {lines.map((line, index) => {
            /*
             * Untyped characters are still rendered, just transparent, so
             * the box keeps its full size from the first frame. Revealing
             * text into an empty box made it grow, and because it is
             * vertically centred that growth moved it up the page.
             */
            const caretHere =
              remaining > 0 &&
              remaining <=
                line.reduce((sum, token) => sum + token.text.length, 0);

            return (
              <div key={index} className="flex gap-3">
                <span className="w-2.5 shrink-0 select-none text-right text-muted/40">
                  {index + 1}
                </span>
                <span className="whitespace-pre">
                  {line.map((token, tokenIndex) => {
                    const take = Math.max(
                      0,
                      Math.min(token.text.length, remaining),
                    );
                    remaining -= take;

                    return (
                      <span key={tokenIndex} className={toneClass[token.tone]}>
                        {token.text.slice(0, take)}
                        {take < token.text.length ? (
                          <span className="opacity-0">
                            {token.text.slice(take)}
                          </span>
                        ) : null}
                      </span>
                    );
                  })}
                  {caretHere && typed < total ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -ml-[0.1em] inline-block h-[0.95em] w-[0.4em] translate-y-[0.15em] bg-accent"
                    />
                  ) : null}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
