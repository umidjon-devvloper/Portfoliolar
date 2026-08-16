"use client";

import { Briefcase, Check } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { TechTag } from "@/components/ui/tech-tag";
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

/**
 * Timeline on the left selects the role; the panel on the right shows
 * that role in full. Collapses to a single column below lg.
 */
export function ExperienceBoard() {
  const t = useTranslations("experience");
  const [active, setActive] = useState(roles[0]?.id ?? "");

  const role = roles.find((item) => item.id === active) ?? roles[0];
  if (!role) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <Card hover={false} className="p-4 sm:p-5">
        <ol className="flex flex-col">
          {roles.map((item, index) => {
            const selected = item.id === active;
            const last = index === roles.length - 1;

            return (
              <li key={item.id} className="grid grid-cols-[0.5rem_1fr] gap-x-4">
                <span className="relative flex h-full justify-center">
                  {!last ? (
                    <span className="absolute inset-y-0 top-3 w-px bg-border" aria-hidden />
                  ) : null}
                  <span
                    className={cn(
                      "relative mt-2 h-2 w-2 rounded-full transition-colors",
                      selected ? "bg-accent" : "bg-border-strong",
                    )}
                    aria-hidden
                  />
                </span>

                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-pressed={selected}
                  className={cn(
                    "mb-2 flex flex-col gap-1 rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-colors",
                    selected ? "bg-accent-soft" : "hover:bg-surface-2",
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.8125rem]",
                      selected ? "text-accent" : "text-muted",
                    )}
                  >
                    {t(`${item.id}.shortPeriod`)}
                  </span>
                  <span className="font-semibold leading-tight">
                    {t(`${item.id}.title`)}
                  </span>
                  <span className="text-xs text-muted">
                    {item.company ?? t("independent")}
                  </span>
                  {item.current ? (
                    <Badge tone="live" className="mt-1 w-fit">
                      {t("current")}
                    </Badge>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>
      </Card>

      <Reveal key={role.id}>
        <Card hover={false} className="flex h-full flex-col gap-6 p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-btn)] bg-accent-soft text-accent">
                <Briefcase className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[1.25rem] font-extrabold tracking-tight">
                  {t(`${role.id}.title`)}
                </h2>
                <p className="text-[0.8125rem] text-accent">
                  {role.company ?? t("independent")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[0.8125rem] text-muted">
                {t(`${role.id}.period`)}
              </span>
              {role.current ? (
                <Badge tone="live">{t("current")}</Badge>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="eyebrow">{t("aboutRole")}</h3>
            <p className="text-sm leading-[1.75] text-muted">
              {t(`${role.id}.description`)}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="eyebrow">{t("responsibilities")}</h3>
            <ul className="flex flex-col gap-2.5">
              {Array.from({ length: role.duties }).map((_, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-muted">
                    {t(`${role.id}.duties.${index}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <h3 className="eyebrow">{t("technologies")}</h3>
            <div className="flex flex-wrap gap-2">
              {role.stack.map((item) => (
                <TechTag
                  key={item}
                  name={item}
                  icon={iconLookup.get(item) ?? null}
                />
              ))}
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
