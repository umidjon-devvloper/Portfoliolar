import type { Metadata } from "next";
import * as icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Process } from "@/components/sections/process";
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

function ServicesContent() {
  const t = useTranslations("services");

  return (
    <>
      <Section className="border-b border-border">
        <div className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {services.map((service) => {
              const Icon = icons[service.icon as IconName] as icons.LucideIcon;

              return (
                <StaggerItem key={service.id} className="flex">
                  <SpotlightCard className="flex w-full flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-colors hover:border-accent/60 sm:p-8">
                    <Icon className="h-6 w-6 text-accent" />
                    <h2 className="text-lg font-medium">
                      {t(`${service.id}.title`)}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted">
                      {t(`${service.id}.description`)}
                    </p>
                    {service.priceFrom !== null ? (
                      <div className="mt-auto flex flex-col gap-1 pt-4">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted">
                          {t("from")}
                        </span>
                        <span className="text-2xl font-semibold tracking-tight text-accent">
                          ${service.priceFrom.toLocaleString("en-US")}
                        </span>
                      </div>
                    ) : null}
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal>
            <div className="flex flex-col gap-6">
              <p className="max-w-2xl text-xs leading-relaxed text-muted">
                {t("priceNote")}
              </p>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "group self-start")}
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Process />
    </>
  );
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesContent />;
}
