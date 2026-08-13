import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { ProjectsIndex } from "@/components/sections/projects-grid";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return { title: t("title"), description: t("subtitle") };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <div className="pb-24 pt-28 sm:pt-36">
      <Container className="flex flex-col gap-6 pb-14">
        <span className="label">{t("label")}</span>
        <h1 className="font-display type-display max-w-3xl text-balance">
          {t("title")}
        </h1>
        <p className="type-lead max-w-2xl leading-relaxed text-muted">
          {t("subtitle")}
        </p>
      </Container>

      <ProjectsIndex />
    </div>
  );
}
