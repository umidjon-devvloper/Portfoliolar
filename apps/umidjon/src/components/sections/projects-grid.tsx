"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { ProjectsSpine } from "@/components/motion/projects-spine";
import { projects, projectKinds, type ProjectFilter } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-row";

const filterLabelKey: Record<ProjectFilter, string> = {
  all: "filterAll",
  saas: "filterSaas",
  mobile: "filterMobile",
  fullstack: "filterFullstack",
  business: "filterBusiness",
};

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
    <Container className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2" role="tablist">
        {projectKinds.map((kind) => (
          <button
            key={kind}
            type="button"
            role="tab"
            aria-selected={filter === kind}
            onClick={() => setFilter(kind)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
              filter === kind
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted hover:border-accent hover:text-foreground",
            )}
          >
            {t(filterLabelKey[kind])}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-muted">{t("empty")}</p>
      ) : (
        <ProjectsSpine>
          <ul className="flex flex-col gap-12 sm:pl-20 lg:gap-16">
            {visible.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </ul>
        </ProjectsSpine>
      )}
    </Container>
  );
}
