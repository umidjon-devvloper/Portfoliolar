import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { TechTag } from "@/components/ui/tech-tag";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

export function ProjectCard({
  project,
  index = 0,
  priority = false,
}: {
  project: Project;
  index?: number;
  priority?: boolean;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");
  const live = project.links.find((link) => link.kind === "live");

  return (
    <li
      className="stagger-item"
      style={{ transitionDelay: `${Math.min(index, 6) * 60}ms` }}
    >
      <Card className="group flex h-full flex-col overflow-hidden">
        <Link
          href={`/work/${project.slug}`}
          className="relative block aspect-[16/10] overflow-hidden bg-surface-2"
        >
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.name}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              quality={78}
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="dotted absolute inset-0 grid place-items-center px-6 text-center text-sm font-semibold text-border-strong">
              {project.name}
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-bold tracking-tight">{project.name}</h3>
              <p className="text-xs text-accent">{project.tagline[locale]}</p>
            </div>
            <span className="text-xs text-muted">{project.year ?? ""}</span>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {project.solution[locale]}
          </p>

          {project.stack.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((item) => (
                <TechTag key={item} name={item} />
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent"
            >
              {t("caseStudy")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            {live ? (
              <a
                href={live.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.name} — ${t("openSite")}`}
                className="text-muted transition-colors hover:text-accent"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </Card>
    </li>
  );
}
