import type { Metadata } from "next";
import { Download, Printer } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TechIcon } from "@/components/ui/tech-icon";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";
import { skillCategories } from "@/content/skills";
import { roles } from "@/content/experience";
import { cn } from "@/lib/utils";
import { alternates, openGraph } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resume" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternates("/resume", locale),
    openGraph: openGraph({
      title: t("title"),
      description: t("subtitle"),
      path: "/resume",
      locale,
    }),
  };
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "resume" });
  const tSkills = await getTranslations({ locale, namespace: "skills" });
  const tExp = await getTranslations({ locale, namespace: "experience" });
  const { education, contact } = profile;

  return (
    <Container className="pb-28 pt-28 sm:pt-36">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-5">
              <span className="eyebrow">{t("label")}</span>
              <h1 className="font-display type-display text-balance">
                {t("title")}
              </h1>
              <p className="type-lead max-w-xl leading-relaxed text-muted">
                {t("subtitle")}
              </p>
            </div>

            {profile.resumeFile ? (
              <a
                href={profile.resumeFile}
                download
                className={cn(buttonVariants({ size: "lg" }), "shrink-0")}
              >
                <Download className="h-4 w-4" />
                {t("download")}
              </a>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-2 text-sm text-muted">
                <Printer className="h-4 w-4" />
                {t("printHint")}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-col gap-2 border border-border bg-surface p-6 sm:p-8">
            <span className="text-xl font-semibold">
              {profile.fullName ?? profile.firstName}
            </span>
            <span className="text-sm text-muted">{profile.role}</span>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted">
              <span>{contact.email}</span>
              {contact.phoneDisplay ? <span>{contact.phoneDisplay}</span> : null}
              {contact.telegramHandle ? (
                <span>{contact.telegramHandle}</span>
              ) : null}
              {profile.location ? (
                <span>
                  {profile.location.city}, {profile.location.country}
                </span>
              ) : null}
            </div>
          </div>
        </Reveal>

        {education ? (
          <Reveal>
            <div className="flex flex-col gap-3">
              <h2 className="flex items-center gap-3 eyebrow">
                {t("educationTitle")}
                <span className="h-px w-8 bg-accent/40" aria-hidden />
              </h2>
              <div className="flex flex-col gap-1">
                <span className="text-base font-medium">
                  {education.institution}
                </span>
                {education.field || education.degree ? (
                  <span className="text-sm text-muted">
                    {[education.field, education.degree].filter(Boolean).join(" · ")}
                  </span>
                ) : null}
                <span className="font-mono text-xs text-muted">
                  {education.from}–{education.to}
                </span>
              </div>
            </div>
          </Reveal>
        ) : null}

        <Reveal>
          <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-3 eyebrow">
              {t("experienceTitle")}
              <span className="h-px w-8 bg-accent/40" aria-hidden />
            </h2>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {roles.map((role) => (
                <li
                  key={role.id}
                  className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-medium">{tExp(`${role.id}.title`)}</span>
                    <span className="text-sm text-accent">
                      {role.company ?? tExp("independent")}
                    </span>
                    <span className="text-sm text-muted">{tExp(`${role.id}.summary`)}</span>
                    {role.stack.length > 0 ? (
                      <span className="font-mono text-xs text-muted">
                        {role.stack.join(" · ")}
                      </span>
                    ) : null}
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {tExp(`${role.id}.shortPeriod`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-col gap-8">
            {skillCategories.map((category) => (
              <div key={category.id} className="flex flex-col gap-3">
                <h3 className="eyebrow">{tSkills(category.id)}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="lift inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs"
                    >
                      <TechIcon
                        slug={skill.icon}
                        fallback={skill.name}
                        className="h-3.5 w-3.5"
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
