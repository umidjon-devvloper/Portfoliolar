/**
 * Editor on a laptop, drawn in perspective. Enough detail to read as a
 * real machine — bevelled lid, hinge, keyboard rows, trackpad, reflection
 * on the base — while staying vector, theme-aware and about 2 KB.
 */
const codeRows = [
  { indent: 0, widths: [26, 52, 12], tones: ["kw", "fn", "pn"] },
  { indent: 10, widths: [30, 8, 44], tones: ["pr", "pn", "st"] },
  { indent: 10, widths: [26, 8, 58], tones: ["pr", "pn", "st"] },
  { indent: 10, widths: [38, 8, 34], tones: ["pr", "pn", "st"] },
  { indent: 10, widths: [24, 8, 62], tones: ["pr", "pn", "st"] },
  { indent: 10, widths: [32, 8, 40], tones: ["pr", "pn", "st"] },
  { indent: 0, widths: [10], tones: ["pn"] },
];

const toneFill: Record<string, string> = {
  kw: "var(--accent)",
  fn: "var(--foreground)",
  pn: "var(--muted)",
  pr: "var(--accent)",
  st: "var(--foreground)",
};

const toneOpacity: Record<string, number> = {
  kw: 0.9,
  fn: 0.55,
  pn: 0.4,
  pr: 0.65,
  st: 0.4,
};

export function WorkVisual() {
  return (
    <svg viewBox="0 0 560 380" fill="none" aria-hidden className="h-full w-full">
      <defs>
        <linearGradient id="wv-lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="55%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="var(--surface-2)" />
        </linearGradient>

        <linearGradient id="wv-base" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>

        <linearGradient id="wv-glass" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
          <stop offset="45%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="wv-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
        </linearGradient>

        <radialGradient id="wv-glow" cx="50%" cy="52%" r="52%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>

        <pattern id="wv-dots" width="13" height="13" patternUnits="userSpaceOnUse">
          <circle cx="1.8" cy="1.8" r="1.3" fill="var(--accent)" opacity="0.4" />
        </pattern>
      </defs>

      <rect width="560" height="380" fill="url(#wv-glow)" />
      <rect x="424" y="14" width="122" height="66" fill="url(#wv-dots)" />
      <rect x="14" y="286" width="78" height="52" fill="url(#wv-dots)" opacity="0.55" />

      <path
        d="M104 236 A 168 168 0 1 1 436 176"
        stroke="url(#wv-arc)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M436 176 L 424 165 M436 176 L 423 185"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />

      {/* lid */}
      <g>
        <rect
          x="146"
          y="48"
          width="268"
          height="180"
          rx="12"
          fill="url(#wv-lid)"
          stroke="var(--border-strong)"
          strokeWidth="1.4"
        />
        <rect
          x="153"
          y="55"
          width="254"
          height="166"
          rx="7"
          fill="var(--background)"
          stroke="var(--border)"
          strokeWidth="0.8"
        />

        {/* title bar */}
        <g>
          <circle cx="167" cy="68" r="3" fill="#ff5f57" />
          <circle cx="178" cy="68" r="3" fill="#febc2e" />
          <circle cx="189" cy="68" r="3" fill="#28c840" />
          <rect
            x="336"
            y="65"
            width="58"
            height="6"
            rx="3"
            fill="var(--muted)"
            opacity="0.3"
          />
          <line
            x1="153"
            y1="80"
            x2="407"
            y2="80"
            stroke="var(--border)"
            strokeWidth="0.8"
          />
        </g>

        {/* code */}
        <g>
          {codeRows.map((row, index) => {
            const y = 94 + index * 17;
            let x = 182 + row.indent;

            return (
              <g key={y}>
                <rect
                  x="163"
                  y={y}
                  width="7"
                  height="5"
                  rx="1.5"
                  fill="var(--muted)"
                  opacity="0.3"
                />
                {row.widths.map((width, part) => {
                  const tone = row.tones[part] ?? "pn";
                  const node = (
                    <rect
                      key={`${y}-${part}`}
                      x={x}
                      y={y}
                      width={width}
                      height="5"
                      rx="2.5"
                      fill={toneFill[tone]}
                      opacity={toneOpacity[tone]}
                    />
                  );
                  x += width + 6;
                  return node;
                })}
              </g>
            );
          })}
          <rect
            x="192"
            y="213"
            width="6"
            height="6"
            rx="1"
            fill="var(--accent)"
            opacity="0.8"
          />
        </g>

        <rect
          x="153"
          y="55"
          width="254"
          height="166"
          rx="7"
          fill="url(#wv-glass)"
        />
      </g>

      {/* hinge */}
      <rect
        x="252"
        y="228"
        width="56"
        height="4"
        rx="2"
        fill="var(--border-strong)"
      />

      {/* base */}
      <path
        d="M120 232 H 440 L 470 268 Q 472 274, 464 274 H 96 Q 88 274, 90 268 Z"
        fill="url(#wv-base)"
        stroke="var(--border-strong)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* keyboard rows */}
      <g opacity="0.5">
        {[241, 249, 257].map((y, row) => (
          <rect
            key={y}
            x={150 + row * 5}
            y={y}
            width={260 - row * 10}
            height="4"
            rx="2"
            fill="var(--border-strong)"
          />
        ))}
      </g>

      {/* trackpad */}
      <path
        d="M236 264 H 330 L 336 271 H 230 Z"
        fill="var(--surface-2)"
        stroke="var(--border-strong)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      <ellipse cx="280" cy="288" rx="196" ry="13" fill="var(--accent)" opacity="0.06" />

      {/* floating chips */}
      <g>
        <rect
          x="78"
          y="104"
          width="52"
          height="38"
          rx="10"
          fill="var(--surface)"
          stroke="var(--border-strong)"
        />
        <text
          x="104"
          y="128"
          textAnchor="middle"
          fill="var(--accent)"
          fontSize="13"
          fontFamily="monospace"
        >
          {"</>"}
        </text>

        <rect
          x="430"
          y="206"
          width="52"
          height="38"
          rx="10"
          fill="var(--surface)"
          stroke="var(--border-strong)"
        />
        <text
          x="456"
          y="230"
          textAnchor="middle"
          fill="var(--accent)"
          fontSize="12"
          fontFamily="monospace"
          fontWeight="700"
        >
          TS
        </text>

        <rect
          x="404"
          y="86"
          width="46"
          height="34"
          rx="9"
          fill="var(--surface)"
          stroke="var(--border-strong)"
          opacity="0.9"
        />
        <path
          d="M420 103 h 14 M427 96 v 14"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
