import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutBoard } from "@/components/sections/about-board";
import { alternates, openGraph } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("pageTitle"),
    description: t("shortBio"),
    alternates: alternates("/about", locale),
    openGraph: openGraph({
      title: t("pageTitle"),
      description: t("shortBio"),
      path: "/about",
      locale,
    }),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <AboutBoard />
    </>
  );
}
