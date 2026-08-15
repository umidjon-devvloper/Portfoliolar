"use client";

import * as icons from "lucide-react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/content/nav";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

type IconName = keyof typeof icons;

export function Sidebar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const { contact } = profile;

  const socials = [
    contact.github ? { href: contact.github, icon: Github, label: "GitHub" } : null,
    contact.linkedin ? { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" } : null,
    contact.telegram ? { href: contact.telegram, icon: Send, label: "Telegram" } : null,
    { href: `mailto:${contact.email}`, icon: Mail, label: "Email" },
  ].filter((item) => item !== null);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar)] flex-col justify-between border-r border-border bg-surface px-4 py-7 lg:flex">
      <div className="flex flex-col gap-9">
        <Link href="/" className="px-2 text-3xl font-extrabold tracking-tight">
          U<span className="text-accent">.</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = icons[item.icon as IconName] as icons.LucideIcon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-surface-2 hover:text-foreground",
                )}
              >
                {active ? (
                  <span className="absolute inset-y-1.5 -left-4 w-0.5 rounded-r bg-accent" />
                ) : null}
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{t(item.id)}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-5">
        <p className="px-2 text-xs leading-relaxed text-muted">{tc("sidebarNote")}</p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
        >
          {tc("letsTalk")}
          <icons.ArrowUpRight className="h-3.5 w-3.5" />
        </Link>

        <div className="flex flex-wrap gap-3 px-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label}
              className="text-muted transition-colors hover:text-accent"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
