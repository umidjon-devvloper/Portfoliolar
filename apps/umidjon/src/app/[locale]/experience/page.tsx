import type { Metadata } from "next";
import { ArrowRight, Award, Clock, Code, Smile } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PageVisual } from "@/components/ui/page-visual";
import { CodeVisual } from "@/components/ui/code-visual";
import { buildExperienceSnippet } from "@/content/code-sample";
import { roles } from "@/content/experience";
import { Card } from "@/components/ui/card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ExperienceBoard } from "@/components/sections/experience-board";
import { ProjectCard } from "@/components/sections/project-card";
import { featuredProjects, projects } from "@/content/projects";
import { metrics } from "@/content/profile";
import { alternates, openGraph } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experience" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: alternates("/experience", locale),
    openGraph: openGraph({
      title: t("pageTitle"),
      description: t("pageSubtitle"),
      path: "/experience",
      locale,
    }),
  };
}

const statIcon = {
  projects: Code,
  clients: Smile,
  experience: Award,
  response: Clock,
} as const;

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "experience" });
  const tm = await getTranslations({ locale, namespace: "metrics" });
  const tp = await getTranslations({ locale, namespace: "projects" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <Container className="border-b border-border py-10 sm:py-12">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          index="05"
          lead={t("headingLead")}
          accent={t("headingAccent")}
          description={t("pageSubtitle")}
          visual={
            <PageVisual
              page="experience"
              alt={t("pageTitle")}
              fallback={
                <CodeVisual
                  filename="experience.js"
                  lines={buildExperienceSnippet({
                    since: "2021",
                    roles: roles.length,
                    current: t("fullstack.title"),
                    agency: "Umidjon Agency",
                    projects: projects.length,
                    stack: ["Next.js", "React", "Node.js"],
                  })}
                />
              }
            />
          }
        />
      </Container>

      <Container className="flex flex-col gap-8 py-10 sm:py-12">
        <Reveal>
          <ExperienceBoard />
        </Reveal>

        <section className="flex flex-col gap-5">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.14em]">
                {t("contributedTitle")}
              </h2>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
              >
                {tc("viewAll")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>

          <Stagger>
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </ul>
          </Stagger>
        </section>

        <section className="flex flex-col gap-5">
          <Reveal>
            <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.14em]">
              {t("achievementsTitle")}
            </h2>
          </Reveal>

          <Stagger>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => {
                const Icon = statIcon[metric.id as keyof typeof statIcon] ?? Code;

                return (
                  <StaggerItem key={metric.id} index={index}>
                    <Card className="flex h-full items-start gap-4 p-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-2xl font-extrabold tracking-tight">
                          <Counter value={metric.value} suffix={metric.suffix} />
                        </span>
                        <span className="text-[0.8125rem] font-medium">
                          {tm(metric.id)}
                        </span>
                        <span className="text-[0.6875rem] leading-snug text-muted">
                          {tm(`${metric.id}Note`)}
                        </span>
                      </div>
                    </Card>
                  </StaggerItem>
                );
              })}
            </div>
          </Stagger>
        </section>

        <Reveal>
          <CtaBanner />
        </Reveal>
      </Container>
    </>
  );
}
