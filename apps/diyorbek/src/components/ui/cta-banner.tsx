import { ArrowRight, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "./button";
import { Card } from "./card";

export function CtaBanner() {
  const t = useTranslations("cta");

  return (
    <Card hover={false} className="relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 glow" aria-hidden />
      <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent sm:grid">
            <Send className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="type-section">{t("title")}</span>
            <span className="text-accent">{t("subtitle")}</span>
          </div>
        </div>

        <Link href="/contact" className={buttonVariants({ size: "lg" })}>
          {t("button")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
}
