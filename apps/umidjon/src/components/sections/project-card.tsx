import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

/** Compact card used on the home board: small cover, three-line summary. */
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

  return (
    <li
      className="stagger-item"
      style={{ transitionDelay: `${Math.min(index, 6) * 55}ms` }}
    >
      <Link href={`/work/${project.slug}`} className="block h-full">
        <Card className="group flex h-full flex-col gap-3 p-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] bg-surface-2">
            {project.cover ? (
              <Image
                src={project.cover}
                alt={project.name}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 90vw"
                quality={78}
                priority={priority}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span className="dotted absolute inset-0 grid place-items-center px-3 text-center text-xs font-semibold text-border-strong">
                {project.name}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1.5 px-1">
            <h3 className="text-sm font-bold tracking-tight">{project.name}</h3>

            <p className="line-clamp-3 text-[0.6875rem] leading-relaxed text-muted">
              {project.tagline[locale]} — {project.solution[locale]}
            </p>

            {project.stack.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-1">
                {project.stack.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border px-1.5 py-0.5 text-[0.625rem] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <span className="mt-auto flex items-center justify-end pt-2">
              <span className="sr-only">{t("caseStudy")}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent" />
            </span>
          </div>
        </Card>
      </Link>
    </li>
  );
}
