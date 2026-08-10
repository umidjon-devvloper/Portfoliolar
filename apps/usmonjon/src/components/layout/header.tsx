"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { profile, sections } from "@/content/profile";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#top" className="font-display text-lg tracking-tight sm:text-xl">
          {profile.firstName}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-muted underline-offset-8 transition-colors hover:text-foreground hover:underline"
            >
              {t(id)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-muted hover:bg-surface-2 hover:text-foreground"
              >
                {t(id)}
              </a>
            ))}
            <LanguageSwitcher className="mt-3 self-start sm:hidden" />
          </Container>
        </div>
      ) : null}
    </header>
  );
}
