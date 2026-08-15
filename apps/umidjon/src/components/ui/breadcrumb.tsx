import { Link } from "@/i18n/navigation";

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
      <Link href="/" className="uppercase tracking-wider text-muted hover:text-foreground">
        Home
      </Link>
      <span className="text-border-strong">/</span>
      <span className="uppercase tracking-wider text-accent">{current}</span>
    </nav>
  );
}
