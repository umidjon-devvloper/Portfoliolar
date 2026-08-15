"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = { uz: "UZ", ru: "RU", en: "EN" };

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-border p-0.5",
        isPending && "opacity-60",
        className,
      )}
    >
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          aria-current={item === locale}
          onClick={() =>
            item !== locale &&
            startTransition(() => router.replace(pathname, { locale: item }))
          }
          className={cn(
            "rounded-full px-2.5 py-1.5 text-[0.6875rem] font-medium transition-colors",
            item === locale
              ? "bg-accent text-accent-foreground"
              : "text-muted hover:text-foreground",
          )}
        >
          {labels[item]}
        </button>
      ))}
    </div>
  );
}
