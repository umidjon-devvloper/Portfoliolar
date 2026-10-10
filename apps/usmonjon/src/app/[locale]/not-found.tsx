import { ArrowLeft, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Container className="flex min-h-[68vh] flex-col items-center justify-center gap-8 py-16 text-center sm:py-24">
      <div className="relative">
        <span
          className="pointer-events-none absolute inset-0 -z-10 scale-150 glow"
          aria-hidden
        />
        <span className="block text-[clamp(7rem,26vw,18rem)] font-extrabold leading-[0.85] tracking-tighter text-accent">
          404
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <h1 className="type-section">
          {t("headingLead")}{" "}
          <span className="text-accent">{t("headingAccent")}</span>
        </h1>
        <span className="rule-taper" aria-hidden />
        <p className="max-w-[42ch] text-[0.9375rem] leading-[1.8] text-muted">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
          {t("home")}
        </Link>
        <Link
          href="/work"
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          <Briefcase className="h-4 w-4" />
          {t("work")}
        </Link>
      </div>
    </Container>
  );
}
