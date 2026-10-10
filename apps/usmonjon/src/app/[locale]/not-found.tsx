import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <p className="font-mono text-sm text-fog">
        <span className="text-signal">$</span> curl -I usmonjon.site
        <br />
        HTTP/2 404
      </p>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-[30rem] text-fog">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-sm bg-signal px-5 py-3 font-medium text-signal-ink transition-colors hover:bg-frost"
      >
        {t("home")}
      </Link>
    </section>
  );
}
