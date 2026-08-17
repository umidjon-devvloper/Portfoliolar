"use client";

import { ArrowUpRight, ExternalLink, Github, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { TechIcon } from "@/components/ui/tech-icon";
import { buttonVariants } from "@/components/ui/button";
import { projects, projectKinds, type ProjectFilter } from "@/content/projects";
import { skillCategories } from "@/content/skills";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

const iconLookup = new Map(
  skillCategories.flatMap((category) =>
    category.skills.map((skill) => [skill.name, skill.icon] as const),
  ),
);

function Tag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[0.6875rem] text-muted">
      <TechIcon
        slug={iconLookup.get(name) ?? null}
        fallback={name}
        className="h-3 w-3"
      />
      {name}
    </span>
  );
}

function Cover({
  project,
  priority = false,
  sizes,
}: {
  project: Project;
  priority?: boolean;
  sizes: string;
}) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={project.name}
        fill
        sizes={sizes}
        quality={80}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <span className="dotted absolute inset-0 grid place-items-center px-4 text-center text-xs font-semibold text-border-strong">
      {project.name}
    </span>
  );
}

export function WorkIndex() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.kind === filter),
    [filter],
  );

  const [lead, ...rest] = visible;
  const leadLive = lead?.links.find((link) => link.kind === "live");
  const leadRepo = lead?.links.find((link) => link.kind === "repo");

  return (
    <Container className="flex flex-col gap-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="tablist"
        >
          {projectKinds.map((kind) => (
            <button
              key={kind}
              type="button"
              role="tab"
              aria-selected={filter === kind}
              onClick={() => setFilter(kind)}
              className={cn(
                "shrink-0 rounded-[var(--radius-btn)] px-4 py-2 text-[0.8125rem] font-medium transition-colors",
                filter === kind
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:bg-surface-2 hover:text-foreground",
              )}
            >
              {kind === "all" ? t("filterAll") : t(`kind.${kind}`)}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-1 rounded-[var(--radius-btn)] border border-border p-1 sm:flex">
          {(
            [
              { id: "grid", icon: LayoutGrid },
              { id: "list", icon: List },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              aria-label={t(`view.${option.id}`)}
              aria-pressed={view === option.id}
              onClick={() => setView(option.id)}
              className={cn(
                "grid h-8 w-8 place-items-center rounded-[var(--radius-sm)] transition-colors",
                view === option.id
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:text-foreground",
              )}
            >
              <option.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {lead ? (
        <Card hover={false} className="group grid overflow-hidden lg:grid-cols-[1fr_minmax(0,46rem)]">
          <div className="flex flex-col gap-4 p-6 sm:p-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[0.6875rem] font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("featuredBadge")}
            </span>

            <div className="flex items-start gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-btn)] bg-accent-soft">
                <TechIcon
                  slug={iconLookup.get(lead.stack[0] ?? "") ?? null}
                  fallback={lead.name}
                  className="h-5 w-5"
                />
              </span>
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[1.375rem] font-extrabold leading-tight tracking-tight">
                  {lead.name}
                </h2>
                <p className="text-[0.8125rem] text-muted">{lead.tagline[locale]}</p>
              </div>
            </div>

            <p className="text-sm leading-[1.75] text-muted">
              {lead.solution?.[locale] ?? lead.tagline[locale]}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {lead.stack.map((item) => (
                <Tag key={item} name={item} />
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`/work/${lead.slug}`}
                className={buttonVariants({ size: "md" })}
              >
                {t("caseStudy")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Link>

              {leadLive ? (
                <a
                  href={leadLive.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors hover:text-accent"
                >
                  {t("liveDemo")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}

              {leadRepo ? (
                <a
                  href={leadRepo.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors hover:text-accent"
                >
                  GitHub
                  <Github className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative order-first aspect-[16/10] bg-surface-2 lg:order-last lg:aspect-auto lg:min-h-[30rem]">
            <Cover project={lead} priority sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
        </Card>
      ) : (
        <p className="py-16 text-muted">{t("empty")}</p>
      )}

      {rest.length > 0 ? (
        view === "grid" ? (
          <ul className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" data-show="true">
            {rest.map((project) => (
              <li key={project.slug} className="stagger-item flex">
                <Link href={`/work/${project.slug}`} className="block w-full">
                  <Card className="group flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                      <Cover
                        project={project}
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 90vw"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-2.5 p-4">
                      <h3 className="text-[0.9375rem] font-bold leading-tight tracking-tight transition-colors group-hover:text-accent">
                        {project.name}
                      </h3>
                      <p className="text-[0.8125rem] text-accent">
                        {project.tagline[locale]}
                      </p>
                      {project.solution ? (
                        <p className="line-clamp-3 text-[0.8125rem] leading-[1.7] text-muted">
                          {project.solution[locale]}
                        </p>
                      ) : null}

                      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                        {project.stack.slice(0, 3).map((item) => (
                          <Tag key={item} name={item} />
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="stagger flex flex-col gap-3" data-show="true">
            {rest.map((project) => (
              <li key={project.slug} className="stagger-item">
                <Link href={`/work/${project.slug}`} className="block">
                  <Card className="group grid gap-4 p-3 sm:grid-cols-[14rem_1fr] sm:items-center">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] bg-surface-2">
                      <Cover project={project} sizes="14rem" />
                    </div>

                    <div className="flex flex-col gap-2 sm:pr-4">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h3 className="text-[0.9375rem] font-bold tracking-tight transition-colors group-hover:text-accent">
                          {project.name}
                        </h3>
                        <span className="text-[0.8125rem] text-accent">
                          {project.tagline[locale]}
                        </span>
                      </div>
                      {project.solution ? (
                        <p className="line-clamp-2 text-[0.8125rem] leading-[1.7] text-muted">
                          {project.solution[locale]}
                        </p>
                      ) : null}
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((item) => (
                          <Tag key={item} name={item} />
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : null}
    </Container>
  );
}
