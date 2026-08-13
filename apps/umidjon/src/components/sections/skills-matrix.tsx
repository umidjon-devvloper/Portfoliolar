"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { TechIcon } from "@/components/ui/tech-icon";
import { skillCategories, tierWeight, type Skill } from "@/content/skills";

function SkillMeter({ skill, index }: { skill: Skill; index: number }) {
  const t = useTranslations("skills");
  const shouldReduceMotion = useReducedMotion();
  const fill = skill.level !== null ? skill.level / 100 : tierWeight[skill.tier];

  return (
    <motion.li
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="card group relative rounded-xl p-4"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-background/60 transition-colors group-hover:border-accent">
          <TechIcon
            slug={skill.icon}
            fallback={skill.name}
            className="h-4 w-4 text-muted transition-colors group-hover:text-accent-2"
          />
        </span>

        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-medium">{skill.name}</span>
          <span className="label !text-[0.5625rem] !tracking-[0.16em]">
            {skill.level !== null ? `${skill.level}%` : t(`tier.${skill.tier}`)}
          </span>
        </div>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: fill }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            delay: 0.15 + index * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: "left",
            background: "linear-gradient(90deg, var(--accent-2), var(--accent))",
          }}
          className="h-full w-full rounded-full"
        />
      </div>
    </motion.li>
  );
}

export function SkillsMatrix() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="relative z-10 border-y border-border bg-surface">
      <Container className="flex flex-col gap-14 py-24 sm:py-32">
        <div className="flex flex-col gap-4">
          <span className="label flex items-center gap-3">
            <span className="h-px w-8 gradient-rule" aria-hidden />
            {t("label")}
          </span>
          <h2 className="font-display type-display max-w-2xl text-balance">
            {t("title")}
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {skillCategories.map((category) => (
            <div key={category.id} className="flex flex-col gap-5">
              <h3 className="label">{t(category.id)}</h3>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {category.skills.map((skill, index) => (
                  <SkillMeter
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
