import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Cta() {
  const t = useTranslations("cta");

  return (
    <Section className="border-t border-border bg-surface">
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
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Section>
  );
}
