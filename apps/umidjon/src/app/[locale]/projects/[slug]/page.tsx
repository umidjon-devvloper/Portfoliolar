import type { Metadata } from "next";
import { Apple, ArrowLeft, ExternalLink, Github, Play } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { getProjectBySlug, projects } from "@/content/projects";
import { site } from "@/content/site";
import type { ProjectLink } from "@/content/types";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const linkIcons = {
  live: ExternalLink,
  repo: Github,
  appStore: Apple,
  playStore: Play,
} as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline[locale as Locale],
    openGraph: {
      title: project.name,
      description: project.tagline[locale as Locale],
      url: `${site.url}/projects/${project.slug}`,
    },
  };
}

function LinkButton({ link }: { link: ProjectLink }) {
  const Icon = linkIcons[link.kind];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
    >
      {link.label}
      <Icon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const lang = locale as Locale;

  const blocks = [
    { key: "problem", value: project.problem[lang] },
    { key: "solution", value: project.solution[lang] },
    { key: "result", value: project.result?.[lang] ?? null },
  ];

  return (
    <>
      <section className="noise relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 aurora opacity-60" />
        <Section className="relative">
          <div className="flex flex-col gap-6">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 self-start text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {tc("backToProjects")}
            </Link>

            <div className="flex flex-wrap items-baseline gap-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                {project.name}
              </h1>
              {project.year ? (
                <span className="font-mono text-sm text-muted">
                  {project.year}
                </span>
              ) : null}
            </div>

            <p className="max-w-2xl text-lg text-muted">{project.tagline[lang]}</p>

            {project.links.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <LinkButton key={link.href} link={link} />
                ))}
              </div>
            ) : null}
          </div>
        </Section>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            {blocks.map((block, index) =>
              block.value ? (
                <Reveal key={block.key} delay={index * 0.08}>
                  <div className="flex flex-col gap-3">
                    <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {t(block.key)}
                      <span className="h-px w-8 bg-accent/40" aria-hidden />
                    </h2>
                    <p className="text-base leading-relaxed text-muted">
                      {block.value}
                    </p>
                  </div>
                </Reveal>
              ) : null,
            )}
          </div>

          <Reveal delay={0.1}>
            <aside className="flex flex-col gap-8 rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
              {project.stack.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {t("stack")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.integrations.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {t("integrations")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.integrations.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.components.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {t("components")}
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {project.components.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
