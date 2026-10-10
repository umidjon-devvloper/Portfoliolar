import { getLocale, getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";
import { LanguageSwitcher } from "./language-switcher";
import { Monogram } from "./monogram";

const sections = ["about", "experience", "work", "skills"] as const;

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <header className="sticky top-0 z-40 border-b border-seam bg-bastion/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={`${profile.firstName} ${profile.lastName}`}>
          <Monogram size="sm" />
          <span className="hidden font-display text-sm font-medium tracking-tight sm:inline">
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <nav aria-label="Primary" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-fog">
            {sections.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-frost">
                  {t(id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <LanguageSwitcher label={t("language")} />
          <a
            href="#contact"
            className="rounded-sm bg-signal px-3.5 py-1.5 text-sm font-medium text-signal-ink transition-colors hover:bg-frost"
          >
            {t("contact")}
          </a>
        </div>
      </div>
    </header>
  );
}
