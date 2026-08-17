"use client";

import { Briefcase, CircleCheck } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { TechIcon } from "@/components/ui/tech-icon";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { roles } from "@/content/experience";
import { skillCategories } from "@/content/skills";
import { cn } from "@/lib/utils";

const iconLookup = new Map(
  skillCategories.flatMap((category) =>
    category.skills.map((skill) => [skill.name, skill.icon] as const),
  ),
);

export function ExperienceBoard() {
  const t = useTranslations("experience");
  const [active, setActive] = useState(roles[0]?.id ?? "");

  const role = roles.find((item) => item.id === active) ?? roles[0];
  if (!role) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-8">
      {/* Timeline: no panel behind it, one continuous rail */}
      <ol className="flex h-full flex-col">
        {roles.map((item, index) => {
          const selected = item.id === active;
          const last = index === roles.length - 1;

          return (
            <li
              key={item.id}
              className="group grid flex-1 grid-cols-[0.75rem_1fr] gap-x-4"
            >
              <span className="relative flex justify-center">
                {!last ? (
                  <span
                    className="absolute inset-y-0 top-4 w-px bg-border"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={cn(
                    "relative mt-2.5 h-3 w-3 rounded-full border-2 transition-all duration-300",
                    selected
                      ? "scale-125 border-accent bg-accent"
                      : "border-border-strong bg-background group-hover:scale-125 group-hover:border-accent group-hover:bg-accent/40",
                  )}
                  aria-hidden
                />
              </span>

              <button
                type="button"
                onClick={() => setActive(item.id)}
                aria-pressed={selected}
                className={cn(
                  "-ml-3 mb-4 flex h-fit origin-left flex-col items-start gap-1 rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-all duration-300 group-hover:scale-[1.03]",
                  selected ? "bg-surface" : "group-hover:bg-surface/70",
                )}
              >
                <span
                  className={cn(
                    "text-[0.8125rem] transition-colors",
                    selected ? "text-accent" : "text-muted",
                  )}
                >
                  {t(`${item.id}.shortPeriod`)}
                </span>

                <span className="font-semibold leading-tight">
                  {t(`${item.id}.title`)}
                </span>

                <span className="text-[0.8125rem] text-accent/80">
                  {item.company ?? t("independent")}
                </span>

                {t.has(`${item.id}.summary`) ? (
                  <span className="text-xs leading-relaxed text-muted">
                    {t(`${item.id}.summary`)}
                  </span>
                ) : null}

                {item.current ? (
                  <Badge tone="online" className="mt-1.5">
                    {t("current")}
                  </Badge>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <Reveal key={role.id}>
        <Card hover={false} className="flex h-full flex-col p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-5">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[var(--radius-btn)] bg-accent-soft text-accent">
                <Briefcase className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[1.375rem] font-extrabold tracking-tight">
                  {t(`${role.id}.title`)}
                </h2>
                <p className="text-[0.875rem] text-accent">
                  {role.company ?? t("independent")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-[0.8125rem] text-muted">
                {t(`${role.id}.period`)}
              </span>
              {role.current ? <Badge tone="online">{t("current")}</Badge> : null}
            </div>
          </div>

          {t.has(`${role.id}.description`) ? (
            <div className="flex flex-col gap-2 border-t border-border py-5">
              <h3 className="text-[0.875rem] font-semibold text-accent">
                {t("aboutRole")}
              </h3>
              <p className="text-sm leading-[1.8] text-muted">
                {t(`${role.id}.description`)}
              </p>
            </div>
          ) : null}

          {role.duties > 0 ? (
          <div className="flex flex-col gap-3 border-t border-border py-5">
            <h3 className="text-[0.875rem] font-semibold text-accent">
              {t("responsibilities")}
            </h3>
            <ul className="flex flex-col gap-3">
              {Array.from({ length: role.duties }).map((_, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CircleCheck
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent"
                    strokeWidth={1.8}
                  />
                  <span className="text-sm leading-relaxed text-muted">
                    {t(`${role.id}.duties.${index}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          ) : null}

          {role.stack.length > 0 ? (
          <div className="mt-auto flex flex-col gap-3.5 border-t border-border pt-5">
            <h3 className="text-[0.875rem] font-semibold text-accent">
              {t("technologies")}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {role.stack.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-border bg-surface-2 px-3 py-2 text-[0.8125rem] transition-colors hover:border-accent"
                >
                  <TechIcon
                    slug={iconLookup.get(item) ?? null}
                    fallback={item}
                    className="h-4 w-4"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
          ) : null}
        </Card>
      </Reveal>
    </div>
  );
}
