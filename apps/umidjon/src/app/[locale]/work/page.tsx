import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeading } from "@/components/ui/section-header";
import { CtaBanner } from "@/components/ui/cta-banner";
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
      <Container className="flex flex-col gap-3.5 py-8 sm:py-10">
        <Breadcrumb current={t("breadcrumb")} />
        <PageHeading lead={t("headingLead")} accent={t("headingAccent")} />
        <p className="max-w-xl leading-relaxed text-muted">{t("subtitle")}</p>
      </Container>

      <WorkIndex />

      <Container className="py-10 sm:py-14">
        <CtaBanner />
      </Container>
    </>
  );
}
