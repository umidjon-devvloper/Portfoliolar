import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LabelledSection } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function Intro() {
  const t = useTranslations("about");
  const tc = useTranslations("common");

  return (
    <LabelledSection id="about" label={t("label")}>
      <Reveal>
        <div className="flex flex-col gap-10">
          <p className="font-display max-w-4xl text-balance text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.25]">
            {t("shortBio")}
          </p>
          <p className="max-w-2xl leading-relaxed text-muted">{t("longBio")}</p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 self-start text-sm text-accent"
          >
            {tc("readMore")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>
      </Reveal>
    </LabelledSection>
  );
}
