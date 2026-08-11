import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");

  return (
    <SpotlightCard
      className={cn(
        "group h-full rounded-[var(--radius-card)] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60",
        className,
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col gap-5 p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {project.name}
              </h3>
              {project.year ? (
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
              ) : null}
            </div>
            <p className="text-sm text-muted">{project.tagline[locale]}</p>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {project.result ? (
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              {t("result")}:{" "}
            </span>
            {project.result[locale]}
          </p>
        ) : null}

        {project.stack.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.stack.slice(0, 4).map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
            {project.stack.length > 4 ? (
              <Badge>+{project.stack.length - 4}</Badge>
            ) : null}
          </div>
        ) : null}
      </Link>
    </SpotlightCard>
  );
}
