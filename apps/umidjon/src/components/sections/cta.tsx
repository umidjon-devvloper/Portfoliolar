import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Cta() {
  const t = useTranslations("cta");

  return (
    <section className="noise relative overflow-hidden border-t border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
      <Container className="relative py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:items-center sm:text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
              {t("title")}
            </h2>
            <p className="max-w-xl text-balance text-muted">{t("subtitle")}</p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              {t("button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
