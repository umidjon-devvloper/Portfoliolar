import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { StatusRail } from "@/components/layout/status-rail";
import { Marquee } from "@/components/motion/marquee";
import { marqueeSkills } from "@/content/profile";

export function Hero() {
  const t = useTranslations("hero");
  const words = t("titleLead").split(" ");
  const accent = t("titleAccent").split(" ");

  return (
    <section className="grain relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 wash" aria-hidden />
      <div className="pointer-events-none absolute inset-0 mesh" aria-hidden />

      <Container className="relative grid gap-10 pb-14 pt-28 sm:pb-16 sm:pt-32 lg:grid-cols-[1fr_13rem] lg:gap-14 lg:pb-20 lg:pt-36">
        <div className="flex flex-col gap-7">
          <span className="label enter" style={{ animationDelay: "60ms" }}>
            {t("eyebrow")}
          </span>

          <h1 className="font-display type-mega max-w-[17ch]">
            {words.map((word, index) => (
              <span key={`lead-${index}`} className="inline-block overflow-hidden align-bottom">
                <span
                  className="enter-up inline-block"
                  style={{ animationDelay: `${120 + index * 55}ms` }}
                >
                  {word}&nbsp;
                </span>
              </span>
            ))}
            {accent.map((word, index) => (
              <span key={`accent-${index}`} className="inline-block overflow-hidden align-bottom">
                <span
                  className="enter-up gradient-text inline-block"
                  style={{ animationDelay: `${120 + (words.length + index) * 55}ms` }}
                >
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </h1>

          <p
            className="enter type-lead max-w-lg leading-relaxed text-muted"
            style={{ animationDelay: "460ms" }}
          >
            {t("subtitle")}
          </p>

          <div
            className="enter flex flex-wrap items-center gap-3"
            style={{ animationDelay: "540ms" }}
          >
            <Link href="/projects" className={buttonVariants({ size: "lg" })}>
              {t("primaryCta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t("secondaryCta")}
            </Link>
          </div>
        </div>

        <div className="enter" style={{ animationDelay: "620ms" }}>
          <StatusRail />
        </div>
      </Container>

      <div className="relative border-t border-border py-3.5">
        <Marquee items={marqueeSkills} />
      </div>
    </section>
  );
}
