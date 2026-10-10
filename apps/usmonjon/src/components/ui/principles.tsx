import type { LucideIcon } from "lucide-react";

/**
 * Four points across one row. No panel behind them, and the dividers stop
 * short of the top and bottom so they read as separators rather than a
 * table.
 */
export function Principles({
  items,
}: {
  items: { id: string; icon: LucideIcon; title: string; description: string }[];
}) {
  return (
    <div className="grid gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group relative flex items-start gap-3.5 px-0 sm:px-6 lg:px-7"
        >
          {index > 0 ? (
            <span
              className="pointer-events-none absolute left-0 top-[15%] hidden h-[70%] w-px bg-border sm:block"
              aria-hidden
            />
          ) : null}

          <item.icon
            className="h-7 w-7 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.3}
          />

          <div className="flex flex-col gap-1">
            <h3 className="text-[0.875rem] font-semibold transition-colors group-hover:text-accent">
              {item.title}
            </h3>
            <p className="text-[0.75rem] leading-[1.65] text-muted">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
