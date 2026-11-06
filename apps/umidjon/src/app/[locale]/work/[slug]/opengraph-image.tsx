import { notFound } from "next/navigation";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getProjectBySlug, projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export const alt = "Project cover";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

type Props = { params: Promise<{ locale: string; slug: string }> };

const kindLabel: Record<string, string> = {
  saas: "SaaS",
  mobile: "Mobile App",
  web: "Web",
  ecommerce: "E-commerce",
  business: "Business",
  bot: "Bot",
  game: "Game",
};

export default async function OgImage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return renderOgImage({
    eyebrow: kindLabel[project.kind] ?? project.kind,
    title: project.name,
    description: project.tagline[locale as Locale] ?? project.tagline.en,
  });
}
