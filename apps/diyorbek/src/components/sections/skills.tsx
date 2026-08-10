import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { TerminalHeading } from "@/components/ui/terminal-heading";
import { skillGroups } from "@/content/profile";

export function Skills() {
  const t = useTranslations("skills");

  return (
    <Section id="skills" className="border-b border-border">
      <div className="flex flex-col gap-10">
        <TerminalHeading command="ls -1 skills/" title={t("title")} />

        <div className="grid gap-8 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.id} className="flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent">
                {t(group.id)}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    <span className="mr-2 text-accent">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
