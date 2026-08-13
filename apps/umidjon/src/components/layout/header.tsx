"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
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
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 24)), [scrollY]);
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-base tracking-tight sm:text-lg">
            {profile.firstName}
          </span>
          <span className="h-1 w-1 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {t(item.id)}
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
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

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <Container className="flex flex-col py-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.05 }}
                  className="border-b border-border last:border-b-0"
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="label">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl">{t(item.id)}</span>
                  </Link>
                </motion.div>
              ))}
              <LanguageSwitcher className="my-4 self-start sm:hidden" />
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
