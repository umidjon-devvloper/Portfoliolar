import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { routing, type Locale } from "@/i18n/routing";
import { latestPostDate, listPosts, listSlugs } from "@/lib/blog";

const staticPaths = [
  "",
  "/about",
  "/work",
  "/blog",
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

/** Per-post lastMod + per-locale availability, so blog entries only list
 *  translations that actually exist. */
async function blogEntries(): Promise<Array<{
  slug: string;
  localeDates: Map<Locale, Date>;
  latest: Date;
}>> {
  const slugs = await listSlugs();
  const byLocale = new Map<Locale, Awaited<ReturnType<typeof listPosts>>>();
  for (const locale of routing.locales) byLocale.set(locale, await listPosts(locale));

  return slugs
    .map((slug) => {
      const localeDates = new Map<Locale, Date>();
      for (const locale of routing.locales) {
        const found = byLocale.get(locale)?.find((post) => post.slug === slug);
        if (!found) continue;
        localeDates.set(locale, new Date(found.updated ?? found.date));
      }
      if (localeDates.size === 0) return null;
      const latest = [...localeDates.values()].reduce(
        (acc, date) => (date > acc ? date : acc),
        new Date(0),
      );
      return { slug, localeDates, latest };
    })
    .filter((entry): entry is {
      slug: string;
      localeDates: Map<Locale, Date>;
      latest: Date;
    } => entry !== null);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projectLastMods = projects.map((p) => projectLastMod(p.year, p.updatedAt));
  const workIndexLastMod = projectLastMods.reduce(
    (acc, date) => (date > acc ? date : acc),
    new Date(0),
  );
  const posts = await blogEntries();
  const blogIndexLastMod = (await latestPostDate()) ?? now;

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
      const isBlog = path === "/blog";
      return {
        path,
        priority: isHome ? 1 : isWork ? 0.9 : isBlog ? 0.85 : 0.7,
        lastModified: isWork
          ? workIndexLastMod.getTime() > 0 ? workIndexLastMod : now
          : isBlog
            ? blogIndexLastMod
            : now,
        changeFrequency: isHome || isWork || isBlog ? "weekly" : "monthly",
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

  const staticAndProjectEntries = routing.locales.flatMap((locale) =>
    entries.map(({ path, priority, lastModified, changeFrequency }) => ({
      url: `${site.url}${prefix(locale)}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languages(path) },
    })),
  );

  const postEntries: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const postLanguages = Object.fromEntries(
      [...post.localeDates.keys()].map((code) => [
        code,
        `${site.url}${prefix(code)}/blog/${post.slug}`,
      ]),
    );
    return [...post.localeDates.entries()].map(([locale, date]) => ({
      url: `${site.url}${prefix(locale)}/blog/${post.slug}`,
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: { languages: postLanguages },
    }));
  });

  return [...staticAndProjectEntries, ...postEntries];
}
