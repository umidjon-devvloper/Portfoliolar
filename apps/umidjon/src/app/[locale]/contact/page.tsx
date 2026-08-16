import type { Metadata } from "next";
import { Clock, Globe, Mail, MapPin, Phone, Send, Zap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/sections/contact-form";
import { WorldMap } from "@/components/sections/world-map";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const { contact, location } = profile;

  const channels = [
    {
      id: "email",
      icon: Mail,
      value: contact.email,
      href: `mailto:${contact.email}`,
      note: t("emailNote"),
    },
    contact.phone
      ? {
          id: "phone",
          icon: Phone,
          value: contact.phoneDisplay ?? contact.phone,
          href: `tel:${contact.phone}`,
          note: t("phoneNote"),
        }
      : null,
    contact.telegram
      ? {
          id: "telegram",
          icon: Send,
          value: contact.telegramHandle ?? "Telegram",
          href: contact.telegram,
          note: t("telegramNote"),
        }
      : null,
    location
      ? {
          id: "location",
          icon: MapPin,
          value: `${location.city}, ${location.country}`,
          href: null,
          note: t("locationNote"),
        }
      : null,
  ].filter((item) => item !== null);

  const highlights = [
    { id: "fast", icon: Zap },
    { id: "open", icon: Globe },
    { id: "hours", icon: Clock },
  ];

  return (
    <>
      <Container className="border-b border-border py-8 sm:py-10">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          index="07"
          lead={t("headingLead")}
          accent={t("headingAccent")}
          description={t("pageSubtitle")}
        />
      </Container>

      <Container className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <Reveal className="flex flex-col gap-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {channels.map((channel) => {
              const body = (
                <Card className="flex h-full flex-col gap-2 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
                    <channel.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{t(channel.id)}</span>
                  <span className="break-words text-sm text-accent">
                    {channel.value}
                  </span>
                  <span className="text-xs text-muted">{channel.note}</span>
                </Card>
              );

              return channel.href ? (
                <a
                  key={channel.id}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {body}
                </a>
              ) : (
                <div key={channel.id}>{body}</div>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                <item.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">{t(`${item.id}.title`)}</span>
                <span className="text-xs leading-relaxed text-muted">
                  {t(`${item.id}.description`)}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Card hover={false} className="p-5 sm:p-7">
            <h2 className="eyebrow mb-5">{t("formTitle")}</h2>
            <ContactForm />
          </Card>
        </Reveal>
      </Container>

      <Container className="flex flex-col gap-4 py-12 sm:py-16">
        <h2 className="eyebrow">{t("mapTitle")}</h2>
        <WorldMap label={t("mapTitle")} />
      </Container>
    </>
  );
}
