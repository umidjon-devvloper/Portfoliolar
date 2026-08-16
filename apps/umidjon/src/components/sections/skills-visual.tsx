import { CodeWindow } from "@/components/ui/code-window";
import { developerSnippet } from "@/content/code-sample";

/** Circuit field behind the editor window. */
export function SkillsVisual() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 620 340"
        fill="none"
        aria-hidden
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="sv-glow" cx="55%" cy="45%" r="58%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <pattern id="sv-dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1.6" cy="1.6" r="1.2" fill="var(--accent)" opacity="0.35" />
          </pattern>
        </defs>

        <rect width="620" height="340" fill="url(#sv-glow)" />
        <rect x="0" y="14" width="128" height="106" fill="url(#sv-dots)" />

        <g stroke="var(--accent)" strokeWidth="1.1" opacity="0.4" fill="none">
          <path d="M14 196 H 92 L 118 224 H 172" strokeLinecap="round" />
          <path d="M14 238 H 72 L 96 264 H 160" strokeLinecap="round" />
          <path d="M566 54 H 606 L 616 70 V 128" strokeLinecap="round" />
          <path d="M580 206 H 616 V 258" strokeLinecap="round" />
        </g>
        <g fill="var(--accent)" opacity="0.65">
          {[
            [172, 224],
            [160, 264],
            [616, 128],
            [616, 258],
            [14, 196],
            [14, 238],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" />
          ))}
        </g>
      </svg>

      <CodeWindow
        lines={developerSnippet}
        className="absolute left-[6%] top-[4%] w-[94%]"
      />
    </div>
  );
}
