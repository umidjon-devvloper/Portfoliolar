import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PageVisual } from "@/components/ui/page-visual";
import { CodeVisual } from "@/components/ui/code-visual";
import { buildObjectSnippet } from "@/content/code-sample";
import { skillGroups } from "@/content/profile";
import { SkillsBoard } from "@/components/sections/skills-board";
import { alternates, openGraph } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "skills" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: alternates("/skills", locale),
    openGraph: openGraph({
      title: t("pageTitle"),
      description: t("pageSubtitle"),
      path: "/skills",
      locale,
    }),
  };
}

/* Only names that really appear in the group are shown. */
function pick(groupId: string, wanted: string[]): string[] {
  const group = skillGroups.find((item) => item.id === groupId);
  return wanted.filter((name) => group?.items.includes(name));
}

export default async function SkillsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "skills" });

  return (
    <>
      <Container className="border-b border-border py-10 sm:py-12">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          index="04"
          lead={t("headingLead")}
          accent={t("headingAccent")}
          description={t("pageSubtitle")}
          visual={
            <PageVisual
              page="skills"
              alt={t("pageTitle")}
              fallback={
                <CodeVisual
                  filename="skills.js"
                  lines={buildObjectSnippet("skills", [
                    ["groups", skillGroups.length],
                    ["frontend", pick("frontend", ["React.js", "Next.js"])],
                    ["mobile", pick("mobile", ["React Native", "Expo"])],
                    ["backend", pick("backend", ["Node.js", "MongoDB"])],
                    ["design", pick("design", ["Figma", "UI/UX"])],
                  ])}
                />
              }
            />
          }
        />
      </Container>

      <Container className="py-10 sm:py-12">
        <SkillsBoard />
      </Container>
    </>
  );
}
