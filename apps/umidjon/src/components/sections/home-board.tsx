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
  projects: Boxes,
  clients: Smile,
  experience: Trophy,
  response: Clock,
} as const;

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
    <div className="grid items-stretch gap-4 px-5 py-6 sm:px-7 lg:pl-12 lg:pr-8 xl:grid-cols-[minmax(0,1fr)_23rem] xl:pl-16 xl:pr-12">
      <div className="flex flex-col gap-4">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
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
      </div>

      <aside className="flex min-h-full flex-col gap-4">
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
                    <Icon className="h-5 w-5 shrink-0 text-accent" />
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
            <span className="pointer-events-none absolute inset-0 glow" aria-hidden />
            <span className="relative text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted">
              {tcta("railTitle")}
            </span>
            <p className="relative text-sm text-muted">{tcta("subtitle")}</p>
            <Link
              href="/contact"
              className={`${buttonVariants({ size: "sm" })} relative mt-auto w-fit`}
            >
              {tcta("button")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Card>
        </Reveal>
      </aside>
    </div>
  );
}
