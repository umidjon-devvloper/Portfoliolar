"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { TechIcon } from "@/components/ui/tech-icon";
import { useInView } from "@/lib/use-in-view";
import { skillCategories, tierWeight, type Skill } from "@/content/skills";
import { cn } from "@/lib/utils";

function SkillRow({ skill }: { skill: Skill }) {
  const t = useTranslations("skills");
  const fill = skill.level !== null ? skill.level / 100 : tierWeight[skill.tier];

  return (
    <li className="stagger-item flex items-center gap-3">
      <TechIcon slug={skill.icon} fallback={skill.name} className="h-4 w-4 shrink-0" />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="truncate text-sm">{skill.name}</span>
        <span className="h-1 overflow-hidden rounded-full bg-border">
          <span
            className="meter block h-full w-full rounded-full"
            style={{ "--meter": String(fill) } as React.CSSProperties}
          />
        </span>
      </div>

      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted">
        {skill.level !== null ? `${skill.level}%` : t(`tier.${skill.tier}`)}
      </span>
    </li>
  );
}

export function SkillsBoard() {
  const t = useTranslations("skills");
  const { ref, inView } = useInView<HTMLDivElement>("-5% 0px -5% 0px");
  const [filter, setFilter] = useState("all");

  const filters = useMemo(
    () => ["all", ...skillCategories.map((category) => category.id)],
    [],
  );

  const visible =
    filter === "all"
      ? skillCategories
      : skillCategories.filter((category) => category.id === filter);

  return (
    <Container className="flex flex-col gap-6">
      <div
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        role="tablist"
      >
        {filters.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            onClick={() => setFilter(id)}
            className={cn(
              "shrink-0 rounded-[var(--radius-btn)] px-4 py-2 text-[0.8125rem] font-medium transition-colors",
              filter === id
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:bg-surface-2 hover:text-foreground",
            )}
          >
            {id === "all" ? t("allSkills") : t(id)}
          </button>
        ))}
      </div>

      <div
        ref={ref}
        data-show={inView ? "true" : "false"}
        className="stagger grid gap-4 lg:grid-cols-3"
      >
        {visible.map((category) => (
          <Card key={category.id} className="flex flex-col gap-4 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              {t(category.id)}
            </h2>
            <ul className="flex flex-col gap-3.5">
              {category.skills.map((skill) => (
                <SkillRow key={`${category.id}-${skill.name}`} skill={skill} />
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Container>
  );
}
