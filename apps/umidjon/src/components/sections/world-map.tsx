/**
 * Lightweight world map: a dotted field with a pinned home location and
 * outbound arcs. Inline SVG rather than a map library — no tiles, no
 * runtime data, a couple of kilobytes.
 *
 * TODO: swap the dotted field for a dotted continent silhouette once
 * `public/images/pages/world-dots.svg` exists.
 *
 * The arc endpoints are decorative reach, not client locations: no city
 * is claimed here because none is confirmed.
 */
const home = { x: 676, y: 150 };

const endpoints = [
  { id: "a", x: 468, y: 118 },
  { id: "b", x: 640, y: 196 },
  { id: "c", x: 258, y: 158 },
  { id: "d", x: 786, y: 250 },
  { id: "e", x: 900, y: 322 },
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
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
      <div className="relative p-4 sm:p-6">
        <svg
          viewBox="0 0 1000 400"
          className="h-auto w-full"
          role="img"
          aria-label={label}
        >
          <defs>
            <pattern
              id="map-dots"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.1" fill="var(--border-strong)" />
            </pattern>

            <radialGradient id="map-fade" cx="50%" cy="50%" r="62%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="60%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>

            <mask id="map-mask">
              <rect width="1000" height="400" fill="url(#map-fade)" />
            </mask>
          </defs>

          <g mask="url(#map-mask)">
            <rect width="1000" height="400" fill="url(#map-dots)" opacity="0.6" />

            {endpoints.map((point) => {
              const midX = (home.x + point.x) / 2;
              const midY = Math.min(home.y, point.y) - 58;

              return (
                <path
                  key={`arc-${point.id}`}
                  d={`M ${home.x} ${home.y} Q ${midX} ${midY}, ${point.x} ${point.y}`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                  strokeDasharray="4 5"
                  opacity="0.5"
                />
              );
            })}

            {endpoints.map((point) => (
              <g key={point.id}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="9"
                  fill="var(--accent)"
                  opacity="0.14"
                />
                <circle cx={point.x} cy={point.y} r="3.5" fill="var(--accent)" />
              </g>
            ))}
          </g>

          <circle cx={home.x} cy={home.y} r="16" fill="var(--accent)" opacity="0.14" />
          <circle cx={home.x} cy={home.y} r="9" fill="var(--accent)" opacity="0.28" />
          <circle cx={home.x} cy={home.y} r="4.5" fill="var(--accent)" />
        </svg>

        <span
          style={{ left: `${(home.x / 1000) * 100}%`, top: `${(home.y / 400) * 100}%` }}
          className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-[150%] flex-col rounded-[var(--radius-sm)] border border-border bg-surface/90 px-3 py-2 text-left shadow-[var(--shadow-card)] backdrop-blur-sm sm:flex"
        >
          <span className="flex items-center gap-2 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {city}
          </span>
          <span className="pl-3.5 text-[0.6875rem] text-muted">{country}</span>
        </span>
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
