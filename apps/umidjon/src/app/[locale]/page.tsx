import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { AboutPreview } from "@/components/sections/about-preview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Process } from "@/components/sections/process";
import { Cta } from "@/components/sections/cta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Metrics />
      <AboutPreview />
      <FeaturedProjects />
      <ServicesPreview />
      <Process />
      <Cta />
    </>
  );
}
