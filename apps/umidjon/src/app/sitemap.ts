import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";

const staticPaths = [
  "",
  "/about",
  "/projects",
  "/services",
  "/resume",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

    for (const path of staticPaths) {
      entries.push({
        url: `${site.url}${prefix}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${site.url}${prefix}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
