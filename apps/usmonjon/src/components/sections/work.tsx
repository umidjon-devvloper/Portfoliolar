import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { works } from "@/content/profile";
import type { Locale } from "@/i18n/routing";

export function Work() {
  const t = useTranslations("work");
  const locale = useLocale() as Locale;

  return (
    <Section id="work" className="border-b border-border">
      <div className="flex flex-col gap-14">
        <SectionHeading index="03" title={t("title")} subtitle={t("subtitle")} />

        {works.length === 0 ? (
          <p className="text-base text-muted">{t("empty")}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {works.map((work) => (
              <a
                key={work.slug}
                href={work.href ?? "#work"}
                target={work.href ? "_blank" : undefined}
                rel={work.href ? "noreferrer noopener" : undefined}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-2">
                  {work.cover ? (
                    <Image
                      src={work.cover}
                      alt={work.name}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-2xl">{work.name}</h3>
                  {work.summary ? (
                    <p className="text-sm text-muted">{work.summary[locale]}</p>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
