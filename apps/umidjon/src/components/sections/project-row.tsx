import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

export function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");

  return (
    <li className="stagger-item" style={{ transitionDelay: `${Math.min(index, 6) * 70}ms` }}>
      <Link
        href={`/projects/${project.slug}`}
        className="card group flex h-full flex-col overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              quality={80}
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <span className="font-display text-lg text-border-strong sm:text-xl">
                {project.name}
              </span>
            </div>
          )}

          <span className="absolute left-3 top-3 label rounded-full border border-border bg-background/80 px-2.5 py-1 backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display type-title leading-tight">
              {project.name}
            </h3>
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted">
            {project.tagline[locale]}
          </p>

          {project.stack.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.625rem] text-muted"
                >
                  {item}
                </span>
              ))}
              {project.stack.length > 3 ? (
                <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.625rem] text-muted">
                  +{project.stack.length - 3}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <span className="label">{t(`kind.${project.kind}`)}</span>
            <span className="font-mono text-xs text-muted">
              {project.client ?? project.year ?? ""}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
