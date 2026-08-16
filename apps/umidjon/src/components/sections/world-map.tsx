/**
 * Lightweight world map: a dotted-grid silhouette with a home marker and
 * outbound arcs. Inline SVG rather than a map library — no tiles, no
 * runtime data, a couple of kilobytes.
 *
 * The arc endpoints are decorative reach, not client locations: no city
 * is claimed here because none is confirmed.
 */
const home = { x: 676, y: 156 };

const endpoints = [
  { id: "a", x: 468, y: 118 },
  { id: "b", x: 640, y: 190 },
  { id: "c", x: 258, y: 152 },
  { id: "d", x: 786, y: 246 },
  { id: "e", x: 900, y: 320 },
];

export function WorldMap({
  label,
  home: homeLabel,
  note,
}: {
  label: string;
  home: string;
  note?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2 p-4 sm:p-6">
      <svg
        viewBox="0 0 1000 400"
        className="h-auto w-full"
        role="img"
        aria-label={label}
      >
        <defs>
          <pattern id="map-dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="var(--border-strong)" />
          </pattern>

          <radialGradient id="map-fade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="62%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>

          <mask id="map-mask">
            <rect width="1000" height="400" fill="url(#map-fade)" />
          </mask>
        </defs>

        <g mask="url(#map-mask)">
          <rect width="1000" height="400" fill="url(#map-dots)" opacity="0.55" />

          {endpoints.map((point) => {
            const midX = (home.x + point.x) / 2;
            const midY = Math.min(home.y, point.y) - 55;

            return (
              <path
                key={`arc-${point.id}`}
                d={`M ${home.x} ${home.y} Q ${midX} ${midY}, ${point.x} ${point.y}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.2"
                strokeDasharray="4 5"
                opacity="0.55"
              />
            );
          })}

          {endpoints.map((point) => (
            <circle
              key={point.id}
              cx={point.x}
              cy={point.y}
              r="3.5"
              fill="var(--accent)"
              opacity="0.75"
            />
          ))}
        </g>

        <circle cx={home.x} cy={home.y} r="14" fill="var(--accent)" opacity="0.14" />
        <circle cx={home.x} cy={home.y} r="8" fill="var(--accent)" opacity="0.25" />
        <circle cx={home.x} cy={home.y} r="4.5" fill="var(--accent)" />
      </svg>

      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:left-6 sm:top-6">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {homeLabel}
      </span>

      {note ? (
        <span className="absolute bottom-4 right-4 hidden max-w-[18rem] text-right text-xs leading-[1.7] text-muted sm:block sm:bottom-6 sm:right-6">
          {note}
        </span>
      ) : null}
    </div>
  );
}
