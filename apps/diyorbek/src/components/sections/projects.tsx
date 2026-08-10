import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { TerminalHeading } from "@/components/ui/terminal-heading";
import { projects } from "@/content/profile";
import type { Locale } from "@/i18n/routing";

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;

  return (
    <Section id="projects" className="border-b border-border bg-surface">
      <div className="flex flex-col gap-10">
        <TerminalHeading command="git log --oneline" title={t("title")} />

        {projects.length === 0 ? (
          <p className="text-sm text-muted">
            <span className="text-accent">#</span> {t("empty")}
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {projects.map((project) => (
              <li key={project.slug} className="flex flex-col gap-3 py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold">{project.name}</h3>
                  {project.role ? (
                    <span className="text-xs text-muted">
                      {t("role")}: {project.role}
                    </span>
                  ) : null}
                </div>

                {project.summary ? (
                  <p className="text-sm leading-relaxed text-muted">
                    {project.summary[locale]}
                  </p>
                ) : null}

                {project.stack.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-border px-2 py-0.5 text-xs text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
