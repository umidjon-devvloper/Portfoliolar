"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

/**
 * Projects read as an index, not a card grid. Each row gives the name at
 * display size, the year, and the stack — a table you scan, the way a
 * studio lists work. Detail lives on the project page.
 */
export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="row-wipe relative border-b border-border"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="grid gap-4 py-8 pl-5 transition-colors duration-300 hover:bg-surface sm:py-10 sm:pl-8 lg:grid-cols-[auto_1fr_auto] lg:items-baseline lg:gap-10"
      >
        <span className="label lg:w-10">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:gap-8">
          <h3 className="font-display type-title min-w-0 lg:w-[22rem] lg:shrink-0">
            {project.name}
          </h3>
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-muted">{project.tagline[locale]}</p>
            {project.stack.length > 0 ? (
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {project.stack.map((item) => (
                  <span key={item} className="font-mono text-xs text-muted/80">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-6 pr-5 sm:pr-8">
          {project.year ? (
            <span className="font-mono text-xs text-muted">{project.year}</span>
          ) : null}
          <span className="sr-only">{t("openProject")}</span>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:text-accent"
            aria-hidden
          />
        </div>
      </Link>
    </motion.li>
  );
}
