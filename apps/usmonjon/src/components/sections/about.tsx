import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { partners } from "@/content/profile";

export function About() {
  const t = useTranslations("about");

  return (
    <Section id="about" className="border-b border-border">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <SectionHeading index="01" title={t("title")} />

        <div className="flex flex-col gap-10">
          <p className="text-lg leading-relaxed text-muted sm:text-xl">
            {t("bio")}
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
                {t("experienceTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {t("experience")}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
                {t("goalTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{t("goal")}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
              {t("partnersTitle")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-col gap-1 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
                >
                  <span className="font-display text-xl">{partner.name}</span>
                  <span className="text-xs text-muted">{partner.role}</span>
                  <span className="text-xs text-accent">
                    {partner.href.replace("https://", "")}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
