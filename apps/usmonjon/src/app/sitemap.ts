import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { routing } from "@/i18n/routing";
import { localeUrl } from "@/lib/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, localeUrl(site.url, l)]));
  return routing.locales.map((locale) => ({
    url: localeUrl(site.url, locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
