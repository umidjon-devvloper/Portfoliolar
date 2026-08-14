"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { TechIcon } from "@/components/ui/tech-icon";
import { useInView } from "@/lib/use-in-view";
import { skillCategories, tierWeight, type Skill } from "@/content/skills";

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const t = useTranslations("skills");
  const fill = skill.level !== null ? skill.level / 100 : tierWeight[skill.tier];

  return (
    <li
      className="stagger-item card group rounded-xl p-3.5"
      style={{ transitionDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background/60 transition-colors group-hover:border-accent">
          <TechIcon
            slug={skill.icon}
            fallback={skill.name}
            className="h-4 w-4 opacity-80 transition-transform duration-300 group-hover:scale-110"
          />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">{skill.name}</span>
          <span className="label !text-[0.5rem] !tracking-[0.14em]">
            {skill.level !== null ? `${skill.level}%` : t(`tier.${skill.tier}`)}
          </span>
        </div>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
        <div
          className="meter h-full origin-left rounded-full"
          style={{ "--meter": String(fill) } as React.CSSProperties}
        />
      </div>
    </li>
  );
}

export function SkillsMatrix() {
  const t = useTranslations("skills");
  const { ref, inView } = useInView<HTMLDivElement>("-5% 0px -5% 0px");

  return (
    <section
      id="skills"
      className="border-b border-border bg-surface py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-10 sm:gap-14">
        <div className="flex flex-col gap-3">
          <span className="label flex items-center gap-3">
            <span className="h-px w-8 gradient-rule" aria-hidden />
            {t("label")}
          </span>
          <h2 className="font-display type-display max-w-2xl text-balance">
            {t("title")}
          </h2>
        </div>

        <div
          ref={ref}
          data-show={inView ? "true" : "false"}
          className="stagger flex flex-col gap-8"
        >
          {skillCategories.map((category) => (
            <div key={category.id} className="flex flex-col gap-4">
              <h3 className="label">{t(category.id)}</h3>
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
                {category.skills.map((skill, index) => (
                  <SkillCard
                    key={`${category.id}-${skill.name}`}
                    skill={skill}
                    index={index}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
