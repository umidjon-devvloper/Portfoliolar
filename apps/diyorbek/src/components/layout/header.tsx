"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { profile, sections } from "@/content/profile";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-sm font-semibold">
          <span className="text-accent">~/</span>
          {profile.firstName.toLowerCase()}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-accent"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className={cn("border-t border-border bg-background md:hidden")}>
          <Container className="flex flex-col gap-1 py-4">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted hover:bg-surface hover:text-accent"
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
