import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug, projects } from "@/content/projects";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

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
  };
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
      <Section className="border-b border-border">
        <div className="flex flex-col gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {tc("backToProjects")}
          </Link>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            {project.name}
          </h1>
          <p className="max-w-2xl text-lg text-muted">{project.tagline[lang]}</p>

          {project.links.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            {blocks.map((block) =>
              block.value ? (
                <div key={block.key} className="flex flex-col gap-3">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {t(block.key)}
                  </h2>
                  <p className="text-base leading-relaxed text-muted">
                    {block.value}
                  </p>
                </div>
              ) : null,
            )}
          </div>

          <aside className="flex flex-col gap-8">
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
                    <li key={item} className="text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>
    </>
  );
}
