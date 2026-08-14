"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { projects, projectKinds, type ProjectFilter } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-row";

export function ProjectsIndex() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.kind === filter),
    [filter],
  );

  return (
    <Container className="flex flex-col gap-8">
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
              "shrink-0 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
              filter === kind
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted hover:border-accent hover:text-foreground",
            )}
          >
            {kind === "all" ? t("filterAll") : t(`kind.${kind}`)}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-muted">{t("empty")}</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              priority={index < 3}
            />
          ))}
        </ul>
      )}
    </Container>
  );
}
