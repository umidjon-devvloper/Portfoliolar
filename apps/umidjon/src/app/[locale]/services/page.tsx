import type { Metadata } from "next";
import * as icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/content/site";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type IconName = keyof typeof icons;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return { title: t("title"), description: t("subtitle") };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <Section>
      <div className="flex flex-col gap-12">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon as IconName] as icons.LucideIcon;

            return (
              <div
                key={service.id}
                className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8"
              >
                <Icon className="h-6 w-6 text-accent" />
                <h2 className="text-lg font-medium">
                  {t(`${service.id}.title`)}
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`${service.id}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "lg" }), "group self-start")}
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Section>
  );
}
