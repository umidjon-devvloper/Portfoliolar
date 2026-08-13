import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { Intro } from "@/components/sections/intro";
import { StackSpine } from "@/components/sections/stack-spine";
import { SkillsMatrix } from "@/components/sections/skills-matrix";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesPreview } from "@/components/sections/services-preview";
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
      <Intro />
      <StackSpine />
      <SkillsMatrix />
      <FeaturedProjects />
      <ServicesPreview />
      <Cta />
    </>
  );
}
