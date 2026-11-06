import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { listPosts } from "@/lib/blog";
import { alternates, openGraph } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates("/blog", locale),
    openGraph: openGraph({
      title: t("title"),
      description: t("description"),
      path: "/blog",
      locale,
    }),
  };
}

const dateFormat: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

export default async function BlogIndex({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await listPosts(locale as Locale);

  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-14">
      <header className="flex flex-col gap-3">
        <span className="eyebrow">Blog</span>
        <h1 className="type-page">{t("title")}</h1>
        <p className="max-w-2xl text-muted">{t("description")}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">{t("empty")}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-6">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-muted">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(
                      dateFormat[locale] ?? "en-US",
                      { day: "2-digit", month: "short", year: "numeric" },
                    )}
                  </time>
                  <span className="text-border-strong">·</span>
                  <span>
                    {post.readingTime} {t("minRead")}
                  </span>
                  {post.tags && post.tags.length > 0 ? (
                    <>
                      <span className="text-border-strong">·</span>
                      <span>{post.tags.slice(0, 3).join(" · ")}</span>
                    </>
                  ) : null}
                </div>
                <h2 className="type-section group-hover:text-accent">{post.title}</h2>
                <p className="text-muted">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
