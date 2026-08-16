import { CodeWindow, type CodeLine } from "./code-window";
import { developerSnippet } from "@/content/code-sample";

/**
 * The code window with its backdrop: glow, dot fields, circuit traces
 * with solder points, a wide arc and floating chips. Shared by the pages
 * that open with a code panel.
 */
export function CodeVisual({
  lines = developerSnippet,
  filename,
}: {
  lines?: CodeLine[];
  filename?: string;
} = {}) {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 600 320"
        fill="none"
        aria-hidden
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="cv-glow" cx="50%" cy="48%" r="62%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="cv-arc" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <pattern id="cv-dots" width="11" height="11" patternUnits="userSpaceOnUse">
            <circle cx="1.6" cy="1.6" r="1.3" fill="var(--accent)" opacity="0.55" />
          </pattern>

          <pattern id="cv-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path
              d="M26 0 H0 V26"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              opacity="0.16"
            />
          </pattern>

          <radialGradient id="cv-fade" cx="50%" cy="50%" r="58%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="55%" stopColor="#fff" />
            <stop offset="78%" stopColor="#888" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>

          <mask id="cv-mask">
            <rect width="600" height="320" fill="url(#cv-fade)" />
          </mask>
        </defs>

        <rect width="600" height="320" fill="url(#cv-glow)" />

        <g mask="url(#cv-mask)">
        <rect x="0" y="0" width="600" height="320" fill="url(#cv-grid)" opacity="0.5" />

        <rect x="6" y="12" width="110" height="88" fill="url(#cv-dots)" />
        <rect x="474" y="18" width="120" height="76" fill="url(#cv-dots)" />
        <rect x="18" y="232" width="88" height="66" fill="url(#cv-dots)" opacity="0.8" />
        <rect x="500" y="228" width="94" height="70" fill="url(#cv-dots)" opacity="0.8" />

        <path
          d="M60 258 A 210 210 0 0 1 540 96"
          stroke="url(#cv-arc)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <g stroke="var(--accent)" strokeWidth="1.2" opacity="0.55" fill="none">
          <path d="M8 150 H 62 L 88 176 H 148" strokeLinecap="round" />
          <path d="M8 192 H 46 L 72 218 H 138" strokeLinecap="round" />
          <path d="M8 108 H 74 L 96 130" strokeLinecap="round" />
          <path d="M592 132 H 540 L 516 108 H 462" strokeLinecap="round" />
          <path d="M592 178 H 556 L 532 202 H 470" strokeLinecap="round" />
          <path d="M592 234 H 548 L 528 254" strokeLinecap="round" />
        </g>

        <g fill="var(--accent)" opacity="0.85">
          {[
            [148, 176],
            [138, 218],
            [96, 130],
            [462, 108],
            [470, 202],
            [528, 254],
            [8, 150],
            [8, 192],
            [592, 132],
            [592, 178],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
          ))}
        </g>

        </g>

        <ellipse cx="300" cy="296" rx="180" ry="14" fill="var(--accent)" opacity="0.1" />
      </svg>

      {/* floating chips */}
      <span className="absolute left-[8%] top-[28%] hidden rounded-[var(--radius-sm)] border border-border bg-surface/80 px-2.5 py-1.5 backdrop-blur-sm font-mono text-[0.625rem] text-accent shadow-[var(--shadow-card)] xl:block">
        {"</>"}
      </span>
      <span className="absolute bottom-[16%] left-[13%] hidden rounded-[var(--radius-sm)] border border-border bg-surface/80 px-2.5 py-1.5 backdrop-blur-sm font-mono text-[0.625rem] text-accent shadow-[var(--shadow-card)] xl:block">
        {"{ }"}
      </span>
      <span className="absolute right-[6%] top-[18%] hidden rounded-[var(--radius-sm)] border border-border bg-surface/80 px-2.5 py-1.5 backdrop-blur-sm font-mono text-[0.625rem] font-bold text-accent shadow-[var(--shadow-card)] xl:block">
        TS
      </span>
      <span className="absolute bottom-[22%] right-[9%] hidden rounded-[var(--radius-sm)] border border-border bg-surface/80 px-2.5 py-1.5 backdrop-blur-sm font-mono text-[0.625rem] text-accent shadow-[var(--shadow-card)] xl:block">
        {"( )"}
      </span>

      <CodeWindow
        lines={lines}
        filename={filename}
        className="absolute left-1/2 top-1/2 w-[68%] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
