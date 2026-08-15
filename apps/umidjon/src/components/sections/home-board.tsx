import { ArrowRight, Boxes, Clock, Code, Smile, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { TechIcon } from "@/components/ui/tech-icon";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { featuredProjects } from "@/content/projects";
import { metrics } from "@/content/profile";
import { skillCategories } from "@/content/skills";
import { ProjectCard } from "./project-card";
import { WhatIDo } from "./what-i-do";

const strip = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "React Native",
  "Tailwind CSS",
  "Expo",
  "Firebase",
  "Figma",
];

const statIcon = {
  projects: Code,
  clients: Smile,
  experience: Boxes,
  response: Clock,
} as const;

/** Hand-drawn curl pointing at the button, as in the design. */
function Squiggle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      fill="none"
      className="pointer-events-none absolute bottom-3 right-3 h-16 w-24 text-accent opacity-80"
    >
      <path
        d="M112 6 C 96 4, 70 18, 74 40 C 78 62, 106 58, 100 40 C 94 22, 60 30, 46 46 C 34 60, 24 66, 10 70"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 60 L 10 70 L 24 72"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeBoard() {
  const t = useTranslations("projects");
  const tm = useTranslations("metrics");
  const ts = useTranslations("skills");
  const tc = useTranslations("common");
  const tcta = useTranslations("cta");

  const lookup = new Map(
    skillCategories.flatMap((category) =>
      category.skills.map((skill) => [skill.name, skill.icon] as const),
    ),
  );

  return (
    <div className="grid gap-4 px-5 py-6 sm:px-7 lg:pl-12 lg:pr-8 xl:grid-cols-[minmax(0,1fr)_23rem] xl:pl-16 xl:pr-12">
      {/* Left column: header row, cards, closing pillars */}
      <div className="flex flex-col gap-4">
        <Reveal>
          <div className="flex h-5 items-center justify-between gap-3">
            <span className="eyebrow">{t("featuredEyebrow")}</span>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
            >
              {tc("viewAll")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Stagger>
          <ul className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                priority={index < 2}
              />
            ))}
          </ul>
        </Stagger>

        <WhatIDo />
      </div>

      {/* Right rail: starts level with the cards (spacer matches the header row) */}
      <aside className="flex flex-col gap-4">
        <div className="hidden h-5 xl:block" aria-hidden />

        <Reveal>
          <Card hover={false} className="overflow-hidden">
            <div className="grid grid-cols-2">
              {metrics.map((metric, index) => {
                const Icon = statIcon[metric.id as keyof typeof statIcon] ?? Code;

                return (
                  <div
                    key={metric.id}
                    className={`flex items-center gap-3 p-4 ${
                      index % 2 === 0 ? "border-r border-border" : ""
                    } ${index < 2 ? "border-b border-border" : ""}`}
                  >
                    <Icon className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} />
                    <div className="flex min-w-0 flex-col leading-tight">
                      <span className="text-xl font-extrabold tracking-tight">
                        <Counter value={metric.value} suffix={metric.suffix} />
                      </span>
                      <span className="truncate text-[0.6875rem] text-muted">
                        {tm(metric.id)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={60}>
          <Card hover={false} className="flex flex-col gap-3 p-4">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted">
              {ts("stripTitle")}
            </span>
            <ul className="grid grid-cols-5 gap-2">
              {strip.map((name) => (
                <li
                  key={name}
                  title={name}
                  className="flex flex-col items-center gap-1.5 rounded-[var(--radius-sm)] border border-border px-1 py-2 transition-colors hover:border-accent"
                >
                  <TechIcon
                    slug={lookup.get(name) ?? null}
                    fallback={name}
                    className="h-4 w-4"
                  />
                  <span className="w-full truncate text-center text-[0.5rem] text-muted">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={120} className="flex flex-1 flex-col">
          <Card hover={false} className="relative flex h-full flex-col gap-3 overflow-hidden p-4">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent">
              {tcta("railTitle")}
            </span>
            <p className="max-w-[16rem] text-sm text-muted">{tcta("railSubtitle")}</p>
            <Link
              href="/contact"
              className={`${buttonVariants({ size: "sm" })} mt-auto w-fit`}
            >
              {tcta("railButton")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
            <Squiggle />
          </Card>
        </Reveal>
      </aside>
    </div>
  );
}
