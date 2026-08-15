"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechTag } from "@/components/ui/tech-tag";
import { buttonVariants } from "@/components/ui/button";
import { projects, projectKinds, type ProjectFilter } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

export function WorkIndex() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.kind === filter),
    [filter],
  );

  const [lead, ...rest] = visible;
  const leadLive = lead?.links.find((link) => link.kind === "live");

  return (
    <Container className="flex flex-col gap-6">
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
              "shrink-0 rounded-[var(--radius-btn)] border px-4 py-2 text-sm transition-colors",
              filter === kind
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted hover:border-accent hover:text-accent",
            )}
          >
            {kind === "all" ? t("filterAll") : t(`kind.${kind}`)}
          </button>
        ))}
      </div>

      {lead ? (
        <Card hover={false} className="grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <Badge tone="accent">{t("featuredBadge")}</Badge>
            <div className="flex flex-col gap-1">
              <h2 className="type-section">{lead.name}</h2>
              <p className="text-sm text-accent">{lead.tagline[locale]}</p>
            </div>
            <p className="leading-relaxed text-muted">{lead.solution[locale]}</p>

            <div className="flex flex-wrap gap-1.5">
              {lead.stack.map((item) => (
                <TechTag key={item} name={item} />
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/work/${lead.slug}`}
                className={buttonVariants({ size: "sm" })}
              >
                {t("caseStudy")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              {leadLive ? (
                <a
                  href={leadLive.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  {t("liveDemo")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative order-first aspect-[16/10] bg-surface-2 lg:order-last lg:aspect-auto">
            {lead.cover ? (
              <Image
                src={lead.cover}
                alt={lead.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="dotted absolute inset-0 grid place-items-center text-sm font-semibold text-border-strong">
                {lead.name}
              </span>
            )}
          </div>
        </Card>
      ) : (
        <p className="py-16 text-muted">{t("empty")}</p>
      )}

      {rest.length > 0 ? (
        <ul className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" data-show="true">
          {rest.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
