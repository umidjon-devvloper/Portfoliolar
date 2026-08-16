/**
 * Editor window with real code, on a circuit field.
 *
 * The window is HTML so the code is actual text — the previous SVG drew
 * grey bars, which never read as code. The traces and dot field behind it
 * stay vector.
 */
const code = [
  [
    { text: "const", tone: "kw" },
    { text: " developer", tone: "fn" },
    { text: " = {", tone: "pn" },
  ],
  [
    { text: "  name", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Umidjon'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [
    { text: "  role", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Full-Stack Developer'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [
    { text: "  passion", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Building digital products'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [
    { text: "  skills", tone: "pr" },
    { text: ": [", tone: "pn" },
    { text: "'Next.js'", tone: "st" },
    { text: ", ", tone: "pn" },
    { text: "'React'", tone: "st" },
    { text: ", ", tone: "pn" },
    { text: "'Node.js'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [
    { text: "          ", tone: "pn" },
    { text: "'TypeScript'", tone: "st" },
    { text: ", ", tone: "pn" },
    { text: "'MongoDB'", tone: "st" },
    { text: "],", tone: "pn" },
  ],
  [
    { text: "  focus", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Performance & UX'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [{ text: "};", tone: "pn" }],
];

const toneClass: Record<string, string> = {
  kw: "text-accent",
  fn: "text-foreground",
  pr: "text-accent/80",
  st: "text-emerald-400/90",
  pn: "text-muted",
};

export function SkillsVisual() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 560 340"
        fill="none"
        aria-hidden
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="sv-glow" cx="58%" cy="45%" r="55%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <pattern id="sv-dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1.6" cy="1.6" r="1.2" fill="var(--accent)" opacity="0.35" />
          </pattern>
        </defs>

        <rect width="560" height="340" fill="url(#sv-glow)" />
        <rect x="6" y="20" width="132" height="112" fill="url(#sv-dots)" />

        <g stroke="var(--accent)" strokeWidth="1.1" opacity="0.4" fill="none">
          <path d="M26 214 H 104 L 132 244 H 188" strokeLinecap="round" />
          <path d="M26 254 H 84 L 108 280 H 176" strokeLinecap="round" />
          <path d="M498 62 H 540 L 552 78 V 138" strokeLinecap="round" />
          <path d="M512 208 H 552 V 262" strokeLinecap="round" />
        </g>
        <g fill="var(--accent)" opacity="0.65">
          {[
            [188, 244],
            [176, 280],
            [552, 138],
            [552, 262],
            [26, 214],
            [26, 254],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" />
          ))}
        </g>

        <ellipse cx="320" cy="298" rx="150" ry="11" fill="var(--accent)" opacity="0.06" />
      </svg>

      <div className="absolute left-[22%] top-[8%] w-[78%] overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <pre className="overflow-hidden px-3.5 pb-4 font-mono text-[0.625rem] leading-[1.8]">
          <code>
            {code.map((line, index) => (
              <div key={index} className="flex gap-3">
                <span className="w-3 shrink-0 select-none text-right text-muted/40">
                  {index + 1}
                </span>
                <span className="whitespace-pre">
                  {line.map((part, partIndex) => (
                    <span key={partIndex} className={toneClass[part.tone]}>
                      {part.text}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
