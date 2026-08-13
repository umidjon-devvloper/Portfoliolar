import type { Metadata } from "next";
import { Github, Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
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
    { href: `mailto:${contact.email}`, icon: Mail, label: contact.email },
    contact.emailSecondary
      ? {
          href: `mailto:${contact.emailSecondary}`,
          icon: Mail,
          label: contact.emailSecondary,
        }
      : null,
    contact.telegram
      ? {
          href: contact.telegram,
          icon: Send,
          label: contact.telegramHandle ?? "Telegram",
        }
      : null,
    contact.phone
      ? {
          href: `tel:${contact.phone}`,
          icon: Phone,
          label: contact.phoneDisplay ?? contact.phone,
        }
      : null,
    contact.github ? { href: contact.github, icon: Github, label: "GitHub" } : null,
    contact.linkedin
      ? { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" }
      : null,
    contact.instagram
      ? { href: contact.instagram, icon: Instagram, label: "Instagram" }
      : null,
  ].filter((item) => item !== null);

  return (
    <Container className="grid gap-16 pb-28 pt-28 sm:pt-36 lg:grid-cols-[1fr_1fr] lg:gap-24">
      <Reveal>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <span className="label">{t("label")}</span>
            <h1 className="font-display type-display text-balance">
              {t("title")}
            </h1>
            <p className="type-lead max-w-lg leading-relaxed text-muted">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-col border-t border-border">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-4 border-b border-border py-4 text-sm text-muted transition-colors hover:text-foreground"
              >
                <channel.icon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                <span className="font-mono">{channel.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ContactForm />
      </Reveal>
    </Container>
  );
}
