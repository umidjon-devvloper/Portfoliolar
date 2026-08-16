import type { Metadata } from "next";
import * as icons from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { processSteps, services } from "@/content/services";
import { profile } from "@/content/profile";

type PageProps = { params: Promise<{ locale: string }> };
type IconName = keyof typeof icons;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

function ServiceGrid() {
  const t = useTranslations("services");

  return (
    <Stagger>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.icon as IconName] as icons.LucideIcon;

          return (
            <StaggerItem key={service.id} index={index}>
              <Card className="flex h-full flex-col gap-4 p-5 sm:p-6">
                <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>

                <div className="flex flex-col gap-1.5">
                  <h2 className="font-bold">{t(`${service.id}.title`)}</h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`${service.id}.description`)}
                  </p>
                </div>

                <ul className="flex flex-col gap-1.5 border-t border-border pt-4">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-accent"
                >
                  {t("learnMore")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Card>
            </StaggerItem>
          );
        })}
      </div>
    </Stagger>
  );
}

function Process() {
  const t = useTranslations("process");

  return (
    <Card hover={false} className="flex flex-col gap-8 p-6 sm:p-8">
      <div className="flex flex-col gap-1.5">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="type-section">{t("title")}</h2>
      </div>

      <ol className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {processSteps.map((step, index) => (
          <li key={step} className="flex flex-col gap-2">
            <span className="text-xs font-mono text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-sm font-semibold">{t(`${step}.title`)}</h3>
            <p className="text-xs leading-relaxed text-muted">
              {t(`${step}.description`)}
            </p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <Container className="border-b border-border py-8 sm:py-10">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          index="06"
          eyebrow={t("eyebrow")}
          lead={t("headingLead")}
          accent={t("headingAccent")}
          description={t("pageSubtitle")}
        />
      </Container>

      <Container className="flex flex-col gap-10">
        <ServiceGrid />
        <Reveal>
          <Process />
        </Reveal>

        {profile.contact.agency ? (
          <Reveal>
            <a
              href={profile.contact.agency}
              target="_blank"
              rel="noreferrer noopener"
              className="card card-hover flex items-center justify-between gap-4 p-5"
            >
              <span className="text-sm">
                <span className="font-semibold">{t("agencyTitle")}</span>
                <span className="block text-muted">{t("agencySubtitle")}</span>
              </span>
              <icons.ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
            </a>
          </Reveal>
        ) : null}
      </Container>

      <Container className="py-10 sm:py-14">
        <CtaBanner />
      </Container>
    </>
  );
}
