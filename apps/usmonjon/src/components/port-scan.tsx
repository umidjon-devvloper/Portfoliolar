import type { CSSProperties } from "react";

type Row = { port: string; service: string; label: string };

type Props = {
  rows: Row[];
  start: string;
  done: string;
  label: string;
};

/* The page's one orchestrated motion: scanner output prints line by line
   on load (pure CSS, so it starts with first paint, no JS needed).
   Reduced motion shows everything at once — see .scan-line in globals.css. */
export function PortScan({ rows, start, done, label }: Props) {
  const total = rows.length + 3; // start line, header, rows, done line
  const line = (index: number) => ({
    className: "scan-line",
    style: { "--i": index } as CSSProperties,
  });

  return (
    <figure
      aria-label={label}
      className="relative min-w-0 border border-seam bg-hull font-mono text-[0.8rem] leading-relaxed sm:text-sm"
    >
      <div className="flex items-center justify-between border-b border-seam px-4 py-2.5 text-xs text-fog">
        <span>usmonjon@bastion: ~</span>
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 bg-seam" />
          <span className="size-2 bg-seam" />
          <span className="size-2 bg-signal" />
        </span>
      </div>

      <div className="overflow-x-auto px-4 py-4">
        <p className="whitespace-nowrap">
          <span className="text-signal">$</span> nmap -sV usmonjon.site
        </p>
        <p {...line(0)}><span className="mt-2 block whitespace-nowrap text-fog">{start}</span></p>

        <table className="mt-3 w-full border-collapse text-left">
          <thead {...line(1)}>
            <tr className="text-fog">
              <th scope="col" className="py-0.5 pr-3 sm:pr-5 font-normal">PORT</th>
              <th scope="col" className="py-0.5 pr-3 sm:pr-5 font-normal">STATE</th>
              <th scope="col" className="hidden py-0.5 pr-3 sm:pr-5 font-normal sm:table-cell">SERVICE</th>
              <th scope="col" className="py-0.5 font-normal">
                <span className="sr-only">Area</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.port} {...line(i + 2)}>
                <td className="whitespace-nowrap py-0.5 pr-3 sm:pr-5">{row.port}</td>
                <td className="py-0.5 pr-3 sm:pr-5 text-signal">open</td>
                <td className="hidden py-0.5 pr-3 sm:pr-5 text-fog sm:table-cell">{row.service}</td>
                <td className="py-0.5 sm:whitespace-nowrap">{row.label}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p {...line(total - 1)}><span className="mt-3 block text-fog">{done}</span></p>
        <p className="mt-2">
          <span className="text-signal">$</span> <span className="caret" aria-hidden />
        </p>
      </div>
    </figure>
  );
}
