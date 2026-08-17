import { routing } from "@/i18n/routing";
import { site } from "@/content/site";

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

/** Page-level Open Graph, so shares show the page rather than the site. */
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
    title: values.title,
    description: values.description,
    url: alternates(values.path, values.locale).canonical,
    locale: values.locale,
    images: [{ url: values.image ?? site.ogImage, width: 1200, height: 630 }],
  };
}
