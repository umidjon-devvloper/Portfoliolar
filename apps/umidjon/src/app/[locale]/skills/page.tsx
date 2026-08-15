import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeading } from "@/components/ui/section-header";
import { CtaBanner } from "@/components/ui/cta-banner";
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
      <Container className="flex flex-col gap-4 py-8 sm:py-12">
        <Breadcrumb current={t("breadcrumb")} />
        <PageHeading lead={t("headingLead")} accent={t("headingAccent")} />
        <p className="max-w-xl leading-relaxed text-muted">{t("pageSubtitle")}</p>
      </Container>

      <SkillsBoard />

      <Container className="py-12 sm:py-16">
        <CtaBanner />
      </Container>
    </>
  );
}
