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
    contact.github ? { href: contact.github, icon: Github, label: "GitHub" } : null,
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
    contact.phone ? { href: `tel:${contact.phone}`, icon: Phone, label: "Phone" } : null,
  ].filter((item) => item !== null);

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-16 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="font-display text-3xl">
              {profile.firstName}
              <span className="text-accent">.</span>
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {profile.role}
            </p>
            {contact.agency ? (
              <a
                href={contact.agency}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-xs text-accent transition-opacity hover:opacity-70"
              >
                umidjon.agency ↗
              </a>
            ) : null}
          </div>

          <nav className="flex flex-col gap-3">
            <span className="label">{tf("pages")}</span>
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

          <div className="flex flex-col gap-3">
            <span className="label">{tf("elsewhere")}</span>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                <social.icon className="h-3.5 w-3.5" />
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {year} {site.domain} — {tf("rights")}
          </p>
          <p className="font-mono text-xs text-muted">{tf("builtWith")}</p>
        </div>
      </Container>
    </footer>
  );
}
