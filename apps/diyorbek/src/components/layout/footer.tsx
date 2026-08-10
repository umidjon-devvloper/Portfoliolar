import { Github, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { profile, site } from "@/content/profile";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const { contact } = profile;

  const socials = [
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
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          <span className="text-accent">$</span> echo &quot;© {year}{" "}
          {site.domain} — {t("rights")}&quot;
        </p>
        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-accent"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
