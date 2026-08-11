import { Github, Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import { navItems, site } from "@/content/site";
import { Container } from "@/components/ui/container";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();
  const { contact } = profile;

  const socials = [
    contact.github
      ? { href: contact.github, icon: Github, label: "GitHub" }
      : null,
    contact.linkedin
      ? { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" }
      : null,
    contact.telegram
      ? { href: contact.telegram, icon: Send, label: "Telegram" }
      : null,
    contact.instagram
      ? { href: contact.instagram, icon: Instagram, label: "Instagram" }
      : null,
    { href: `mailto:${contact.email}`, icon: Mail, label: "Email" },
    contact.phone
      ? { href: `tel:${contact.phone}`, icon: Phone, label: "Phone" }
      : null,
  ].filter((item) => item !== null);

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-8 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-sm font-semibold">
              {profile.firstName}
              <span className="text-accent">.</span>
            </span>
            <span className="text-sm text-muted">{profile.role}</span>
            {contact.agency ? (
              <a
                href={contact.agency}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-accent transition-opacity hover:opacity-80"
              >
                umidjon.agency
              </a>
            ) : null}
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {t(item.id)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="rule-fade" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {site.domain}. {tf("rights")}.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
