"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/content/site";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link href="/" className="group flex items-baseline gap-1.5">
          <span className="font-display text-base tracking-tight sm:text-lg">
            {profile.firstName}
          </span>
          <span className="h-1 w-1 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "link-underline py-1 text-sm transition-colors",
                pathname === item.href
                  ? "text-foreground after:origin-left after:scale-x-100"
                  : "text-muted hover:text-foreground",
              )}
            >
              {t(item.id)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="-mr-1 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={cn(
                "h-px w-5 bg-foreground transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-foreground transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border bg-background transition-[grid-template-rows] duration-300 md:hidden",
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0",
        )}
      >
        <div className="min-h-0">
          <Container className="flex flex-col py-2">
            {navItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-baseline gap-4 border-b border-border py-3.5 last:border-b-0"
              >
                <span className="label">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl">{t(item.id)}</span>
              </Link>
            ))}
            <LanguageSwitcher className="my-4 self-start sm:hidden" />
          </Container>
        </div>
      </div>
    </header>
  );
}
