"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { projects, projectKinds, type ProjectFilter } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

const filterLabelKey: Record<ProjectFilter, string> = {
  all: "filterAll",
  saas: "filterSaas",
  mobile: "filterMobile",
  fullstack: "filterFullstack",
  business: "filterBusiness",
};

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const shouldReduceMotion = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.kind === filter),
    [filter],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2" role="tablist">
        {projectKinds.map((kind) => (
          <button
            key={kind}
            type="button"
            role="tab"
            aria-selected={filter === kind}
            onClick={() => setFilter(kind)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              filter === kind
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {t(filterLabelKey[kind])}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted">{t("empty")}</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout={!shouldReduceMotion}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                <div className="flex w-full">
                  <ProjectCard project={project} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
