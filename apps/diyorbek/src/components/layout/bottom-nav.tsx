"use client";

import * as icons from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { bottomNavIds, navItems } from "@/content/nav";
import { cn } from "@/lib/utils";

type IconName = keyof typeof icons;

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const items = bottomNavIds
    .map((id) => navItems.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {items.map((item) => {
          const Icon = icons[item.icon as IconName] as icons.LucideIcon;
          const active = pathname === item.href;

          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 px-1 py-2.5 text-[0.625rem] font-medium transition-colors",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "scale-110")} />
                {t(item.id)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
