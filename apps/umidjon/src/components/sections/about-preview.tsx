import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { skillGroups } from "@/content/profile";

export function AboutPreview() {
  const t = useTranslations("about");
  const ts = useTranslations("skills");
  const tc = useTranslations("common");

  const primaryGroups = skillGroups.filter((group) =>
    ["frontend", "mobile", "backend"].includes(group.id),
  );

  return (
    <Section id="about" className="border-b border-border">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="00"
              title={t("title")}
              subtitle={t("shortBio")}
            />
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 self-start text-sm text-accent"
            >
              {tc("readMore")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="flex flex-col gap-8">
          {primaryGroups.map((group) => (
            <StaggerItem key={group.id}>
              <div className="flex flex-col gap-3">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {ts(group.id)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
