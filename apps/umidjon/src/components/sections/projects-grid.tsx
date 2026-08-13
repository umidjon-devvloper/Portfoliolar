"use client";

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { projects, projectKinds, type ProjectFilter } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectRow } from "./project-row";

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
    <div className="flex flex-col">
      <Container>
        <div className="flex flex-wrap gap-x-6 gap-y-3 pb-8" role="tablist">
          {projectKinds.map((kind) => (
            <button
              key={kind}
              type="button"
              role="tab"
              aria-selected={filter === kind}
              onClick={() => setFilter(kind)}
              className={cn(
                "label border-b pb-1 transition-colors",
                filter === kind
                  ? "border-accent text-accent"
                  : "border-transparent hover:text-foreground",
              )}
            >
              {t(filterLabelKey[kind])}
            </button>
          ))}
        </div>
      </Container>

      {visible.length === 0 ? (
        <Container>
          <p className="py-16 text-muted">{t("empty")}</p>
        </Container>
      ) : (
        <ul className="border-t border-border">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
