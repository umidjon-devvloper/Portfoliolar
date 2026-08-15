import { ArrowRight, CircleCheck, Download, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";

const codeLines = [
  { text: "const developer = {", tone: "plain" },
  { text: '  name: "Umidjon",', tone: "value" },
  { text: '  role: "Full-Stack Developer",', tone: "value" },
  { text: '  passion: "Building digital products",', tone: "value" },
  { text: '  skills: ["Next.js", "React", "Node.js"],', tone: "value" },
  { text: '  focus: "Performance & User Experience"', tone: "value" },
  { text: "};", tone: "plain" },
] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 glow" aria-hidden />

      <Container className="relative grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div className="enter flex flex-col gap-5">
          <span className="text-sm text-muted">👋 {t("greeting")}</span>

          <div className="flex flex-col gap-1">
            <h1 className="type-hero">{profile.firstName}</h1>
            <p className="type-section font-bold">
              Full-Stack <span className="text-accent">Developer</span>
            </p>
          </div>

          <p className="max-w-md leading-relaxed text-muted">{t("subtitle")}</p>

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

        <div className="enter flex flex-col gap-4" style={{ animationDelay: "120ms" }}>
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.fullName ?? profile.firstName}
                width={640}
                height={640}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full object-cover object-top"
              />
            ) : (
              <div className="aspect-[4/3] w-full" />
            )}

            <div className="absolute bottom-3 left-3">
              <Badge tone="live" className="bg-surface/90 backdrop-blur">
                {t("availableBadge")}
              </Badge>
            </div>
          </div>

          <Card hover={false} className="hidden overflow-hidden p-0 sm:block">
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
                    <span className={line.tone === "value" ? "text-accent" : ""}>
                      {line.text}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </Card>
        </div>
      </Container>
    </section>
  );
}
