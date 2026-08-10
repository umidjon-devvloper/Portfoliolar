import { cn } from "@/lib/utils";

export function TerminalHeading({
  command,
  title,
  className,
}: {
  command: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs text-muted">
        <span className="text-accent">$</span> {command}
      </span>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
