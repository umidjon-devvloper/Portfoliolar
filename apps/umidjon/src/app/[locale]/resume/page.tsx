import type { Metadata } from "next";
import { Download, Printer } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
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
  const { education, contact } = profile;

  return (
    <Container className="pb-28 pt-28 sm:pt-36">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-5">
              <span className="label">{t("label")}</span>
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
              <h2 className="flex items-center gap-3 label !text-accent">
                {t("educationTitle")}
                <span className="h-px w-8 bg-accent/40" aria-hidden />
              </h2>
              <div className="flex flex-col gap-1">
                <span className="text-base font-medium">
                  {education.institution}
                </span>
                <span className="text-sm text-muted">
                  {education.field} · {education.degree}
                </span>
                <span className="font-mono text-xs text-muted">
                  {education.from}–{education.to}
                </span>
              </div>
            </div>
          </Reveal>
        ) : null}

        <Reveal>
          <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-3 label !text-accent">
              {t("experienceTitle")}
              <span className="h-px w-8 bg-accent/40" aria-hidden />
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
                    {project.stack.length > 0 ? (
                      <span className="font-mono text-xs text-muted">
                        {project.stack.join(" · ")}
                      </span>
                    ) : null}
                  </div>
                  {project.year ? (
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {project.year}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
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
        </Reveal>
      </div>
    </Container>
  );
}
