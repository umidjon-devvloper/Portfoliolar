import type { Metadata } from "next";
import { Download } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { profile, skillGroups } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resume" });

  return { title: t("title"), description: t("subtitle") };
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "resume" });
  const tSkills = await getTranslations({ locale, namespace: "skills" });
  const lang = locale as Locale;

  return (
    <Section>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />

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
            <span className="shrink-0 text-sm text-muted">
              {t("downloadUnavailable")}
            </span>
          )}
        </div>

        {profile.education ? (
          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t("educationTitle")}
            </h2>
            <p className="text-base text-muted">{profile.education}</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {t("experienceTitle")}
          </h2>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {projects.map((project) => (
              <li
                key={project.slug}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-base font-medium">{project.name}</span>
                  <span className="text-sm text-muted">
                    {project.tagline[lang]}
                  </span>
                </div>
                {project.year ? (
                  <span className="font-mono text-xs text-muted">
                    {project.year}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.id} className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
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
  );
}
