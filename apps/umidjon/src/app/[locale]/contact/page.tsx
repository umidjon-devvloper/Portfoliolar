import type { Metadata } from "next";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { profile } from "@/content/profile";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const { contact } = profile;
  const channels = [
    contact.email
      ? { href: `mailto:${contact.email}`, icon: Mail, label: contact.email }
      : null,
    contact.telegram
      ? { href: contact.telegram, icon: Send, label: "Telegram" }
      : null,
    contact.phone
      ? { href: `tel:${contact.phone}`, icon: Phone, label: contact.phone }
      : null,
    contact.github
      ? { href: contact.github, icon: Github, label: "GitHub" }
      : null,
    contact.linkedin
      ? { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" }
      : null,
  ].filter((item) => item !== null);

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />

          <div className="flex flex-col gap-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
              >
                <channel.icon className="h-4 w-4 text-accent" />
                {channel.label}
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
