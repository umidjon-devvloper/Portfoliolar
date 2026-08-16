import type { Metadata } from "next";
import * as icons from "lucide-react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PageVisual } from "@/components/ui/page-visual";
import { CodeVisual } from "@/components/ui/code-visual";
import { Card } from "@/components/ui/card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { buildServicesSnippet } from "@/content/code-sample";
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
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.icon as IconName] as icons.LucideIcon;

          return (
            <StaggerItem key={service.id} index={index} className="flex">
              <Card className="group flex w-full flex-col gap-6 bg-surface-2 p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[var(--radius-btn)] bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[0.75rem] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-[1.1875rem] font-bold tracking-tight transition-colors group-hover:text-accent">
                    {t(`${service.id}.title`)}
                  </h2>
                  <p className="text-[0.9375rem] leading-[1.8] text-muted">
                    {t(`${service.id}.description`)}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[0.875rem]">
                      <span className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-muted">{point}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="group/link mt-auto inline-flex items-center gap-2 pt-3 text-[0.875rem] font-medium text-accent"
                >
                  {t("learnMore")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1.5" />
                </Link>
              </Card>
            </StaggerItem>
          );
        })}
      </div>
    </Stagger>
  );
}

const stepIcon: Record<string, IconName> = {
  discuss: "MessagesSquare",
  plan: "FileText",
  build: "Code",
  deliver: "Rocket",
  support: "ChartNoAxesColumn",
};

function Process() {
  const t = useTranslations("process");

  return (
    <Card hover={false} className="flex flex-col gap-9 p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="type-section">{t("title")}</h2>
        </div>
        <p className="max-w-sm text-sm leading-[1.75] text-muted">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative">
        {/* dotted rail behind the markers */}
        <span
          className="absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-accent/40 lg:block"
          aria-hidden
        />

        <ol className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {processSteps.map((step, index) => {
            const Icon = icons[stepIcon[step] ?? "Code"] as icons.LucideIcon;

            return (
              <li
                key={step}
                className="group relative flex flex-col items-center gap-3 text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full border border-accent/50 bg-background text-accent transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent-soft">
                  <Icon className="h-6 w-6" strokeWidth={1.4} />
                </span>

                <span className="font-mono text-[0.6875rem] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-[0.9375rem] font-semibold transition-colors group-hover:text-accent">
                  {t(`${step}.title`)}
                </h3>

                <p className="max-w-[15rem] text-xs leading-[1.7] text-muted">
                  {t(`${step}.description`)}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </Card>
  );
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <Container className="border-b border-border py-10 sm:py-12">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          index="06"
          lead={t("headingLead")}
          accent={t("headingAccent")}
          description={t("pageSubtitle")}
          visual={
            <PageVisual
              page="services"
              alt={t("pageTitle")}
              fallback={
                <CodeVisual
                  filename="services.js"
                  lines={buildServicesSnippet({
                    offers: services.map((service) => service.id),
                    from: "Next.js + Node.js",
                    delivery: "Idea to launch",
                  })}
                />
              }
            />
          }
        />
      </Container>

      <Container className="flex flex-col gap-10 py-10 sm:py-12">
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
              <span className="flex flex-col">
                <span className="font-semibold">{t("agencyTitle")}</span>
                <span className="text-sm text-muted">{t("agencySubtitle")}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-accent" />
            </a>
          </Reveal>
        ) : null}

        <Reveal>
          <CtaBanner />
        </Reveal>
      </Container>
    </>
  );
}
