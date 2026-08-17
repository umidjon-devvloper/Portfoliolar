/**
 * Dotted world map. The land is a generated SVG (real coastlines, ~5°
 * dot grid) used as a CSS mask, so it takes the theme colour and never
 * ships through the JS bundle. Markers and arcs sit in an overlay that
 * shares its equirectangular frame.
 *
 * Frame: lon -168..190, lat -56..78 projected into a 1000x374 viewBox.
 */
const VIEW = { w: 1000, h: 374 };
const project = (lon: number, lat: number) => ({
  x: ((lon + 168) / 358) * VIEW.w,
  y: ((78 - lat) / 134) * VIEW.h,
});

/* G'ijduvon — the only place on this map that is a claim about me. */
const home = project(64.68, 40.1);

/**
 * Arc directions only. They fade out before arriving anywhere, because
 * no client location is confirmed and a dot on a real map would read as
 * one.
 */
const reach = [
  project(-74, 40.7),
  project(-46.6, -23.5),
  project(13.4, 52.5),
  project(36.8, -1.3),
  project(72.9, 19.1),
  project(151.2, -33.9),
];

export function WorldMap({
  label,
  city,
  country,
  legend,
}: {
  label: string;
  city: string;
  country: string;
  legend: string[];
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
      <div className="flex flex-1 p-4 sm:p-6">
        <div className="relative min-h-[15rem] w-full flex-1">
          <span
            className="world-dots absolute inset-0 bg-foreground/40"
            role="img"
            aria-label={label}
          />

          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            fill="none"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <radialGradient
                id="reach-fade"
                gradientUnits="userSpaceOnUse"
                cx={home.x}
                cy={home.y}
                r="330"
              >
                <stop offset="0%" stopColor="#fff" />
                <stop offset="55%" stopColor="#fff" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>

              <mask id="reach-mask">
                <rect width={VIEW.w} height={VIEW.h} fill="url(#reach-fade)" />
              </mask>

              <radialGradient id="home-glow">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g mask="url(#reach-mask)">
              {reach.map((point, index) => {
                const midX = (home.x + point.x) / 2;
                const midY = Math.min(home.y, point.y) - 60;

                return (
                  <path
                    key={index}
                    d={`M ${home.x} ${home.y} Q ${midX} ${midY}, ${point.x} ${point.y}`}
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    strokeDasharray="5 7"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                );
              })}
            </g>

            <circle cx={home.x} cy={home.y} r="34" fill="url(#home-glow)" />
            <circle
              cx={home.x}
              cy={home.y}
              r="11"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.2"
              opacity="0.5"
            />
            <circle cx={home.x} cy={home.y} r="7" fill="var(--accent)" opacity="0.35" />
            <circle cx={home.x} cy={home.y} r="4" fill="var(--accent)" />
          </svg>

          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
          >
            {/* Drawn inside the same frame so the card tracks the marker
                however the box is letterboxed. */}
            <g transform={`translate(${home.x + 16} ${home.y - 54})`}>
              <rect
                width="128"
                height="42"
                rx="8"
                fill="var(--surface)"
                stroke="var(--border)"
                opacity="0.95"
              />
              <circle cx="14" cy="16" r="3" fill="var(--accent)" />
              <text
                x="24"
                y="20"
                fill="var(--foreground)"
                fontSize="12"
                fontWeight="600"
              >
                {city}
              </text>
              <text x="24" y="34" fill="var(--muted)" fontSize="10">
                {country}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border px-5 py-4 sm:px-7">
        {legend.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
