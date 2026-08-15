import { CircleCheck, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";
import { HeroBackdrop } from "./hero-backdrop";

/** Signature drawn as a path so it needs no script font. */
function Signature() {
  return (
    <svg
      viewBox="0 0 240 64"
      fill="none"
      role="img"
      aria-label={profile.fullName ?? profile.firstName}
      className="h-12 w-40 text-accent"
    >
      <path
        d="M12 16 C 10 34, 16 48, 26 46 C 36 44, 38 26, 34 18 C 32 40, 40 50, 50 46 C 58 42, 60 30, 56 26 C 54 38, 62 46, 72 42 C 80 38, 78 28, 74 30 C 70 34, 76 44, 88 40 C 96 37, 100 28, 98 24 C 96 36, 104 44, 116 40 C 126 36, 130 24, 126 20 C 122 30, 128 44, 142 42 C 156 40, 168 26, 176 18 C 168 34, 172 48, 186 44 C 198 40, 206 28, 210 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M186 52 C 196 48, 210 46, 224 48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative isolate border-b border-border lg:h-[30rem]">
      <div
        className="pointer-events-none absolute inset-y-0 left-[62%] hidden w-[38rem] -translate-x-1/2 lg:block"
        aria-hidden
      >
        <HeroBackdrop />
      </div>

      {profile.avatar ? (
        <div
          className="pointer-events-none absolute bottom-0 left-[62%] hidden h-[98%] w-[30rem] -translate-x-1/2 lg:block xl:w-[34rem]"
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

      <div className="relative grid gap-8 px-5 py-8 sm:px-7 lg:h-full lg:grid-cols-[minmax(0,26rem)_1fr_18rem] lg:items-center lg:gap-10 lg:py-0 lg:pl-12 lg:pr-8 xl:pl-16 xl:pr-12">
        <div className="flex flex-col gap-5">
          <Breadcrumb current={t("breadcrumb")} />

          <div className="flex flex-col gap-2">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 className="type-page">
              {t("headingLead")} <span className="text-accent">{t("headingAccent")}</span>.
            </h1>
          </div>

          <p className="text-sm leading-relaxed text-muted sm:text-base">
            {t("shortBio")}
          </p>

          <div className="flex flex-col gap-2 text-sm text-muted">
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

          <Signature />
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
