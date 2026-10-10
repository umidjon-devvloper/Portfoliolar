"use client";

import clsx from "clsx";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ label }: { label: string }) {
  const current = useLocale();

  return (
    <nav aria-label={label}>
      <ul className="flex items-center text-xs font-medium">
        {routing.locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href="/"
                locale={locale}
                hrefLang={locale}
                aria-current={active ? "true" : undefined}
                className={clsx(
                  "block px-1.5 py-1 transition-colors",
                  active ? "text-frost" : "text-fog hover:text-frost",
                )}
              >
                {locale.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
