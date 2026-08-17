import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBanner } from "@/components/ui/cta-banner";
import { PageVisual } from "@/components/ui/page-visual";
import { CodeVisual } from "@/components/ui/code-visual";
import { buildObjectSnippet } from "@/content/code-sample";
import { WorkIndex } from "@/components/sections/work-index";
import { featuredProjects, projects } from "@/content/projects";
import { alternates, openGraph } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternates("/work", locale),
    openGraph: openGraph({
      title: t("title"),
      description: t("subtitle"),
      path: "/work",
      locale,
    }),
  };
}

/* Counted from the project list so the window can never overstate it. */
const liveProjects = projects.filter((project) =>
  project.links.some((link) => link.kind === "live"),
).length;

const projectKinds = [...new Set(projects.map((project) => project.kind))];

const topStack = Object.entries(
  projects
    .flatMap((project) => project.stack)
    .reduce<Record<string, number>>((counts, item) => {
      counts[item] = (counts[item] ?? 0) + 1;
      return counts;
    }, {}),
)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 4)
  .map(([item]) => item);

export default async function WorkPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <>
      <Container className="border-b border-border py-8 sm:py-10">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          index="03"
          lead={t("headingLead")}
          accent={t("headingAccent")}
          description={t("subtitle")}
          caret
          visual={
            <PageVisual
              page="work"
              alt={t("title")}
              fallback={
                <CodeVisual
                  filename="work.js"
                  lines={buildObjectSnippet("work", [
                    ["projects", projects.length],
                    ["featured", featuredProjects.length],
                    ["live", liveProjects],
                    ["kinds", projectKinds],
                    ["stack", topStack],
                  ])}
                />
              }
            />
          }
        />
      </Container>

      <WorkIndex />

      <Container className="py-10 sm:py-14">
        <CtaBanner />
      </Container>
    </>
  );
}
