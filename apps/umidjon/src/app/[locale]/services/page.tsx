import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return { title: t("title"), description: t("subtitle") };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <Container className="flex flex-col gap-5 pb-6 pt-28 sm:pt-32">
        <span className="label">{t("label")}</span>
        <h1 className="font-display type-mega max-w-3xl text-balance">
          {t("title")}
        </h1>
      </Container>

      <ServicesPreview />
      <Cta />
    </>
  );
}
