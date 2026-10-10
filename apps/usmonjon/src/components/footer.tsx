import { getLocale, getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="border-t border-seam">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-fog sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. {t("rights")}
        </p>
        <p className="font-mono text-xs">usmonjon.site</p>
      </div>
    </footer>
  );
}
