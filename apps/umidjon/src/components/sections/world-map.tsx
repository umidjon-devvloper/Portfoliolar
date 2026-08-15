/**
 * Lightweight world map: a dotted-grid silhouette with a few markers and
 * arcs. Drawn as inline SVG rather than a map library — no tiles, no
 * runtime data, a couple of kilobytes.
 */
const markers = [
  { id: "tashkent", x: 690, y: 152, home: true },
  { id: "london", x: 468, y: 118 },
  { id: "dubai", x: 640, y: 190 },
  { id: "newYork", x: 258, y: 152 },
  { id: "singapore", x: 786, y: 246 },
  { id: "sydney", x: 900, y: 320 },
];

const home = markers[0]!;

export function WorldMap({ label }: { label: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2 p-4">
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
        </defs>

        <rect width="1000" height="400" fill="url(#map-dots)" opacity="0.55" />

        {markers.slice(1).map((marker) => {
          const midX = (home.x + marker.x) / 2;
          const midY = Math.min(home.y, marker.y) - 55;

          return (
            <path
              key={`arc-${marker.id}`}
              d={`M ${home.x} ${home.y} Q ${midX} ${midY}, ${marker.x} ${marker.y}`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.2"
              strokeDasharray="4 5"
              opacity="0.55"
            />
          );
        })}

        {markers.map((marker) => (
          <g key={marker.id}>
            {marker.home ? (
              <circle cx={marker.x} cy={marker.y} r="9" fill="var(--accent)" opacity="0.18" />
            ) : null}
            <circle
              cx={marker.x}
              cy={marker.y}
              r={marker.home ? 5 : 3.5}
              fill="var(--accent)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
