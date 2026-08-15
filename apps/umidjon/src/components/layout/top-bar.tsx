"use client";

import * as icons from "lucide-react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/content/nav";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

type IconName = keyof typeof icons;

export function TopBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/90 px-5 backdrop-blur-lg sm:px-8 lg:h-14 lg:justify-end">
        <Link href="/" className="text-2xl font-extrabold tracking-tight lg:hidden">
          U<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-border bg-surface transition-transform duration-300 lg:hidden",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:px-8">
          <span className="text-2xl font-extrabold tracking-tight">
            U<span className="text-accent">.</span>
          </span>
          <button
            type="button"
            aria-label={t("closeMenu")}
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-2 px-5 pb-6 sm:px-8">
          {navItems.map((item) => {
            const Icon = icons[item.icon as IconName] as icons.LucideIcon;
            const active = pathname === item.href;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-border px-3 py-3 text-sm",
                    active ? "border-accent bg-accent-soft text-accent" : "text-muted",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t(item.id)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
