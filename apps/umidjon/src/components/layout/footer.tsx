import { Github, Linkedin, Mail, Send } from "lucide-react";
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
    contact.email
      ? { href: `mailto:${contact.email}`, icon: Mail, label: "Email" }
      : null,
  ].filter((item) => item !== null);

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm font-semibold">
              {profile.firstName}
              <span className="text-accent">.</span>
            </span>
            <span className="text-sm text-muted">{profile.role}</span>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
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

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {site.domain}. {tf("rights")}.
          </p>

          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
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
