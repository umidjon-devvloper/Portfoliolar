import { CircleCheck, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";
import { HeroBackdrop } from "./hero-backdrop";

export function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative isolate border-b border-border lg:h-[30rem]">
      <div
        className="pointer-events-none absolute inset-y-0 left-[56%] hidden w-[40rem] -translate-x-1/2 lg:block"
        aria-hidden
      >
        <HeroBackdrop />
      </div>

      {profile.avatar ? (
        <div
          className="pointer-events-none absolute bottom-0 left-[55%] hidden h-[98%] w-[32rem] -translate-x-1/2 lg:block xl:left-[56%] xl:w-[36rem]"
          aria-hidden
        >
          <Image
            src={profile.avatar}
            alt=""
            fill
            priority
            sizes="34rem"
            className="object-contain object-bottom"
          />
        </div>
      ) : null}

      <div className="relative grid gap-8 px-5 py-8 sm:px-7 lg:h-full lg:grid-cols-[minmax(0,24rem)_1fr_19rem] lg:items-center lg:gap-8 lg:py-0 lg:pl-12 lg:pr-8 xl:pl-16 xl:pr-12">
        <div className="flex flex-col">
          <Breadcrumb current={t("breadcrumb")} />

          <span className="eyebrow mt-5">{t("eyebrow")}</span>

          <h1 className="type-page mt-2.5">
            {t("headingLead")} <span className="text-accent">{t("headingAccent")}</span>.
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {t("shortBio")}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 text-sm text-muted">
            {profile.location ? (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                {profile.location.city}, {profile.location.country}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <CircleCheck className="h-4 w-4 text-accent" />
              {t("availability")}
            </span>
          </div>

          <span className="signature mt-6">{profile.firstName}</span>
        </div>

        {/* Portrait occupies this column on desktop */}
        <div className="hidden lg:block" aria-hidden />

        {profile.avatar ? (
          <div className="relative mx-auto aspect-[109/100] w-full max-w-sm lg:hidden">
            <Image
              src={profile.avatar}
              alt={profile.fullName ?? profile.firstName}
              fill
              priority
              sizes="(min-width: 640px) 24rem, 100vw"
              className="object-contain object-bottom"
            />
          </div>
        ) : null}

        <Card hover={false} className="divide-y divide-border lg:bg-surface/90 lg:backdrop-blur">
          <Fact label={t("birth")} value={t("birthValue")} />
          <Fact label={t("education")} value={t("educationValue")} />
          <Fact label={t("languages")} value={t("languagesValue")} multiline />
          <Fact label={t("focus")} value={t("focusValue")} multiline />
        </Card>
      </div>
    </section>
  );
}

function Fact({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-3">
      <span className="text-[0.6875rem] text-muted">{label}</span>
      {multiline ? (
        <span className="flex flex-col text-sm leading-snug">
          {value.split(" · ").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      ) : (
        <span className="text-sm leading-snug">{value}</span>
      )}
    </div>
  );
}
