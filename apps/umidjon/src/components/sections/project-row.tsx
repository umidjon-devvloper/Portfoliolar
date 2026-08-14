"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

export function ProjectCard({
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
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-project-card
      className="relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="card group grid overflow-hidden rounded-2xl md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2 md:aspect-auto md:min-h-[19rem]">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.name}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              quality={82}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-2xl text-border-strong">
                {project.name}
              </span>
            </div>
          )}
          <span className="absolute left-4 top-4 label rounded-full border border-border bg-background/70 px-3 py-1 backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display type-title">{project.name}</h3>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <p className="leading-relaxed text-muted">
              {project.tagline[locale]}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {project.stack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 5).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.6875rem] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="label">{t("openProject")}</span>
              {project.year ? (
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
