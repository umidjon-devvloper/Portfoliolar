import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { services } from "@/content/site";

/**
 * A price list, set as a list. Cards with icons made eight equal
 * boxes and buried the one thing a client is scanning for: the number.
 */
export function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative z-10 border-y border-border bg-surface">
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-[10rem_1fr] lg:gap-16 xl:grid-cols-[14rem_1fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <span className="label flex items-center gap-3">
              <span className="h-px w-6 bg-accent" aria-hidden />
              {t("label")}
            </span>
          </div>

          <div className="flex flex-col gap-10">
            <h2 className="font-display type-display max-w-2xl text-balance">
              {t("title")}
            </h2>

            <dl className="flex flex-col border-t border-border">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group grid gap-2 border-b border-border py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10"
                >
                  <div className="flex flex-col gap-1.5">
                    <dt className="text-lg font-medium transition-colors group-hover:text-accent">
                      {t(`${service.id}.title`)}
                    </dt>
                    <dd className="max-w-xl text-sm leading-relaxed text-muted">
                      {t(`${service.id}.description`)}
                    </dd>
                  </div>

                  <dd className="font-mono text-sm text-muted sm:text-right">
                    {service.priceFrom !== null ? (
                      <>
                        <span className="text-muted/70">{t("from")} </span>
                        <span className="text-foreground">
                          ${service.priceFrom.toLocaleString("en-US")}
                        </span>
                      </>
                    ) : (
                      <span className="text-muted/70">{t("onRequest")}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-xs leading-relaxed text-muted">
                {t("priceNote")}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 self-start text-sm text-accent"
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
