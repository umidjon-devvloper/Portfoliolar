import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { TechStrip } from "@/components/sections/tech-strip";
import { StatsRow } from "@/components/sections/stats-row";
import { WhatIDo } from "@/components/sections/what-i-do";
import { Container } from "@/components/ui/container";
import { CtaBanner } from "@/components/ui/cta-banner";

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeaturedWork />
      <TechStrip />
      <StatsRow />
      <WhatIDo />
      <Container className="py-12 sm:py-16">
        <CtaBanner />
      </Container>
    </>
  );
}
