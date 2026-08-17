import { ArrowRight, Box, Clock, Code, Smile } from "lucide-react";
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
  experience: Box,
  response: Clock,
} as const;

function Squiggle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      fill="none"
      className="pointer-events-none absolute bottom-4 right-4 h-16 w-24 text-accent opacity-80"
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

/**
 * Two columns, two rows. Row 1 is the featured work beside the stats and
 * technology cards; row 2 is what-I-do beside the contact card. Because
 * both columns share the same grid rows, row 1 is exactly as tall on both
 * sides, so the divider between the rows runs unbroken across the page.
 */
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
    <div className="grid gap-x-6 px-5 py-8 sm:px-7 lg:pl-12 lg:pr-8 xl:grid-cols-[minmax(0,1fr)_23rem] xl:grid-rows-[auto_auto_auto] xl:pl-16 xl:pr-12">
      {/* Row 1 — left: featured work */}
      <div className="flex flex-col gap-4 xl:col-start-1 xl:row-start-1">
        <Reveal>
          <div className="flex h-5 items-center justify-between gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              {t("featuredEyebrow")}
            </span>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
            >
              {tc("viewAll")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="flex-1">
          <ul className="grid h-full gap-4 sm:grid-cols-2 2xl:grid-cols-4">
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
      </div>

      {/* Row 1 — right: stats + technologies */}
      <aside className="mt-6 flex flex-col gap-4 xl:col-start-2 xl:row-start-1 xl:mt-0">
        <div className="hidden h-5 xl:block" aria-hidden />

        <Reveal>
          <Card hover={false} className="overflow-hidden">
            <div className="grid grid-cols-2">
              {metrics.map((metric, index) => {
                const Icon = statIcon[metric.id as keyof typeof statIcon] ?? Code;

                return (
                  <div
                    key={metric.id}
                    className={`stat-cell flex items-center gap-3 px-4 py-4 ${
                      index % 2 === 0 ? "border-r border-border" : ""
                    } ${index < 2 ? "border-b border-border" : ""}`}
                  >
                    <Icon className="stat-icon h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                    <div className="flex min-w-0 flex-col leading-tight">
                      <span className="text-xl font-extrabold tracking-tight">
                        <Counter value={metric.value} suffix={metric.suffix} />
                      </span>
                      <span className="truncate text-[0.625rem] text-muted">
                        {tm(metric.id)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={80} className="flex flex-1 flex-col">
          <Card hover={false} className="flex h-full flex-col gap-3 p-4">
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted">
              {ts("stripTitle")}
            </span>
            <ul className="grid flex-1 grid-cols-5 content-start gap-2">
              {strip.map((name) => (
                <li
                  key={name}
                  title={name}
                  className="tile flex flex-col items-center gap-1.5 rounded-[var(--radius-sm)] border border-border px-1 py-2"
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
      </aside>

      {/* Divider — spans both columns */}
      <div
        className="my-8 h-px w-full bg-border-strong opacity-70 xl:col-span-2 xl:row-start-2 xl:my-0 xl:mb-8 xl:mt-8"
        aria-hidden
      />

      {/* Row 2 — left: what I do */}
      <div className="xl:col-start-1 xl:row-start-3">
        <WhatIDo />
      </div>

      {/* Row 2 — right: contact */}
      <div className="mt-6 flex flex-col xl:col-start-2 xl:row-start-3 xl:mt-0">
        <Reveal delay={120} className="flex flex-1 flex-col">
          <Card hover={false} className="relative flex h-full flex-col gap-3 overflow-hidden p-5">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent">
              {tcta("railTitle")}
            </span>
            <p className="max-w-[16rem] text-sm text-muted">{tcta("railSubtitle")}</p>
            <Link
              href="/contact"
              className={`${buttonVariants({ size: "sm" })} mt-auto w-fit`}
            >
              {tcta("railButton")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </Link>
            <Squiggle />
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
