import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Container className="flex min-h-[70svh] flex-col justify-center gap-8 py-28">
      <span className="font-display type-mega text-accent">404</span>
      <h1 className="font-display type-display text-balance">{t("title")}</h1>
      <p className="type-lead max-w-md leading-relaxed text-muted">
        {t("description")}
      </p>
      <Link href="/" className={`${buttonVariants({ size: "lg" })} self-start`}>
        {t("back")}
      </Link>
    </Container>
  );
}
