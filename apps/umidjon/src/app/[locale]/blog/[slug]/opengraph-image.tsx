import { notFound } from "next/navigation";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import type { Locale } from "@/i18n/routing";
import { getPost, listPostParams } from "@/lib/blog";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return listPostParams();
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function OgImage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale as Locale);
  if (!post) notFound();
  return renderOgImage({
    eyebrow: "Blog",
    title: post.title,
    description: post.description,
  });
}
