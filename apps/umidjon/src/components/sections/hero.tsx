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
    <section className="relative border-b border-border">
      {/* Portrait sits behind the copy on desktop, edge to edge. */}
      {profile.avatar ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
          aria-hidden
        >
          <Image
            src={profile.avatar}
            alt=""
            fill
            priority
            sizes="62vw"
            className="portrait-mask object-cover object-[center_18%]"
          />
        </div>
      ) : null}

      <div className="relative grid gap-8 px-5 py-10 sm:px-7 lg:grid-cols-[minmax(0,30rem)_1fr] lg:items-center lg:gap-10 lg:py-16 xl:px-10">
        <div className="enter flex flex-col gap-5">
          <span className="text-sm text-muted">👋 {t("greeting")}</span>

          <div className="flex flex-col gap-0.5">
            <h1 className="type-hero">{profile.firstName}</h1>
            <p className="type-section font-bold">
              Full-Stack <span className="text-accent">Developer</span>
            </p>
          </div>

          <p className="max-w-sm leading-relaxed text-muted">{t("subtitle")}</p>

          <div className="flex flex-wrap gap-3">
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

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
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
        </div>

        {/* Mobile portrait: no bleed, a plain framed image. */}
        {profile.avatar ? (
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2 lg:hidden">
            <Image
              src={profile.avatar}
              alt={profile.fullName ?? profile.firstName}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_15%]"
            />
          </div>
        ) : null}

        <div className="enter flex flex-col gap-3 lg:ml-auto lg:w-[26rem]" style={{ animationDelay: "120ms" }}>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface/95 shadow-[var(--shadow-card)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-auto font-mono text-[0.625rem] text-muted">
                developer.js
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[0.6875rem] leading-relaxed">
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
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{t("availableBadge")}</span>
              <span className="text-xs text-muted">{t("availableNote")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
