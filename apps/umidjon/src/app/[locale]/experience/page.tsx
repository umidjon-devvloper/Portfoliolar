import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeading } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechTag } from "@/components/ui/tech-tag";
import { StatsCard } from "@/components/ui/stats-card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { roles } from "@/content/experience";
import { metrics } from "@/content/profile";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experience" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

const iconFor: Record<string, string> = {
  projects: "Code",
  clients: "Smile",
  experience: "Trophy",
  response: "Clock",
};

function Timeline() {
  const t = useTranslations("experience");

  return (
    <Stagger>
      <ol className="relative flex flex-col gap-4 border-l border-border pl-6">
        {roles.map((role, index) => (
          <StaggerItem key={role.id} index={index}>
            <li className="relative">
              <span
                className="absolute -left-[1.9rem] top-5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background"
                aria-hidden
              />
              <Card className="flex flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-accent">
                    {t(`${role.id}.period`)}
                  </span>
                  {role.current ? <Badge tone="live">{t("current")}</Badge> : null}
                </div>

                <div className="flex flex-col gap-0.5">
                  <h2 className="font-bold">{t(`${role.id}.title`)}</h2>
                  {role.company ? (
                    <p className="text-sm text-accent">{role.company}</p>
                  ) : (
                    <p className="text-sm text-muted">{t("independent")}</p>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-muted">
                  {t(`${role.id}.description`)}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {role.stack.map((item) => (
                    <TechTag key={item} name={item} />
                  ))}
                </div>
              </Card>
            </li>
          </StaggerItem>
        ))}
      </ol>
    </Stagger>
  );
}

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "experience" });
  const tm = await getTranslations({ locale, namespace: "metrics" });

  return (
    <>
      <Container className="flex flex-col gap-3.5 py-8 sm:py-10">
        <Breadcrumb current={t("breadcrumb")} />
        <PageHeading lead={t("headingLead")} accent={t("headingAccent")} />
        <p className="max-w-xl leading-relaxed text-muted">{t("pageSubtitle")}</p>
      </Container>

      <Container className="grid gap-3 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <StatsCard
            key={metric.id}
            icon={iconFor[metric.id] ?? "Code"}
            value={metric.value}
            suffix={metric.suffix}
            label={tm(metric.id)}
          />
        ))}
      </Container>

      <Container className="flex flex-col gap-6">
        <Reveal>
          <h2 className="type-section">{t("timelineTitle")}</h2>
        </Reveal>
        <Timeline />
      </Container>

      <Container className="py-10 sm:py-14">
        <CtaBanner />
      </Container>
    </>
  );
}
