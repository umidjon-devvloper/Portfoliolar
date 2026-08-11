import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Check, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { goalIds, profile, skillGroups, strengthIds } from "@/content/profile";
import { partners } from "@/content/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return { title: t("title"), description: t("shortBio") };
}

function AboutContent() {
  const t = useTranslations("about");
  const tStrengths = useTranslations("strengths");
  const tGoals = useTranslations("goals");
  const tSkills = useTranslations("skills");

  const { education, location, avatar } = profile;

  return (
    <>
      <Section className="border-b border-border">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-8">
              <SectionHeading title={t("title")} subtitle={t("shortBio")} />
              <p className="max-w-3xl text-base leading-relaxed text-muted">
                {t("longBio")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={profile.fullName ?? profile.firstName}
                  width={72}
                  height={72}
                  className="rounded-full border border-border"
                />
              ) : null}

              <div className="flex flex-col gap-1">
                <span className="text-lg font-medium">
                  {profile.fullName ?? profile.firstName}
                </span>
                <span className="text-sm text-muted">{profile.role}</span>
                <span className="text-sm text-muted">
                  {profile.secondaryRole}
                </span>
              </div>

              {location ? (
                <div className="flex items-start gap-3 text-sm text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {location.city}, {location.region}, {location.country}
                  </span>
                </div>
              ) : null}

              {education ? (
                <div className="flex items-start gap-3 text-sm text-muted">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {education.institution}
                    <br />
                    {education.field} · {education.degree}
                    <br />
                    <span className="font-mono text-xs">
                      {education.from}–{education.to}
                    </span>
                  </span>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-b border-border bg-surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("workStyleTitle")}
              </h2>
              <p className="text-base leading-relaxed text-muted">
                {t("workStyle")}
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("strengthsTitle")}
              </h2>
            </Reveal>
            <Stagger className="flex flex-col gap-3">
              {strengthIds.map((id) => (
                <StaggerItem key={id}>
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-muted">
                      {tStrengths(id)}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <Section className="border-b border-border">
        <div className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading title={tSkills("title")} />
          </Reveal>
          <Stagger
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            gap={0.05}
          >
            {skillGroups.map((group) => (
              <StaggerItem key={group.id}>
                <div className="flex flex-col gap-3">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {tSkills(group.id)}
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

      <Section className="border-b border-border bg-surface">
        <div className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading title={t("goalsTitle")} />
          </Reveal>
          <Stagger
            className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
            gap={0.05}
          >
            {goalIds.map((id, index) => (
              <StaggerItem key={id}>
                <div className="flex h-full flex-col gap-3 bg-background p-6 transition-colors hover:bg-surface">
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed">{tGoals(id)}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              title={t("partnersTitle")}
              subtitle={t("partnersSubtitle")}
            />
          </Reveal>
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {partners.map((partner) => (
              <StaggerItem key={partner.name} className="flex">
                <SpotlightCard className="w-full rounded-[var(--radius-card)] border border-border bg-surface transition-all hover:-translate-y-1 hover:border-accent/60">
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex flex-col gap-2 p-6"
                  >
                    <span className="text-lg font-medium">{partner.name}</span>
                    <span className="text-sm text-muted">{partner.role}</span>
                    <span className="font-mono text-xs text-accent">
                      {partner.href.replace("https://", "")}
                    </span>
                  </a>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
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
