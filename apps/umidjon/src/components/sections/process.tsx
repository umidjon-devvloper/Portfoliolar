import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { processIds } from "@/content/profile";

export function Process() {
  const t = useTranslations("process");

  return (
    <Section id="process" className="border-b border-border">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="03"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <Stagger className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {processIds.map((id, index) => (
            <StaggerItem key={id}>
              <div className="group flex h-full flex-col gap-3 bg-background p-6 transition-colors hover:bg-surface">
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium">{t(`${id}.title`)}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`${id}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
