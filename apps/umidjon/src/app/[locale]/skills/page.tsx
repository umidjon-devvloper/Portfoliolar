import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PageVisual } from "@/components/ui/page-visual";
import { SkillsVisual } from "@/components/sections/skills-visual";
import { SkillsBoard } from "@/components/sections/skills-board";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "skills" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

export default async function SkillsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "skills" });

  return (
    <>
      <Container className="border-b border-border py-8 sm:py-10">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          eyebrow={t("eyebrow")}
          lead={t("headingLead")}
          accent={t("headingAccent")}
          description={t("pageSubtitle")}
          visual={
            <PageVisual
              page="skills"
              alt={t("pageTitle")}
              fallback={<SkillsVisual />}
            />
          }
        />
      </Container>

      <Container className="py-8">
        <SkillsBoard />
      </Container>
    </>
  );
}
