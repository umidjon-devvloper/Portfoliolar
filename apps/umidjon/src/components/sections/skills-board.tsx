"use client";

import {
  BookOpen,
  CircleEllipsis,
  Cloud,
  CreditCard,
  Code,
  Cpu,
  Database,
  Gauge,
  GraduationCap,
  MonitorSmartphone,
  Rocket,
  Server,
  Smartphone,
  Star,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Principles } from "@/components/ui/principles";
import { TechIcon } from "@/components/ui/tech-icon";
import { Counter } from "@/components/motion/counter";
import { buttonVariants } from "@/components/ui/button";
import { useInView } from "@/lib/use-in-view";
import { skillCategories, type Skill } from "@/content/skills";
import { metrics } from "@/content/profile";
import { cn } from "@/lib/utils";

const categoryIcon: Record<string, typeof Code> = {
  frontend: MonitorSmartphone,
  backend: Server,
  database: Database,
  mobile: Smartphone,
  devops: Cloud,
  payments: CreditCard,
  others: CircleEllipsis,
};

const pillars = [
  { id: "stack", icon: Cpu },
  { id: "architecture", icon: GraduationCap },
  { id: "performance", icon: Gauge },
  { id: "learning", icon: BookOpen },
];

const statIcon = {
  projects: Code,
  clients: Star,
  experience: Rocket,
  response: BookOpen,
} as const;

const toolStrip = [
  "Git",
  "GitHub",
  "Vercel",
  "Figma",
  "Firebase",
  "Expo",
  "Netlify",
  "Cloudflare",
  "MongoDB",
  "Payme",
];

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <li className="stagger-item flex items-center gap-2.5 rounded-[var(--radius-btn)] border border-border bg-surface px-3 py-2 transition-colors duration-300 hover:border-accent/50">
      <TechIcon
        slug={skill.icon}
        fallback={skill.name}
        className="h-[16px] w-[16px] shrink-0"
      />
      <span className="truncate text-[0.8125rem]">{skill.name}</span>
    </li>
  );
}

export function SkillsBoard() {
  const t = useTranslations("skills");
  const tm = useTranslations("metrics");
  const tcta = useTranslations("cta");
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

  const lookup = new Map(
    skillCategories.flatMap((category) =>
      category.skills.map((skill) => [skill.name, skill.icon] as const),
    ),
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Four principles */}
      <Principles
        items={pillars.map((pillar) => ({
          id: pillar.id,
          icon: pillar.icon,
          title: t(`pillars.${pillar.id}.title`),
          description: t(`pillars.${pillar.id}.description`),
        }))}
      />

      {/* Technical skills — one frame around filters and every category */}
      <Card hover={false} className="flex flex-col gap-6 p-6 sm:p-7">
        <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.14em]">
          {t("technicalTitle")}
        </h2>

        <div
          className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
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
          className="stagger grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {visible.map((category) => {
            const Icon = categoryIcon[category.id] ?? Code;

            return (
              <div
                key={category.id}
                className="group flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-background/40 p-5 transition-colors duration-300 hover:border-accent/50"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <h3 className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] transition-colors group-hover:text-accent">
                    {t(category.id)}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillRow key={`${category.id}-${skill.name}`} skill={skill} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tool strip */}
      <Card hover={false} className="flex flex-col gap-6 p-6 sm:p-7">
        <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.14em]">
          {t("toolStripTitle")}
        </h2>
        <ul className="grid grid-cols-5 gap-4 sm:grid-cols-10">
          {toolStrip.map((name) => (
            <li key={name} className="group flex flex-col items-center gap-2">
              <TechIcon
                slug={lookup.get(name) ?? null}
                fallback={name}
                className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="w-full truncate text-center text-[0.625rem] text-muted">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Numbers */}
      <Card hover={false} className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = statIcon[metric.id as keyof typeof statIcon] ?? Code;

          return (
            <div
              key={metric.id}
              className={cn(
                "stat-cell flex items-center gap-4 p-5",
                index > 0 && "lg:border-l lg:border-border",
              )}
            >
              <Icon className="stat-icon h-7 w-7 shrink-0 text-accent" strokeWidth={1.3} />
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-extrabold tracking-tight">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </span>
                <span className="text-[0.6875rem] text-muted">{tm(metric.id)}</span>
              </div>
            </div>
          );
        })}
      </Card>

      {/* Closing prompt */}
      <Card hover={false} className="relative flex flex-col items-start gap-4 overflow-hidden p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <span className="pointer-events-none absolute inset-0 glow" aria-hidden />
        <div className="relative flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
            <Zap className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="font-semibold">{tcta("skillsTitle")}</span>
            <span className="text-sm text-muted">{tcta("skillsSubtitle")}</span>
          </div>
        </div>

        <Link href="/contact" className={`${buttonVariants({ size: "md" })} relative`}>
          {tcta("skillsButton")}
        </Link>
      </Card>
    </div>
  );
}
