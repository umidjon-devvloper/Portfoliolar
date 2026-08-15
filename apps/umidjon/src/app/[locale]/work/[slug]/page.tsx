import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { TechTag } from "@/components/ui/tech-tag";
import { CtaBanner } from "@/components/ui/cta-banner";
import { buttonVariants } from "@/components/ui/button";
import { getProjectBySlug, projects } from "@/content/projects";
import { site } from "@/content/site";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline[locale as Locale],
    openGraph: {
      title: project.name,
      description: project.tagline[locale as Locale],
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const lang = locale as Locale;

  const blocks = [
    { key: "problem", value: project.problem[lang] },
    { key: "solution", value: project.solution[lang] },
    { key: "result", value: project.result?.[lang] ?? null },
  ];

  return (
    <>
      <Container className="flex flex-col gap-5 py-8 sm:py-12">
        <Breadcrumb current={t("breadcrumb")} />

        <Link
          href="/work"
          className="group inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t("backToWork")}
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="type-page">{project.name}</h1>
            <p className="text-accent">{project.tagline[lang]}</p>
          </div>
          {project.year ? (
            <span className="text-sm text-muted">{project.year}</span>
          ) : null}
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.name}
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="dotted absolute inset-0 grid place-items-center text-sm font-semibold text-border-strong">
              {project.name}
            </span>
          )}
        </div>
      </Container>

      <Container className="grid gap-8 pb-4 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-7">
          {blocks.map((block) =>
            block.value ? (
              <div key={block.key} className="flex flex-col gap-2">
                <h2 className="eyebrow">{t(block.key)}</h2>
                <p className="leading-relaxed text-muted">{block.value}</p>
              </div>
            ) : null,
          )}
        </div>

        <Card hover={false} className="flex h-fit flex-col gap-6 p-6">
          <div className="flex flex-col gap-2.5">
            <h2 className="eyebrow">{t("stack")}</h2>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <TechTag key={item} name={item} />
              ))}
            </div>
          </div>

          {project.client ? (
            <div className="flex flex-col gap-1.5">
              <h2 className="eyebrow">{t("client")}</h2>
              <p className="text-sm text-muted">{project.client}</p>
            </div>
          ) : null}

          {project.integrations.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              <h2 className="eyebrow">{t("integrations")}</h2>
              <div className="flex flex-wrap gap-1.5">
                {project.integrations.map((item) => (
                  <TechTag key={item} name={item} />
                ))}
              </div>
            </div>
          ) : null}

          {project.components.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h2 className="eyebrow">{t("components")}</h2>
              <ul className="flex flex-col gap-1.5">
                {project.components.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.links.length > 0 ? (
            <div className="flex flex-col gap-2 border-t border-border pt-5">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonVariants({ variant: "secondary", size: "sm" })}
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          ) : null}
        </Card>
      </Container>

      <Container className="py-12 sm:py-16">
        <CtaBanner />
      </Container>
    </>
  );
}
