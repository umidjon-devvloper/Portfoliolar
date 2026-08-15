import * as icons from "lucide-react";
import { ArrowRight, Briefcase, House, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { navItems } from "@/content/nav";

type IconName = keyof typeof icons;

export default function NotFound() {
  const t = useTranslations("notFound");
  const tn = useTranslations("nav");

  return (
    <Container className="flex flex-col items-center gap-8 py-14 text-center sm:py-20">
      <div className="relative">
        <span className="pointer-events-none absolute inset-0 -z-10 glow" aria-hidden />
        <span className="block text-[clamp(5rem,18vw,11rem)] font-extrabold leading-none tracking-tighter text-accent">
          404
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="type-section">
          <span className="text-accent">{t("oops")}</span> {t("title")}
        </h1>
        <p className="mx-auto max-w-md leading-relaxed text-muted">
          {t("description")}
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          <House className="h-4 w-4" />
          {t("home")}
        </Link>
        <Link
          href="/work"
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          <Briefcase className="h-4 w-4" />
          {t("work")}
        </Link>
      </div>

      <Card hover={false} className="flex w-full max-w-xl items-center gap-3 p-4 text-left">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
          <Lightbulb className="h-4 w-4" />
        </span>
        <p className="text-sm text-muted">{t("hint")}</p>
      </Card>

      <div className="flex w-full flex-col gap-4">
        <h2 className="text-sm font-semibold">{t("quickLinks")}</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {navItems.map((item) => {
            const Icon = icons[item.icon as IconName] as icons.LucideIcon;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="card card-hover flex flex-col items-center gap-2 p-4 text-center"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">{tn(item.id)}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}
