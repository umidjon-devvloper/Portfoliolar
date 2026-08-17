import { ArrowRight, Box, Clock, Code, Smile } from "lucide-react";
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

/* Five names per group keeps this column level with its neighbours. */
const toolGroups = [
  {
    id: "frontend",
    names: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    names: ["Node.js", "Express.js", "REST API", "MongoDB", "Firebase"],
  },
  {
    id: "mobile",
    names: ["React Native", "Expo", "Expo EAS", "App Store", "Google Play"],
  },
  {
    id: "tools",
    names: ["Git", "GitHub", "Vercel", "Cloudflare", "Figma"],
  },
  {
    id: "payments",
    names: ["Payme", "Click", "Uzum", "Visa", "MasterCard"],
  },
];

function ColumnHeading({ children }: { children: string }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em]">{children}</h2>
      <span className="rule-taper" aria-hidden />
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
    <div className="grid items-stretch gap-10 px-5 py-10 sm:px-7 lg:pl-12 lg:pr-8 xl:grid-cols-3 xl:gap-12 xl:pl-16 xl:pr-12">
      {/* My journey — periods in their own column, as in the design */}
      <section className="flex flex-col gap-6">
        <Reveal>
          <ColumnHeading>{t("journeyTitle")}</ColumnHeading>
        </Reveal>

        <Stagger className="shrink-0">
          <ol className="flex flex-col">
            {roles.map((role, index) => {
              const last = index === roles.length - 1;

              return (
                <StaggerItem key={role.id} index={index}>
                  <li className="grid grid-cols-[0.5rem_6.5rem_0.375rem_1fr] items-start gap-x-3">
                    {/* period node */}
                    <span className="relative flex h-full justify-center">
                      {!last ? (
                        <span className="absolute inset-y-0 top-2 w-px bg-border" aria-hidden />
                      ) : null}
                      <span
                        className="relative mt-1.5 h-2 w-2 rounded-full bg-accent"
                        aria-hidden
                      />
                    </span>

                    <span className="text-right text-sm leading-6 text-accent">
                      {te(`${role.id}.shortPeriod`)}
                    </span>

                    {/* content node */}
                    <span className="relative flex h-full justify-center">
                      {!last ? (
                        <span className="absolute inset-y-0 top-2 w-px bg-border" aria-hidden />
                      ) : null}
                      <span
                        className="relative mt-2 h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden
                      />
                    </span>

                    <div className="flex flex-col gap-1.5 pb-8">
                      <h3 className="font-semibold leading-6">
                        {te(`${role.id}.title`)}
                      </h3>
                      <p className="text-xs leading-relaxed text-muted">
                        {te(`${role.id}.description`)}
                      </p>
                    </div>
                  </li>
                </StaggerItem>
              );
            })}
          </ol>
        </Stagger>

        <Reveal delay={120} className="mt-auto">
          <Card hover={false} className="relative overflow-hidden p-5">
            <span
              className="pointer-events-none absolute -bottom-6 -right-2 select-none font-serif text-[7rem] leading-none text-accent opacity-[0.07]"
              aria-hidden
            >
              &rdquo;
            </span>
            <span className="block font-serif text-3xl leading-none text-accent">
              &ldquo;
            </span>
            <p className="mt-2 text-sm leading-relaxed">{t("quote")}</p>
            <p className="mt-3 text-right text-xs text-muted">— {t("quoteAuthor")}</p>
          </Card>
        </Reveal>
      </section>

      {/* Skills & tools — plain icon grids, no frames */}
      <section className="col-divider flex flex-col gap-6">
        <Reveal>
          <ColumnHeading>{t("toolsTitle")}</ColumnHeading>
        </Reveal>

        <Stagger className="flex flex-1 flex-col justify-between gap-8">
          {toolGroups.map((group, groupIndex) => (
            <div key={group.id} className="flex flex-col gap-4">
              <h3 className="text-sm font-medium text-accent">{ts(group.id === "tools" ? "devops" : group.id)}</h3>
              <ul className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-5">
                {group.names.map((name, index) => (
                  <li
                    key={name}
                    className="stagger-item group flex flex-col items-center gap-2"
                    style={{ transitionDelay: `${(groupIndex * 5 + index) * 30}ms` }}
                  >
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
            </div>
          ))}
        </Stagger>
      </section>

      {/* Some numbers */}
      <section className="col-divider flex flex-col gap-6">
        <Reveal>
          <ColumnHeading>{t("numbersTitle")}</ColumnHeading>
        </Reveal>

        <Stagger className="shrink-0">
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, index) => {
              const Icon = statIcon[metric.id as keyof typeof statIcon] ?? Code;

              return (
                <StaggerItem key={metric.id} index={index}>
                  <Card className="flex h-full flex-col gap-2.5 p-4">
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
          <Reveal delay={180} className="mt-auto">
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
