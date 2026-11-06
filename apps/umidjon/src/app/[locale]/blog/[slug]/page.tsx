import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/content/site";
import { profile } from "@/content/profile";
import { alternates, breadcrumbJsonLd, openGraph } from "@/lib/seo";
import { getPost, listLocalesForSlug, listPostParams } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/* All MDX is read at build time, so an unknown slug is a 404 — never SSR'd. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return listPostParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale as Locale);
  if (!post) return {};

  const availableLocales = await listLocalesForSlug(slug);
  const path = `/blog/${slug}`;
  const base = alternates(path, locale);
  /* hreflang should only name locales that actually exist for this post. */
  const prefix = (code: string) =>
    code === routing.defaultLocale ? "" : `/${code}`;
  const languages: Record<string, string> = {
    "x-default": `${site.url}${path}`,
  };
  for (const code of availableLocales) {
    languages[code] = `${site.url}${prefix(code)}${path}`;
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: base.canonical, languages },
    openGraph: openGraph({
      title: post.title,
      description: post.description,
      path,
      locale,
    }),
  };
}

const dateFormat: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

export default async function BlogPost({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = await getPost(slug, locale as Locale);
  if (!post) notFound();

  const url = `${site.url}/blog/${slug}`;
  const cover = post.cover
    ? post.cover.startsWith("http")
      ? post.cover
      : `${site.url}${post.cover}`
    : `${site.url}${site.ogImage}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: locale,
    keywords: post.tags?.join(", "),
    image: [cover],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      "@id": `${site.url}#person`,
      name: profile.fullName ?? profile.firstName,
      url: site.url,
    },
    publisher: { "@id": `${site.url}#person` },
  };

  const crumbs = breadcrumbJsonLd(
    [
      { name: "Home", path: "/" },
      { name: t("title"), path: "/blog" },
      { name: post.title, path: `/blog/${slug}` },
    ],
    locale,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [articleJsonLd, crumbs],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="flex flex-col gap-6 py-8 sm:py-12">
        <Breadcrumb current={post.title} />

        <Link
          href="/blog"
          className="group inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t("backToBlog")}
        </Link>

        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                dateFormat[locale] ?? "en-US",
                { day: "2-digit", month: "long", year: "numeric" },
              )}
            </time>
            <span className="text-border-strong">·</span>
            <span>
              {post.readingTime} {t("minRead")}
            </span>
          </div>
          <h1 className="type-page">{post.title}</h1>
          <p className="max-w-2xl text-muted">{post.description}</p>
          {post.tags && post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>
      </Container>

      <Container className="pb-16">
        <article className="prose-blog">
          <MDXRemote source={post.source} components={mdxComponents} />
        </article>
      </Container>
    </>
  );
}
