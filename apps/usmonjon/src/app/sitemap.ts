import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.map((locale) => ({
    url: `${site.url}${locale === routing.defaultLocale ? "" : `/${locale}`}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
