import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/content/profile";

export function Skills() {
  const t = useTranslations("skills");

  return (
    <Section id="skills" className="border-b border-border bg-surface">
      <div className="flex flex-col gap-14">
        <SectionHeading index="02" title={t("title")} />

        <div className="flex flex-col divide-y divide-border border-y border-border">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="grid gap-4 py-8 sm:grid-cols-[200px_1fr] sm:gap-10"
            >
              <h3 className="font-display text-2xl">{t(group.id)}</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {group.items.map((item) => (
                  <span key={item} className="text-base text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
