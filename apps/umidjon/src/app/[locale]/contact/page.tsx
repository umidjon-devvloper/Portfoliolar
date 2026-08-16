import type { Metadata } from "next";
import { ArrowRight, Globe, Target, UserRound, Zap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/sections/contact-form";
import {
  ContactChannels,
  type Channel,
} from "@/components/sections/contact-channels";
import { WorldMap } from "@/components/sections/world-map";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";

type PageProps = { params: Promise<{ locale: string }> };

const { contact, location } = profile;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

const highlights = [
  { id: "fast", icon: Zap },
  { id: "open", icon: Target },
  { id: "global", icon: Globe },
] as const;

const legendKeys = ["remote", "worldwide", "flexible", "results"] as const;

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const channels: Channel[] = [
    {
      id: "email",
      icon: "mail",
      label: t("email"),
      value: contact.email,
      href: `mailto:${contact.email}`,
      copy: contact.email,
    },
    contact.phone
      ? {
          id: "phone",
          icon: "phone",
          label: t("phone"),
          value: contact.phoneDisplay ?? contact.phone,
          href: `tel:${contact.phone}`,
          copy: contact.phone,
        }
      : null,
    contact.telegram
      ? {
          id: "telegram",
          icon: "telegram",
          label: t("telegram"),
          value: contact.telegramHandle ?? "Telegram",
          href: contact.telegram,
          copy: contact.telegramHandle,
        }
      : null,
    location
      ? {
          id: "location",
          icon: "location",
          label: t("location"),
          value: `${location.city}, ${location.country}`,
          href: null,
          copy: `${location.city}, ${location.country}`,
        }
      : null,
    {
      id: "availability",
      icon: "clock",
      label: t("availabilityLabel"),
      value: t("hours.description"),
      href: null,
      copy: null,
    },
  ].filter((item): item is Channel => item !== null);

  return (
    <>
      <Container className="relative overflow-hidden border-b border-border py-10 sm:py-12">
        <PlaneDecor />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-12">
          <div className="flex flex-col gap-10">
            <PageHeader
              className="lg:grid-cols-1"
              breadcrumb={t("breadcrumb")}
              index="07"
              lead={t("headingLead")}
              accent={t("headingAccent")}
              description={t("pageSubtitle")}
            />

            <div className="grid gap-8 sm:grid-cols-3 sm:gap-0">
              {highlights.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex flex-col gap-3 sm:px-6 ${
                    index === 0 ? "sm:pl-0" : "sm:border-l sm:border-border"
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-accent/40 text-accent">
                    <item.icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.6} />
                  </span>
                  <span className="text-[0.875rem] font-semibold text-accent">
                    {t(`${item.id}.title`)}
                  </span>
                  <span className="text-xs leading-[1.75] text-muted">
                    {t(`${item.id}.description`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Reveal delay={80}>
            <Card hover={false} className="p-6 sm:p-8">
              <h2 className="eyebrow mb-6 block">{t("formTitle")}</h2>
              <ContactForm />
            </Card>
          </Reveal>
        </div>
      </Container>

      <Container className="grid gap-10 border-b border-border py-12 sm:py-14 lg:grid-cols-[minmax(0,23rem)_1fr] lg:gap-12">
        <Reveal className="flex flex-col gap-5">
          <h2 className="eyebrow">{t("getInTouchTitle")}</h2>
          <ContactChannels channels={channels} />
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-5">
          <h2 className="eyebrow">{t("mapTitle")}</h2>
          {location ? (
            <WorldMap
              label={t("mapTitle")}
              city={location.city}
              country={location.country}
              legend={legendKeys.map((key) => t(`legend.${key}`))}
            />
          ) : null}
        </Reveal>
      </Container>

      <Container className="py-12 sm:py-14">
        <Reveal>
          <Card hover={false} className="relative overflow-hidden p-7 sm:p-9">
            <div className="pointer-events-none absolute inset-0 glow" aria-hidden />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full border border-accent/40 text-accent sm:grid">
                  <UserRound className="h-6 w-6" strokeWidth={1.4} />
                </span>

                <div className="flex flex-col gap-2">
                  <span className="type-section">{t("ctaTitle")}</span>
                  <span className="type-section text-accent">{t("ctaAccent")}</span>
                  <p className="max-w-[46ch] text-[0.875rem] leading-[1.8] text-muted">
                    {t("ctaText")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 lg:items-end">
                <a
                  href={`mailto:${contact.email}`}
                  className={`${buttonVariants({ size: "lg" })} text-xs font-semibold uppercase tracking-[0.14em]`}
                >
                  {t("ctaButton")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>

                <span className="signature" aria-hidden>
                  {profile.firstName}
                </span>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </>
  );
}

/* Paper plane and dot field from the design, decoration only. */
function PlaneDecor() {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute -right-6 -top-8 hidden h-[13rem] w-[22rem] xl:block"
    >
      <defs>
        <pattern id="plane-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.2" fill="var(--accent)" opacity="0.5" />
        </pattern>

        <radialGradient id="plane-glow" cx="72%" cy="34%" r="46%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="360" height="200" fill="url(#plane-glow)" />
      <rect x="10" y="18" width="120" height="66" fill="url(#plane-dots)" opacity="0.7" />

      <path
        d="M40 168 C 130 150, 210 110, 268 58"
        stroke="var(--accent)"
        strokeWidth="1.3"
        strokeDasharray="5 6"
        opacity="0.6"
        strokeLinecap="round"
      />

      <g
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M276 60 L 330 26 L 312 84 L 296 68 Z" />
        <path d="M276 60 L 296 68 L 330 26" />
      </g>
    </svg>
  );
}
