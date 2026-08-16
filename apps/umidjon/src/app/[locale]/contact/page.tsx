import type { Metadata } from "next";
import {
  Clock,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PageVisual } from "@/components/ui/page-visual";
import { CodeVisual } from "@/components/ui/code-visual";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/sections/contact-form";
import { WorldMap } from "@/components/sections/world-map";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { buildContactSnippet } from "@/content/code-sample";
import { metrics, profile } from "@/content/profile";

type PageProps = { params: Promise<{ locale: string }> };

const { contact, location } = profile;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

type Channel = {
  id: string;
  icon: LucideIcon;
  value: string;
  href: string | null;
  external: boolean;
};

const channels: Channel[] = [
  {
    id: "email",
    icon: Mail,
    value: contact.email,
    href: `mailto:${contact.email}`,
    external: false,
  },
  contact.phone
    ? {
        id: "phone",
        icon: Phone,
        value: contact.phoneDisplay ?? contact.phone,
        href: `tel:${contact.phone}`,
        external: false,
      }
    : null,
  contact.telegram
    ? {
        id: "telegram",
        icon: Send,
        value: contact.telegramHandle ?? "Telegram",
        href: contact.telegram,
        external: true,
      }
    : null,
  location
    ? {
        id: "location",
        icon: MapPin,
        value: `${location.city}, ${location.country}`,
        href: null,
        external: false,
      }
    : null,
].filter((item): item is Channel => item !== null);

const availability = [
  { id: "fast", icon: Zap },
  { id: "open", icon: Globe },
  { id: "hours", icon: Clock },
] as const;

const socials = [
  { id: "github", icon: Github, href: contact.github },
  { id: "linkedin", icon: Linkedin, href: contact.linkedin },
  { id: "instagram", icon: Instagram, href: contact.instagram },
  { id: "telegram", icon: Send, href: contact.telegram },
].filter((item): item is { id: string; icon: LucideIcon; href: string } =>
  Boolean(item.href),
);

function Channels() {
  const t = useTranslations("contact");

  return (
    <Stagger>
      <div className="grid gap-4 sm:grid-cols-2">
        {channels.map((channel, index) => {
          const Icon = channel.icon;

          const body = (
            <Card className="group flex h-full flex-col gap-4 bg-surface-2 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-btn)] bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-[0.6875rem] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[0.9375rem] font-semibold transition-colors group-hover:text-accent">
                  {t(channel.id)}
                </span>
                <span className="break-all text-[0.8125rem] text-accent">
                  {channel.value}
                </span>
                <span className="text-xs leading-[1.7] text-muted">
                  {t(`${channel.id}Note`)}
                </span>
              </div>
            </Card>
          );

          return (
            <StaggerItem key={channel.id} index={index} className="flex">
              {channel.href ? (
                <a
                  href={channel.href}
                  className="w-full"
                  {...(channel.external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  {body}
                </a>
              ) : (
                <div className="w-full">{body}</div>
              )}
            </StaggerItem>
          );
        })}
      </div>
    </Stagger>
  );
}

function Availability() {
  const t = useTranslations("contact");

  return (
    <Card hover={false} className="flex flex-col divide-y divide-border p-0">
      {availability.map((item) => (
        <div key={item.id} className="flex items-start gap-4 p-5">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent/40 text-accent">
            <item.icon className="h-4 w-4" strokeWidth={1.6} />
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[0.875rem] font-semibold">
              {t(`${item.id}.title`)}
            </span>
            <span className="text-xs leading-[1.7] text-muted">
              {t(`${item.id}.description`)}
            </span>
          </div>
        </div>
      ))}
    </Card>
  );
}

function Socials() {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow">{t("socialsTitle")}</span>
      <div className="flex flex-wrap gap-3">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={social.id}
            className="tile grid h-11 w-11 place-items-center rounded-[var(--radius-btn)] border border-border bg-surface text-muted hover:text-accent"
          >
            <social.icon className="h-[1.0625rem] w-[1.0625rem]" strokeWidth={1.6} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const response = metrics.find((metric) => metric.id === "response");
  const homeLabel = location ? `${location.city}, ${location.country}` : null;

  return (
    <>
      <Container className="border-b border-border py-10 sm:py-12">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          index="07"
          lead={t("headingLead")}
          accent={t("headingAccent")}
          description={t("pageSubtitle")}
          visual={
            <PageVisual
              page="contact"
              alt={t("pageTitle")}
              fallback={
                <CodeVisual
                  filename="contact.js"
                  lines={buildContactSnippet({
                    name: profile.firstName,
                    telegram: contact.telegramHandle,
                    location: location
                      ? `${location.city}, ${location.countryCode}`
                      : null,
                    replyWithin: response
                      ? `${response.value}${response.suffix}`
                      : null,
                    status: "open",
                  })}
                />
              }
            />
          }
        />
      </Container>

      <Container className="grid gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,25rem)_1fr] lg:gap-10">
        <div className="flex flex-col gap-6">
          <Reveal className="flex flex-col gap-2">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="type-section">{t("channelsTitle")}</h2>
            <span className="rule-taper mt-2" aria-hidden />
          </Reveal>

          <Channels />

          <Reveal>
            <Availability />
          </Reveal>

          <Reveal>
            <Socials />
          </Reveal>
        </div>

        <Reveal delay={80}>
          <Card hover={false} className="h-full p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-2">
              <span className="eyebrow">{t("formEyebrow")}</span>
              <h2 className="type-section">{t("formTitle")}</h2>
              <p className="text-[0.875rem] leading-[1.75] text-muted">
                {t("formNote")}
              </p>
            </div>

            <ContactForm />
          </Card>
        </Reveal>
      </Container>

      <Container className="flex flex-col gap-5 pb-14 sm:pb-20">
        <Reveal className="flex flex-col gap-2">
          <span className="eyebrow">{t("mapEyebrow")}</span>
          <h2 className="type-section">{t("mapTitle")}</h2>
        </Reveal>

        {homeLabel ? (
          <Reveal delay={60}>
            <WorldMap label={t("mapTitle")} home={homeLabel} note={t("mapNote")} />
          </Reveal>
        ) : null}
      </Container>
    </>
  );
}
