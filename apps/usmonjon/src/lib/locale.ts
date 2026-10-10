import type { LocalizedText } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function pick(text: LocalizedText, locale: string): string {
  return text[locale as Locale] ?? text.uz;
}

export function localeUrl(base: string, locale: string, path = ""): string {
  const prefix = locale === "uz" ? "" : `/${locale}`;
  return `${base}${prefix}${path}` || base;
}
