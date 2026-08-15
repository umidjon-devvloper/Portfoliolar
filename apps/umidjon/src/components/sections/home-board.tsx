import { ArrowRight } from "lucide-react";
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

const iconFor: Record<string, string> = {
  projects: "Boxes",
  clients: "Smile",
  experience: "Trophy",
  response: "Clock",
};

/**
 * The board: featured work on the left, a rail of stats, technologies and
 * the contact prompt on the right. Collapses to one column below xl.
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
    <div className="grid gap-5 px-5 py-8 sm:px-7 xl:grid-cols-[minmax(0,1fr)_22rem] xl:px-10">
      <div className="flex flex-col gap-5">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="eyebrow">{t("featuredEyebrow")}</span>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
            >
              {tc("viewAll")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Stagger>
          <ul className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                priority={index === 0}
              />
            ))}
          </ul>
        </Stagger>
      </div>

      <aside className="flex flex-col gap-4">
        <Reveal>
          <Card hover={false} className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex flex-col gap-1 p-4">
                <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </span>
                <span className="text-[0.6875rem] leading-snug text-muted">
                  {tm(metric.id)}
                </span>
              </div>
            ))}
          </Card>
        </Reveal>

        <Reveal delay={60}>
          <Card hover={false} className="flex flex-col gap-3 p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {ts("stripTitle")}
            </span>
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5 xl:grid-cols-4">
              {strip.map((name) => (
                <li
                  key={name}
                  title={name}
                  className="flex flex-col items-center gap-1.5 rounded-[var(--radius-sm)] border border-border p-2 transition-colors hover:border-accent"
                >
                  <TechIcon
                    slug={lookup.get(name) ?? null}
                    fallback={name}
                    className="h-4 w-4"
                  />
                  <span className="w-full truncate text-center text-[0.5625rem] text-muted">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <Card hover={false} className="relative flex flex-col gap-3 overflow-hidden p-5">
            <span className="pointer-events-none absolute inset-0 glow" aria-hidden />
            <div className="relative flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                {tcta("railTitle")}
              </span>
              <p className="text-sm text-muted">{tcta("subtitle")}</p>
            </div>
            <Link
              href="/contact"
              className={`${buttonVariants({ size: "sm" })} relative w-fit`}
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
