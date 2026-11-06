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
import { alternates, breadcrumbJsonLd, openGraph } from "@/lib/seo";
import { profile } from "@/content/profile";
import type { ProjectKind } from "@/content/types";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/* Every project is known at build time, so an unknown slug is a 404 —
   not a page to render on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const description = project.tagline[locale as Locale];

  return {
    title: project.name,
    description,
    alternates: alternates(`/work/${project.slug}`, locale),
    openGraph: openGraph({
      title: project.name,
      description,
      path: `/work/${project.slug}`,
      locale,
      image: project.cover,
    }),
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
    { key: "problem", value: project.problem?.[lang] ?? null },
    { key: "solution", value: project.solution?.[lang] ?? null },
    { key: "result", value: project.result?.[lang] ?? null },
    { key: "contribution", value: project.contribution?.[lang] ?? null },
  ];

  /* Richer type by project kind — SoftwareApplication gets rich results
     Google won't show on a plain CreativeWork. */
  const applicationCategory: Record<ProjectKind, string | null> = {
    saas: "BusinessApplication",
    mobile: "MobileApplication",
    web: "WebApplication",
    ecommerce: "BusinessApplication",
    business: null,
    bot: "UtilitiesApplication",
    game: "GameApplication",
  };
  const opSystem: Record<ProjectKind, string | undefined> = {
    saas: "Web",
    mobile: "iOS, Android",
    web: "Web",
    ecommerce: "Web",
    business: "Web",
    bot: "Web",
    game: "Web",
  };
  const schemaType = applicationCategory[project.kind]
    ? "SoftwareApplication"
    : "CreativeWork";
  const coverUrl = project.cover
    ? project.cover.startsWith("http")
      ? project.cover
      : `${site.url}${project.cover}`
    : undefined;

  const workJsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${site.url}/work/${project.slug}#work`,
    name: project.name,
    headline: project.name,
    description: project.tagline[lang],
    url: `${site.url}/work/${project.slug}`,
    image: coverUrl,
    thumbnailUrl: coverUrl,
    inLanguage: lang,
    keywords: project.stack.join(", "),
    dateCreated: project.year ? `${project.year}-01-01` : undefined,
    datePublished: project.year ? `${project.year}-01-01` : undefined,
    applicationCategory: applicationCategory[project.kind] ?? undefined,
    operatingSystem:
      schemaType === "SoftwareApplication" ? opSystem[project.kind] : undefined,
    ...(schemaType === "SoftwareApplication"
      ? {
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }
      : {}),
    author: {
      "@type": "Person",
      "@id": `${site.url}#person`,
      name: profile.fullName ?? profile.firstName,
      url: site.url,
    },
    creator: { "@id": `${site.url}#person` },
    publisher: { "@id": `${site.url}#person` },
    sameAs: project.links
      .filter((link) => link.kind === "live")
      .map((link) => link.href),
  };

  const crumbs = breadcrumbJsonLd(
    [
      { name: "Home", path: "/" },
      { name: t("breadcrumb"), path: "/work" },
      { name: project.name, path: `/work/${project.slug}` },
    ],
    locale,
  );

  const jsonLd = { "@context": "https://schema.org", "@graph": [workJsonLd, crumbs] };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      <Container className="py-10 sm:py-14">
        <CtaBanner />
      </Container>
    </>
  );
}
