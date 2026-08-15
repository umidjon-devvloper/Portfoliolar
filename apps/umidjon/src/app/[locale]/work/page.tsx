import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBanner } from "@/components/ui/cta-banner";
import { WorkVisual } from "@/components/sections/work-visual";
import { WorkIndex } from "@/components/sections/work-index";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), description: t("subtitle") };
}

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
          visual={<WorkVisual />}
        />
      </Container>

      <WorkIndex />

      <Container className="py-10 sm:py-14">
        <CtaBanner />
      </Container>
    </>
  );
}
