import type { Metadata } from "next";
import { Cake, Compass, GraduationCap, Languages, MapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeading } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal } from "@/components/motion/reveal";
import { TechStrip } from "@/components/sections/tech-strip";
import { metrics, profile } from "@/content/profile";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("pageTitle"), description: t("shortBio") };
}

const iconFor: Record<string, string> = {
  projects: "Code",
  clients: "Smile",
  experience: "Trophy",
  response: "Clock",
};

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tm = await getTranslations({ locale, namespace: "metrics" });

  const { education, location, birthDate, avatar } = profile;

  const facts = [
    birthDate
      ? {
          id: "birth",
          icon: Cake,
          value: new Intl.DateTimeFormat(locale === "uz" ? "en-GB" : locale, {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(new Date(birthDate)),
        }
      : null,
    education
      ? {
          id: "education",
          icon: GraduationCap,
          value: `${education.institution} (${education.from}–${education.to})`,
        }
      : null,
    { id: "languages", icon: Languages, value: t("languagesValue") },
    location
      ? {
          id: "location",
          icon: MapPin,
          value: `${location.city}, ${location.country}`,
        }
      : null,
    { id: "focus", icon: Compass, value: t("focusValue") },
  ].filter((item) => item !== null);

  return (
    <>
      <Container className="flex flex-col gap-3.5 py-8 sm:py-10">
        <Breadcrumb current={t("breadcrumb")} />
        <PageHeading lead={t("headingLead")} accent={t("headingAccent")} />
      </Container>

      <Container className="grid gap-6 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <Reveal className="flex flex-col gap-5">
          <p className="text-lg leading-relaxed">{t("shortBio")}</p>
          <p className="leading-relaxed text-muted">{t("longBio")}</p>
          <p className="leading-relaxed text-muted">{t("workStyle")}</p>
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-4">
          {avatar ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
              <Image
                src={avatar}
                alt={profile.fullName ?? profile.firstName}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          ) : null}

          <Card hover={false} className="divide-y divide-border">
            {facts.map((fact) => (
              <div key={fact.id} className="flex items-start gap-3 p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
                  <fact.icon className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-muted">{t(fact.id)}</span>
                  <span className="text-sm">{fact.value}</span>
                </div>
              </div>
            ))}
          </Card>
        </Reveal>
      </Container>

      <TechStrip />

      <Container className="grid grid-cols-2 gap-3 py-12 lg:grid-cols-4">
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

      <Container className="pb-12 sm:pb-16">
        <CtaBanner />
      </Container>
    </>
  );
}
