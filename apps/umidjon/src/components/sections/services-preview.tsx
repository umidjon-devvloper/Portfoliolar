import * as icons from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { services } from "@/content/site";

type IconName = keyof typeof icons;

export function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <Section id="services" className="border-b border-border bg-surface">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="02"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
          {services.map((service) => {
            const Icon = icons[service.icon as IconName] as icons.LucideIcon;

            return (
              <StaggerItem key={service.id} className="flex">
                <SpotlightCard className="flex w-full flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-background p-6 transition-colors hover:border-accent/60">
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="text-base font-medium">
                    {t(`${service.id}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`${service.id}.description`)}
                  </p>
                  {service.priceFrom !== null ? (
                    <span className="mt-auto pt-2 font-mono text-xs text-accent">
                      {t("from")} ${service.priceFrom.toLocaleString("en-US")}
                    </span>
                  ) : null}
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
