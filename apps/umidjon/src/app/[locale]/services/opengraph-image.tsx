import { getTranslations } from "next-intl/server";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { routing } from "@/i18n/routing";

export const alt = "Services";
export const size = ogSize;
export const contentType = ogContentType;

export function generateImageMetadata() {
  return routing.locales.map((locale) => ({ id: locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function OgImage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return renderOgImage({
    eyebrow: "Services",
    title: t("title"),
    description: t("subtitle"),
  });
}
