/** Briefcase for the Experience header, faded into the page like CodeVisual. */
export function BriefcaseVisual() {
  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      aria-hidden
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="bc-glow" cx="50%" cy="48%" r="60%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="bc-body" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>

        <pattern id="bc-dots" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.3" fill="var(--accent)" opacity="0.5" />
        </pattern>

        <radialGradient id="bc-fade" cx="50%" cy="50%" r="58%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="55%" stopColor="#fff" />
          <stop offset="78%" stopColor="#888" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>

        <mask id="bc-mask">
          <rect width="600" height="320" fill="url(#bc-fade)" />
        </mask>
      </defs>

      <rect width="600" height="320" fill="url(#bc-glow)" />

      <g mask="url(#bc-mask)">
        <rect x="10" y="20" width="112" height="84" fill="url(#bc-dots)" />
        <rect x="474" y="212" width="116" height="80" fill="url(#bc-dots)" />

        <g stroke="var(--accent)" strokeWidth="1.2" opacity="0.5" fill="none">
          <path d="M6 168 H 66 L 92 194 H 146" strokeLinecap="round" />
          <path d="M594 118 H 536 L 512 94 H 458" strokeLinecap="round" />
        </g>
        <g fill="var(--accent)" opacity="0.8">
          {[
            [146, 194],
            [458, 94],
            [6, 168],
            [594, 118],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
          ))}
        </g>
      </g>

      {/* handle */}
      <path
        d="M262 108 V 92 a 14 14 0 0 1 14 -14 h 48 a 14 14 0 0 1 14 14 V 108"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* body */}
      <rect
        x="182"
        y="108"
        width="236"
        height="146"
        rx="16"
        fill="url(#bc-body)"
        stroke="var(--accent)"
        strokeWidth="2.4"
      />

      {/* latch band */}
      <rect
        x="182"
        y="164"
        width="236"
        height="26"
        fill="var(--accent)"
        opacity="0.12"
      />
      <line
        x1="182"
        y1="164"
        x2="418"
        y2="164"
        stroke="var(--accent)"
        strokeWidth="1.6"
        opacity="0.6"
      />
      <line
        x1="182"
        y1="190"
        x2="418"
        y2="190"
        stroke="var(--accent)"
        strokeWidth="1.6"
        opacity="0.6"
      />
      <rect
        x="282"
        y="166"
        width="36"
        height="22"
        rx="5"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="2"
      />

      {/* corner rivets */}
      <g fill="var(--accent)" opacity="0.5">
        <circle cx="204" cy="128" r="3" />
        <circle cx="396" cy="128" r="3" />
        <circle cx="204" cy="234" r="3" />
        <circle cx="396" cy="234" r="3" />
      </g>

      <ellipse cx="300" cy="272" rx="150" ry="12" fill="var(--accent)" opacity="0.1" />
    </svg>
  );
}
