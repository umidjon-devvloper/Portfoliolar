import { ArrowRight, CircleCheck, Download, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";

const codeLines = [
  { text: "const developer = {", accent: false },
  { text: '  name: "Umidjon",', accent: true },
  { text: '  role: "Full-Stack Developer",', accent: true },
  { text: '  passion: "Building digital products",', accent: true },
  { text: '  skills: ["Next.js", "React", "Node.js"],', accent: true },
  { text: '  focus: "Performance & User Experience"', accent: true },
  { text: "};", accent: false },
];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate border-b border-border lg:h-[33rem]">
      {profile.avatar ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34rem] xl:w-[40rem] lg:block"
          aria-hidden
        >
          <Image
            src={profile.avatar}
            alt=""
            fill
            priority
            sizes="40rem"
            className="portrait-mask object-cover object-[60%_20%]"
          />
        </div>
      ) : null}

      <div className="relative flex h-full flex-col justify-center gap-6 px-5 py-10 sm:px-7 lg:max-w-[34rem] lg:py-0 xl:px-10">
        <span className="text-sm text-muted">👋 {t("greeting")}</span>

        <div className="enter flex flex-col gap-1">
          <h1 className="type-hero">{profile.firstName}</h1>
          <p className="type-section font-bold">
            Full-Stack <span className="text-accent">Developer</span>
          </p>
        </div>

        <p className="enter max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          {t("subtitle")}
        </p>

        <div className="enter flex flex-wrap gap-3">
          <Link href="/work" className={buttonVariants({ size: "lg" })}>
            {t("primaryCta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
          <Link
            href="/resume"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            <Download className="h-4 w-4" />
            {t("secondaryCta")}
          </Link>
        </div>

        <div className="enter flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          {profile.location ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {profile.location.city}, {profile.location.country}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <CircleCheck className="h-3.5 w-3.5 text-accent" />
            {t("available")}
          </span>
        </div>

        {profile.avatar ? (
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2 lg:hidden">
            <Image
              src={profile.avatar}
              alt={profile.fullName ?? profile.firstName}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[60%_15%]"
            />
          </div>
        ) : null}
      </div>

      {/* Floats over the portrait, as in the design. */}
      <div className="enter relative mt-6 flex flex-col gap-3 px-5 sm:px-7 lg:absolute lg:right-6 lg:top-24 lg:mt-0 lg:w-[23rem] lg:px-0 xl:right-10">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface/95 shadow-[var(--shadow-card)] backdrop-blur">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-auto font-mono text-[0.625rem] text-muted">
              developer.js
            </span>
          </div>
          <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.6875rem] leading-[1.7]">
            <code>
              {codeLines.map((line, index) => (
                <div key={line.text} className="flex gap-3">
                  <span className="select-none text-muted/50">{index + 1}</span>
                  <span className={line.accent ? "text-accent" : ""}>
                    {line.text}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface/95 px-4 py-3 backdrop-blur">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <div className="flex flex-col leading-snug">
            <span className="text-sm font-semibold">{t("availableBadge")}</span>
            <span className="text-xs text-muted">{t("availableNote")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
