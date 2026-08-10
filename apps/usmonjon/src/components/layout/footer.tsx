import { Dribbble, Github, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { profile, site } from "@/content/profile";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const { contact } = profile;

  const socials = [
    contact.behance
      ? { href: contact.behance, icon: Dribbble, label: "Behance" }
      : null,
    contact.dribbble
      ? { href: contact.dribbble, icon: Dribbble, label: "Dribbble" }
      : null,
    contact.github
      ? { href: contact.github, icon: Github, label: "GitHub" }
      : null,
    contact.telegram
      ? { href: contact.telegram, icon: Send, label: "Telegram" }
      : null,
    contact.email
      ? { href: `mailto:${contact.email}`, icon: Mail, label: "Email" }
      : null,
  ].filter((item) => item !== null);

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-display text-2xl">{profile.firstName}</span>
          <span className="text-sm text-muted">{profile.role}</span>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted">
            © {year} {site.domain}. {t("rights")}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
