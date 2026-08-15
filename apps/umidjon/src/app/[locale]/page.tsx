import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { HomeBoard } from "@/components/sections/home-board";
import { WhatIDo } from "@/components/sections/what-i-do";

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HomeBoard />
      <WhatIDo />
    </>
  );
}
