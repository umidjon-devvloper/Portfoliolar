import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/content/profile";

export function AboutPreview() {
  const t = useTranslations("about");
  const ts = useTranslations("skills");

  const primaryGroups = skillGroups.filter((group) =>
    ["frontend", "mobile", "backend"].includes(group.id),
  );

  return (
    <Section id="about" className="border-b border-border bg-surface">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <SectionHeading eyebrow="00" title={t("title")} subtitle={t("shortBio")} />

        <div className="flex flex-col gap-8">
          {primaryGroups.map((group) => (
            <div key={group.id} className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {ts(group.id)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} className="bg-background">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
