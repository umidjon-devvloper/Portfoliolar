import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { LabelledSection } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { StackSpine } from "@/components/sections/stack-spine";
import { SkillsMatrix } from "@/components/sections/skills-matrix";
import { Cta } from "@/components/sections/cta";
import { goalIds, profile, strengthIds } from "@/content/profile";
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
      <Container className="pt-28 sm:pt-36">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-8">
              <span className="label">{t("label")}</span>
              <h1 className="font-display type-mega max-w-[12ch] text-balance">
                {profile.fullName ?? profile.firstName}
              </h1>
              <p className="font-display max-w-3xl text-balance text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.3]">
                {t("shortBio")}
              </p>
              <p className="max-w-2xl leading-relaxed text-muted">
                {t("longBio")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 border-t border-border pt-8 lg:mt-4">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={profile.fullName ?? profile.firstName}
                  width={96}
                  height={96}
                  className="rounded-full border border-border"
                />
              ) : null}

              <dl className="flex flex-col divide-y divide-border">
                <div className="flex flex-col gap-1 pb-4">
                  <dt className="label">{t("roleLabel")}</dt>
                  <dd className="text-sm">{profile.role}</dd>
                  <dd className="text-sm text-muted">{profile.secondaryRole}</dd>
                </div>

                {location ? (
                  <div className="flex flex-col gap-1 py-4">
                    <dt className="label">{t("locationLabel")}</dt>
                    <dd className="text-sm text-muted">
                      {location.city}, {location.region}, {location.country}
                    </dd>
                  </div>
                ) : null}

                {education ? (
                  <div className="flex flex-col gap-1 pt-4">
                    <dt className="label">{t("educationTitle")}</dt>
                    <dd className="text-sm">{education.institution}</dd>
                    <dd className="text-sm text-muted">{education.field}</dd>
                    <dd className="font-mono text-xs text-muted">
                      {education.from}–{education.to}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>

      <LabelledSection label={t("workStyleTitle")}>
        <Reveal>
          <div className="flex flex-col gap-14">
            <p className="font-display max-w-3xl text-balance text-[clamp(1.25rem,2.2vw,1.875rem)] leading-[1.35]">
              {t("workStyle")}
            </p>

            <ul className="flex flex-col border-t border-border">
              {strengthIds.map((id, index) => (
                <li
                  key={id}
                  className="row-hover flex gap-6 border-b border-border px-3 py-5 sm:gap-10"
                >
                  <span className="label shrink-0 pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-muted">
                    {tStrengths(id)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </LabelledSection>

      <StackSpine />

      <SkillsMatrix />

      <LabelledSection label={t("goalsTitle")} className="bg-surface border-y border-border">
        <Reveal>
          <ul className="flex flex-col border-t border-border">
            {goalIds.map((id, index) => (
              <li
                key={id}
                className="row-hover group flex items-baseline gap-6 border-b border-border px-3 py-6 sm:gap-10"
              >
                <span className="label shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl leading-snug transition-colors group-hover:text-accent sm:text-2xl">
                  {tGoals(id)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </LabelledSection>

      <LabelledSection label={t("partnersTitle")}>
        <Reveal>
          <div className="flex flex-col gap-8">
            <p className="type-lead max-w-xl leading-relaxed text-muted">
              {t("partnersSubtitle")}
            </p>
            <ul className="flex flex-col border-t border-border">
              {partners.map((partner) => (
                <li key={partner.name} className="border-b border-border">
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="row-hover group flex flex-wrap items-baseline justify-between gap-4 px-3 py-6 transition-colors hover:text-accent"
                  >
                    <span className="font-display text-2xl sm:text-3xl">
                      {partner.name}
                    </span>
                    <span className="text-sm text-muted">{partner.role}</span>
                    <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                      {partner.href.replace("https://", "")} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </LabelledSection>

      <Cta />
    </>
  );
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}
