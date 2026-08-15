import { Globe, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { profile } from "@/content/profile";
import { AboutFacts } from "./about-facts";

/**
 * Full-bleed panel: copy on the left, the cut-out portrait filling the
 * right half, and the fact card floating over it — the same construction
 * as the home hero so the two pages read as one site.
 */
export function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative isolate border-b border-border lg:min-h-[32rem]">
      {profile.avatar ? (
        <div
          className="pointer-events-none absolute bottom-0 right-[13rem] hidden h-[96%] w-[32rem] lg:block xl:right-[16rem] xl:w-[36rem]"
          aria-hidden
        >
          <Image
            src={profile.avatar}
            alt=""
            fill
            priority
            sizes="36rem"
            className="object-contain object-bottom"
          />
        </div>
      ) : null}

      <div className="relative flex flex-col gap-5 px-5 py-10 sm:px-7 lg:max-w-[32rem] lg:py-16 lg:pl-12 xl:pl-16">
        <Breadcrumb current={t("breadcrumb")} />

        <span className="eyebrow">{t("eyebrow")}</span>

        <h1 className="type-page enter">
          {t("headingLead")} <span className="text-accent">{t("headingAccent")}</span>.
        </h1>

        <p className="enter max-w-md leading-relaxed text-muted">{t("shortBio")}</p>

        <div className="enter flex flex-col gap-2 text-sm text-muted">
          {profile.location ? (
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              {profile.location.city}, {profile.location.country}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2">
            <Globe className="h-4 w-4 text-accent" />
            {t("availability")}
          </span>
        </div>

        <span className="enter select-none text-3xl italic text-accent/90" style={{ fontFamily: "cursive" }}>
          {profile.firstName}
        </span>

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
      </div>

      <div className="px-5 pb-10 sm:px-7 lg:absolute lg:right-8 lg:top-1/2 lg:w-[19rem] lg:-translate-y-1/2 lg:px-0 lg:pb-0 xl:right-12 xl:w-[21rem]">
        <AboutFacts />
      </div>
    </section>
  );
}
