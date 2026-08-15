/**
 * Laptop showing an editor, with an orbit arc and a dot field behind it.
 * Vector so it recolours with the theme and costs about a kilobyte.
 */
export function WorkVisual() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      aria-hidden
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="work-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>

        <linearGradient id="work-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="work-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--border-strong)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>

        <pattern id="work-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="var(--accent)" opacity="0.45" />
        </pattern>
      </defs>

      <rect x="392" y="16" width="112" height="70" fill="url(#work-dots)" />
      <rect x="24" y="250" width="84" height="56" fill="url(#work-dots)" opacity="0.6" />

      <path
        d="M96 210 A 150 150 0 1 1 402 168"
        stroke="url(#work-arc)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M402 168 L 392 156 M402 168 L 390 176"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* screen */}
      <g>
        <rect
          x="150"
          y="58"
          width="250"
          height="164"
          rx="10"
          fill="url(#work-screen)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <rect x="160" y="68" width="230" height="144" rx="6" fill="var(--background)" />

        {[
          { y: 84, indent: 0, w: 118, tone: "var(--muted)" },
          { y: 100, indent: 12, w: 92, tone: "var(--accent)" },
          { y: 116, indent: 12, w: 126, tone: "var(--accent)" },
          { y: 132, indent: 12, w: 104, tone: "var(--accent)" },
          { y: 148, indent: 12, w: 140, tone: "var(--accent)" },
          { y: 164, indent: 12, w: 88, tone: "var(--accent)" },
          { y: 180, indent: 0, w: 34, tone: "var(--muted)" },
        ].map((line) => (
          <g key={line.y}>
            <rect
              x="170"
              y={line.y}
              width="6"
              height="5"
              rx="1.5"
              fill="var(--muted)"
              opacity="0.4"
            />
            <rect
              x={186 + line.indent}
              y={line.y}
              width={line.w}
              height="5"
              rx="2.5"
              fill={line.tone}
              opacity={line.tone === "var(--accent)" ? 0.75 : 0.45}
            />
          </g>
        ))}
      </g>

      {/* base */}
      <path
        d="M118 222 H 432 L 452 250 H 98 Z"
        fill="url(#work-base)"
        stroke="var(--border-strong)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="238" y="231" width="74" height="6" rx="3" fill="var(--border-strong)" />
      <ellipse cx="275" cy="272" rx="176" ry="14" fill="var(--accent)" opacity="0.07" />

      {/* floating chips */}
      <g opacity="0.85">
        <rect
          x="86"
          y="96"
          width="46"
          height="34"
          rx="9"
          fill="var(--surface)"
          stroke="var(--border-strong)"
        />
        <text
          x="109"
          y="118"
          textAnchor="middle"
          fill="var(--accent)"
          fontSize="13"
          fontFamily="monospace"
        >
          {"</>"}
        </text>

        <rect
          x="404"
          y="196"
          width="46"
          height="34"
          rx="9"
          fill="var(--surface)"
          stroke="var(--border-strong)"
        />
        <text
          x="427"
          y="218"
          textAnchor="middle"
          fill="var(--accent)"
          fontSize="12"
          fontFamily="monospace"
        >
          TS
        </text>
      </g>
    </svg>
  );
}
