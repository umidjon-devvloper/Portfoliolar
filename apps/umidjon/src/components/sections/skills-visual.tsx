/**
 * Editor window on a circuit field — the Skills page counterpart to the
 * laptop on Work. Vector, theme-aware, replaced automatically once
 * skills.png is uploaded.
 */
const lines = [
  { indent: 0, parts: [[46, "kw"], [66, "fn"], [10, "pn"]] },
  { indent: 12, parts: [[34, "pr"], [8, "pn"], [52, "st"]] },
  { indent: 12, parts: [[30, "pr"], [8, "pn"], [78, "st"]] },
  { indent: 12, parts: [[44, "pr"], [8, "pn"], [64, "st"]] },
  { indent: 12, parts: [[32, "pr"], [8, "pn"], [88, "st"]] },
  { indent: 24, parts: [[58, "st"], [40, "st"]] },
  { indent: 12, parts: [[30, "pr"], [8, "pn"], [96, "st"]] },
  { indent: 0, parts: [[12, "pn"]] },
] as const;

const fill: Record<string, string> = {
  kw: "var(--accent)",
  fn: "var(--foreground)",
  pn: "var(--muted)",
  pr: "var(--accent)",
  st: "var(--foreground)",
};

const alpha: Record<string, number> = {
  kw: 0.9,
  fn: 0.5,
  pn: 0.35,
  pr: 0.6,
  st: 0.38,
};

export function SkillsVisual() {
  return (
    <svg viewBox="0 0 560 340" fill="none" aria-hidden className="h-full w-full">
      <defs>
        <linearGradient id="sv-window" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>

        <radialGradient id="sv-glow" cx="60%" cy="45%" r="55%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>

        <pattern id="sv-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.2" fill="var(--accent)" opacity="0.35" />
        </pattern>
      </defs>

      <rect width="560" height="340" fill="url(#sv-glow)" />
      <rect x="16" y="26" width="150" height="120" fill="url(#sv-dots)" />

      {/* circuit traces */}
      <g stroke="var(--accent)" strokeWidth="1.1" opacity="0.4" fill="none">
        <path d="M40 210 H 120 L 150 240 H 210" strokeLinecap="round" />
        <path d="M40 250 H 96 L 120 274 H 196" strokeLinecap="round" />
        <path d="M470 74 H 520 L 540 94 V 150" strokeLinecap="round" />
        <path d="M494 190 H 540 V 240" strokeLinecap="round" />
      </g>
      <g fill="var(--accent)" opacity="0.65">
        {[
          [210, 240],
          [196, 274],
          [540, 150],
          [540, 240],
          [40, 210],
          [40, 250],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" />
        ))}
      </g>

      {/* editor window */}
      <g>
        <rect
          x="150"
          y="46"
          width="330"
          height="210"
          rx="12"
          fill="url(#sv-window)"
          stroke="var(--border-strong)"
          strokeWidth="1.4"
        />

        <circle cx="172" cy="66" r="3.4" fill="#ff5f57" />
        <circle cx="185" cy="66" r="3.4" fill="#febc2e" />
        <circle cx="198" cy="66" r="3.4" fill="#28c840" />
        <line
          x1="150"
          y1="82"
          x2="480"
          y2="82"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {lines.map((line, index) => {
          const y = 98 + index * 19;
          let x = 192 + line.indent;

          return (
            <g key={y}>
              <rect
                x="166"
                y={y}
                width="8"
                height="5"
                rx="1.5"
                fill="var(--muted)"
                opacity="0.3"
              />
              {line.parts.map(([width, tone], part) => {
                const node = (
                  <rect
                    key={`${y}-${part}`}
                    x={x}
                    y={y}
                    width={width as number}
                    height="5"
                    rx="2.5"
                    fill={fill[tone as string]}
                    opacity={alpha[tone as string]}
                  />
                );
                x += (width as number) + 7;
                return node;
              })}
            </g>
          );
        })}

        <rect
          x="192"
          y="249"
          width="6"
          height="6"
          rx="1"
          fill="var(--accent)"
          opacity="0.85"
        />
      </g>

      <ellipse cx="315" cy="278" rx="150" ry="11" fill="var(--accent)" opacity="0.06" />
    </svg>
  );
}
