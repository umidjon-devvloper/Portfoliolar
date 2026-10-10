import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";

const staticPaths = [
  "",
  "/about",
  "/work",
  "/skills",
  "/experience",
  "/services",
  "/resume",
  "/contact",
];

const prefix = (locale: string) =>
  locale === routing.defaultLocale ? "" : `/${locale}`;

/** Every entry lists its translations, so Google pairs the locales up. */
function languages(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${site.url}${prefix(locale)}${path}`,
    ]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    ...staticPaths.map((path) => ({ path, priority: path === "" ? 1 : 0.7 })),
    ...projects.map((project) => ({
      path: `/work/${project.slug}`,
      priority: 0.6,
    })),
  ];

  return routing.locales.flatMap((locale) =>
    paths.map(({ path, priority }) => ({
      url: `${site.url}${prefix(locale)}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languages(path) },
    })),
  );
}
