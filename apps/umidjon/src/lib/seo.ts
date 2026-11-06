import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { profile } from "@/content/profile";

/* Open Graph wants a full locale, not a bare language code. */
const ogLocale: Record<string, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/**
 * Canonical + hreflang for one page. Set on every page: a canonical
 * inherited from the layout would point every URL at the home page.
 */
export function alternates(path: string, locale: string) {
  const clean = path === "/" ? "" : path;
  const prefix = (code: string) =>
    code === routing.defaultLocale ? "" : `/${code}`;

  const languages: Record<string, string> = {
    "x-default": `${site.url}${clean || "/"}`,
  };

  for (const code of routing.locales) {
    languages[code] = `${site.url}${prefix(code)}${clean || "/"}`;
  }

  return {
    canonical: `${site.url}${prefix(locale)}${clean || "/"}`,
    languages,
  };
}

/**
 * BreadcrumbList JSON-LD for the current page. Google turns it into the
 * crumb trail shown under the result link.
 */
export function breadcrumbJsonLd(
  trail: Array<{ name: string; path: string }>,
  locale: string,
) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${prefix}${item.path === "/" ? "" : item.path}` || site.url,
    })),
  };
}

/**
 * Page-level Open Graph, so shares show the page rather than the site.
 * `images` is left unset so Next.js can use the route's opengraph-image.tsx;
 * pass `image` explicitly to override with a specific URL (e.g. a project cover).
 */
export function openGraph(values: {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string | null;
}) {
  return {
    type: "website" as const,
    siteName: site.domain,
    title: `${values.title} — ${profile.firstName}`,
    description: values.description,
    url: alternates(values.path, values.locale).canonical,
    locale: ogLocale[values.locale] ?? values.locale,
    alternateLocale: routing.locales
      .filter((code) => code !== values.locale)
      .map((code) => ogLocale[code] ?? code),
    ...(values.image
      ? { images: [{ url: values.image, width: 1200, height: 630 }] }
      : {}),
  };
}
