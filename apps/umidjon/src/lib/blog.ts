import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { routing, type Locale } from "@/i18n/routing";

/* Posts live at src/content/blog/<slug>/<locale>.mdx. One folder per post,
   one file per translation. A missing translation hides the post for that
   locale — it does not fall back to another language, so Google never
   indexes a page shown to someone in a language they didn't ask for. */

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags?: string[];
  cover?: string;
  draft?: boolean;
  updated?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  locale: Locale;
  readingTime: number;
};

export type PostWithSource = PostMeta & { source: string };

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function readPost(
  slug: string,
  locale: Locale,
): Promise<PostWithSource | null> {
  const file = path.join(BLOG_DIR, slug, `${locale}.mdx`);
  if (!existsSync(file)) return null;
  const raw = await readFile(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  if (fm.draft && process.env.NODE_ENV === "production") return null;
  return {
    slug,
    locale,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    updated: fm.updated,
    tags: fm.tags ?? [],
    cover: fm.cover,
    draft: fm.draft,
    readingTime: Math.max(1, Math.round(words(content) / 220)),
    source: content,
  };
}

/** All slugs on disk, regardless of locale. */
export async function listSlugs(): Promise<string[]> {
  if (!existsSync(BLOG_DIR)) return [];
  const entries = await readdir(BLOG_DIR, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

/** Posts available in the given locale, newest first. */
export async function listPosts(locale: Locale): Promise<PostMeta[]> {
  const slugs = await listSlugs();
  const posts = await Promise.all(slugs.map((slug) => readPost(slug, locale)));
  return posts
    .filter((post): post is PostWithSource => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ source: _source, ...meta }) => meta);
}

/** The post (with MDX body) for a slug + locale, or null if not translated. */
export async function getPost(
  slug: string,
  locale: Locale,
): Promise<PostWithSource | null> {
  return readPost(slug, locale);
}

/** Every (locale, slug) pair that has a file — for generateStaticParams. */
export async function listPostParams(): Promise<
  Array<{ locale: Locale; slug: string }>
> {
  const slugs = await listSlugs();
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const slug of slugs) {
    for (const locale of routing.locales) {
      const file = path.join(BLOG_DIR, slug, `${locale}.mdx`);
      if (existsSync(file)) params.push({ locale, slug });
    }
  }
  return params;
}

/** Locales a given slug is translated into — drives hreflang on post pages. */
export async function listLocalesForSlug(slug: string): Promise<Locale[]> {
  const result: Locale[] = [];
  for (const locale of routing.locales) {
    const file = path.join(BLOG_DIR, slug, `${locale}.mdx`);
    if (existsSync(file)) result.push(locale);
  }
  return result;
}

/** Last modified date for the whole blog — used in sitemap. */
export async function latestPostDate(): Promise<Date | null> {
  const slugs = await listSlugs();
  if (slugs.length === 0) return null;
  let latest = 0;
  for (const slug of slugs) {
    const dir = path.join(BLOG_DIR, slug);
    const entries = await readdir(dir);
    for (const entry of entries) {
      const s = await stat(path.join(dir, entry));
      if (s.mtimeMs > latest) latest = s.mtimeMs;
    }
  }
  return latest > 0 ? new Date(latest) : null;
}
