import { ArrowRight, Box, Clock, Code, Quote, Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { TechIcon } from "@/components/ui/tech-icon";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { roles } from "@/content/experience";
import { metrics, profile } from "@/content/profile";
import { skillCategories } from "@/content/skills";

const statIcon = {
  projects: Code,
  clients: Smile,
  experience: Box,
  response: Clock,
} as const;

/** Three groups shown as icon grids, matching the design's Skills & Tools. */
const toolGroups = [
  {
    id: "frontend",
    names: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"],
  },
  {
    id: "backend",
    names: ["Node.js", "Express.js", "MongoDB", "Firebase", "GraphQL"],
  },
  {
    id: "tools",
    names: ["Git", "GitHub", "Vercel", "Figma", "Expo"],
  },
];

export function AboutBoard() {
  const t = useTranslations("about");
  const te = useTranslations("experience");
  const tm = useTranslations("metrics");
  const ts = useTranslations("skills");
  const tcta = useTranslations("cta");

  const lookup = new Map(
    skillCategories.flatMap((category) =>
      category.skills.map((skill) => [skill.name, skill.icon] as const),
    ),
  );

  return (
    <div className="grid gap-8 px-5 py-10 sm:px-7 lg:pl-12 lg:pr-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_20rem] xl:gap-10 xl:pl-16 xl:pr-12">
      {/* My journey */}
      <section className="flex flex-col gap-5">
        <Reveal>
          <h2 className="eyebrow border-b border-border pb-2.5">
            {t("journeyTitle")}
          </h2>
        </Reveal>

        <Stagger>
          <ol className="relative flex flex-col gap-6 border-l border-border pl-5">
            {roles.map((role, index) => (
              <StaggerItem key={role.id} index={index}>
                <li className="relative">
                  <span
                    className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full bg-accent ring-4 ring-background"
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-sm text-accent">
                        {te(`${role.id}.period`)}
                      </span>
                      <h3 className="font-semibold">{te(`${role.id}.title`)}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-muted">
                      {te(`${role.id}.description`)}
                    </p>
                  </div>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </Stagger>

        <Reveal delay={120}>
          <Card hover={false} className="flex gap-3 p-4">
            <Quote className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
            <div className="flex flex-col gap-2">
              <p className="text-sm leading-relaxed">{t("quote")}</p>
              <span className="text-xs text-muted">— {t("quoteAuthor")}</span>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* Skills & tools */}
      <section className="flex flex-col gap-5">
        <Reveal>
          <h2 className="eyebrow border-b border-border pb-2.5">
            {t("toolsTitle")}
          </h2>
        </Reveal>

        <Stagger className="flex flex-col gap-5">
          {toolGroups.map((group, groupIndex) => (
            <div key={group.id} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-accent">{ts(group.id)}</h3>
              <ul className="grid grid-cols-5 gap-2">
                {group.names.map((name, index) => (
                  <li
                    key={name}
                    className="stagger-item tile flex flex-col items-center gap-1.5 rounded-[var(--radius-sm)] border border-border px-1 py-2.5"
                    style={{ transitionDelay: `${(groupIndex * 5 + index) * 30}ms` }}
                  >
                    <TechIcon
                      slug={lookup.get(name) ?? null}
                      fallback={name}
                      className="h-5 w-5"
                    />
                    <span className="w-full truncate text-center text-[0.5625rem] text-muted">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>
      </section>

      {/* Some numbers */}
      <section className="flex flex-col gap-5">
        <Reveal>
          <h2 className="eyebrow border-b border-border pb-2.5">
            {t("numbersTitle")}
          </h2>
        </Reveal>

        <Stagger>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, index) => {
              const Icon = statIcon[metric.id as keyof typeof statIcon] ?? Code;

              return (
                <StaggerItem key={metric.id} index={index}>
                  <Card className="flex h-full flex-col gap-2 p-4">
                    <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight">
                      <Counter value={metric.value} suffix={metric.suffix} />
                    </span>
                    <span className="text-[0.6875rem] leading-snug text-muted">
                      {tm(metric.id)}
                    </span>
                  </Card>
                </StaggerItem>
              );
            })}
          </div>
        </Stagger>

        <Reveal delay={140}>
          <Card hover={false} className="relative flex flex-col gap-3 overflow-hidden p-4">
            <span className="pointer-events-none absolute inset-0 glow" aria-hidden />
            <p className="relative text-sm font-semibold leading-snug">
              {tcta("aboutTitle")}
            </p>
            <Link
              href="/contact"
              className={`${buttonVariants({ size: "sm" })} relative w-fit`}
            >
              {tcta("railButton")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </Link>
          </Card>
        </Reveal>

        {profile.contact.agency ? (
          <Reveal delay={180}>
            <a
              href={profile.contact.agency}
              target="_blank"
              rel="noreferrer noopener"
              className="card card-hover flex items-center justify-between gap-3 p-4 text-sm"
            >
              <span className="flex flex-col">
                <span className="font-medium">umidjon.agency</span>
                <span className="text-xs text-muted">{t("agencyNote")}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
            </a>
          </Reveal>
        ) : null}
      </section>
    </div>
  );
}
