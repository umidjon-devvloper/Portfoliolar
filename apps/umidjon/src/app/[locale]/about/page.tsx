import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { goalIds, skillGroups, strengthIds } from "@/content/profile";
import { partners } from "@/content/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("shortBio"),
  };
}

function AboutContent() {
  const t = useTranslations("about");
  const tStrengths = useTranslations("strengths");
  const tGoals = useTranslations("goals");
  const tSkills = useTranslations("skills");

  return (
    <>
      <Section className="border-b border-border">
        <div className="flex flex-col gap-8">
          <SectionHeading title={t("title")} subtitle={t("shortBio")} />
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            {t("longBio")}
          </p>
        </div>
      </Section>

      <Section className="border-b border-border bg-surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("workStyleTitle")}
            </h2>
            <p className="text-base leading-relaxed text-muted">
              {t("workStyle")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("strengthsTitle")}
            </h2>
            <ul className="flex flex-col gap-3">
              {strengthIds.map((id) => (
                <li key={id} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-muted">
                    {tStrengths(id)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="border-b border-border">
        <div className="flex flex-col gap-10">
          <SectionHeading title={tSkills("title")} />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.id} className="flex flex-col gap-3">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {tSkills(group.id)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-border bg-surface">
        <div className="flex flex-col gap-10">
          <SectionHeading title={t("goalsTitle")} />
          <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {goalIds.map((id, index) => (
              <li key={id} className="flex flex-col gap-3 bg-background p-6">
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed">{tGoals(id)}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-10">
          <SectionHeading
            title={t("partnersTitle")}
            subtitle={t("partnersSubtitle")}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-colors hover:border-accent"
              >
                <span className="text-lg font-medium">{partner.name}</span>
                <span className="text-sm text-muted">{partner.role}</span>
                <span className="font-mono text-xs text-accent">
                  {partner.href.replace("https://", "")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}
