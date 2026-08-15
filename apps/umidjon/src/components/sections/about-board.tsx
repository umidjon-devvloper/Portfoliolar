import { ArrowRight, Box, Clock, Code, Quote, Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { TechIcon } from "@/components/ui/tech-icon";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { metrics } from "@/content/profile";
import { roles } from "@/content/experience";
import { skillCategories } from "@/content/skills";

const statIcon = {
  projects: Code,
  clients: Smile,
  experience: Box,
  response: Clock,
} as const;

/** Three groups shown as icon grids, mirroring the design's tool board. */
const toolGroups = [
  { id: "frontend", names: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"] },
  { id: "backend", names: ["Node.js", "Express.js", "MongoDB", "Firebase", "GraphQL"] },
  { id: "tools", names: ["Git", "GitHub", "Vercel", "Figma", "Expo"] },
];

function SectionRule({ children }: { children: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
        {children}
      </span>
      <span className="h-0.5 w-12 rounded bg-accent" aria-hidden />
    </div>
  );
}

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
    <div className="grid gap-8 px-5 py-10 sm:px-7 lg:grid-cols-3 lg:gap-6 lg:pl-12 lg:pr-8 xl:pl-16 xl:pr-12">
      {/* Journey */}
      <section className="flex flex-col gap-5">
        <Reveal>
          <SectionRule>{t("journeyTitle")}</SectionRule>
        </Reveal>

        <Stagger>
          <ol className="flex flex-col gap-5 border-l border-border pl-5">
            {roles.map((role, index) => (
              <StaggerItem key={role.id} index={index}>
                <li className="relative">
                  <span
                    className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full bg-accent"
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-accent">
                      {te(`${role.id}.period`)}
                    </span>
                    <h3 className="text-sm font-bold">{te(`${role.id}.title`)}</h3>
                    <p className="text-xs leading-relaxed text-muted">
                      {te(`${role.id}.description`)}
                    </p>
                  </div>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </Stagger>

        <Reveal delay={80}>
          <Card hover={false} className="flex flex-col gap-2 p-5">
            <Quote className="h-4 w-4 text-accent" />
            <p className="text-sm leading-relaxed">{t("quote")}</p>
            <span className="self-end text-xs text-muted">— {t("quoteAuthor")}</span>
          </Card>
        </Reveal>
      </section>

      {/* Skills & tools */}
      <section className="flex flex-col gap-5">
        <Reveal>
          <SectionRule>{ts("toolsTitle")}</SectionRule>
        </Reveal>

        <Stagger className="flex flex-col gap-5">
          {toolGroups.map((group, groupIndex) => (
            <StaggerItem key={group.id} index={groupIndex}>
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-medium text-accent">{ts(group.id)}</span>
                <ul className="grid grid-cols-5 gap-2">
                  {group.names.map((name) => (
                    <li
                      key={name}
                      title={name}
                      className="tile flex flex-col items-center gap-1.5 rounded-[var(--radius-sm)] border border-border px-1 py-2.5"
                    >
                      <TechIcon
                        slug={lookup.get(name) ?? null}
                        fallback={name}
                        className="h-5 w-5"
                      />
                      <span className="w-full truncate text-center text-[0.5rem] text-muted">
                        {name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Numbers + closing card */}
      <section className="flex flex-col gap-5">
        <Reveal>
          <SectionRule>{t("numbersTitle")}</SectionRule>
        </Reveal>

        <Stagger>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, index) => {
              const Icon = statIcon[metric.id as keyof typeof statIcon] ?? Code;

              return (
                <StaggerItem key={metric.id} index={index}>
                  <Card className="flex h-full flex-col gap-2 p-4">
                    <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
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

        <Reveal delay={120} className="flex flex-1 flex-col">
          <Card hover={false} className="relative flex h-full flex-col gap-3 overflow-hidden p-5">
            <span className="pointer-events-none absolute inset-0 glow" aria-hidden />
            <p className="relative text-sm font-semibold leading-snug">
              {tcta("aboutTitle")}
            </p>
            <Link
              href="/contact"
              className={`${buttonVariants({ size: "sm" })} relative mt-auto w-fit`}
            >
              {tcta("railButton")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </Link>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
