import * as icons from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/content/site";

type IconName = keyof typeof icons;

export function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <Section id="services">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow="02" title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = icons[service.icon as IconName] as icons.LucideIcon;

            return (
              <div
                key={service.id}
                className="flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-surface"
              >
                <Icon className="h-5 w-5 text-accent" />
                <h3 className="text-base font-medium">
                  {t(`${service.id}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`${service.id}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
