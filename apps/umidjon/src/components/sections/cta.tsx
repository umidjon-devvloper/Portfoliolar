import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Cta() {
  const t = useTranslations("cta");
  const { contact } = profile;

  return (
    <section className="grain relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 wash" aria-hidden />
      <Container className="relative py-28 sm:py-36 lg:py-44">
        <div className="flex flex-col gap-10">
          <h2 className="font-display type-mega max-w-[14ch] text-balance">
            {t("title")}
          </h2>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="type-lead max-w-md leading-relaxed text-muted">
              {t("subtitle")}
            </p>

            <div className="flex flex-col gap-4">
              <Link href="/contact" className={buttonVariants({ size: "lg" })}>
                {t("button")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="font-mono text-xs text-muted transition-colors hover:text-foreground"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
