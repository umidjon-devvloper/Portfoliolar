import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { TerminalHeading } from "@/components/ui/terminal-heading";
import { partners } from "@/content/profile";

export function About() {
  const t = useTranslations("about");

  return (
    <Section id="about" className="border-b border-border bg-surface">
      <div className="flex flex-col gap-10">
        <TerminalHeading command="cat about.md" title={t("title")} />

        <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {t("bio")}
        </p>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-2 border-l-2 border-accent pl-5">
            <h3 className="text-sm font-semibold">{t("experienceTitle")}</h3>
            <p className="text-sm leading-relaxed text-muted">
              {t("experience")}
            </p>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-accent pl-5">
            <h3 className="text-sm font-semibold">{t("goalTitle")}</h3>
            <p className="text-sm leading-relaxed text-muted">{t("goal")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold">{t("partnersTitle")}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-col gap-1 rounded-md border border-border bg-background p-4 transition-colors hover:border-accent"
              >
                <span className="text-sm font-medium">{partner.name}</span>
                <span className="text-xs text-muted">{partner.role}</span>
                <span className="text-xs text-accent">
                  {partner.href.replace("https://", "")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
