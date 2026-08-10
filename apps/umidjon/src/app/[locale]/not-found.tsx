import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Section className="flex min-h-[60vh] items-center">
      <div className="flex flex-col items-start gap-6">
        <span className="font-mono text-6xl font-semibold text-accent sm:text-8xl">
          404
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-md text-muted">{t("description")}</p>
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          {t("back")}
        </Link>
      </div>
    </Section>
  );
}
