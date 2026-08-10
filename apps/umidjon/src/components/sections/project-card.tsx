import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-colors hover:border-accent sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {project.name}
          </h3>
          <p className="text-sm text-muted">{project.tagline[locale]}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
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
        <div className="mt-auto flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
