import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { HomeBoard } from "@/components/sections/home-board";

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HomeBoard />
    </>
  );
}
