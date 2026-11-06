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

/** Honest lastModified: project's own updatedAt, else year-end, else build time. */
function projectLastMod(year: string | null, updatedAt?: string): Date {
  if (updatedAt) return new Date(updatedAt);
  if (year) return new Date(`${year}-12-31`);
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projectLastMods = projects.map((p) => projectLastMod(p.year, p.updatedAt));
  const workIndexLastMod = projectLastMods.reduce(
    (acc, date) => (date > acc ? date : acc),
    new Date(0),
  );

  type Entry = {
    path: string;
    priority: number;
    lastModified: Date;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  };

  const entries: Entry[] = [
    ...staticPaths.map((path): Entry => {
      const isHome = path === "";
      const isWork = path === "/work";
      return {
        path,
        priority: isHome ? 1 : isWork ? 0.9 : 0.7,
        lastModified: isWork && workIndexLastMod.getTime() > 0 ? workIndexLastMod : now,
        changeFrequency: isHome || isWork ? "weekly" : "monthly",
      };
    }),
    ...projects.map(
      (project): Entry => ({
        path: `/work/${project.slug}`,
        priority: project.featured ? 0.8 : 0.6,
        lastModified: projectLastMod(project.year, project.updatedAt),
        changeFrequency: "yearly",
      }),
    ),
  ];

  return routing.locales.flatMap((locale) =>
    entries.map(({ path, priority, lastModified, changeFrequency }) => ({
      url: `${site.url}${prefix(locale)}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languages(path) },
    })),
  );
}
