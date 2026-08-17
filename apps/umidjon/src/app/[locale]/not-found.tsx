import * as icons from "lucide-react";
import { ArrowRight, Briefcase, House, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { PageVisual } from "@/components/ui/page-visual";
import { CodeVisual } from "@/components/ui/code-visual";
import { buttonVariants } from "@/components/ui/button";
import { buildObjectSnippet } from "@/content/code-sample";
import { navItems } from "@/content/nav";

type IconName = keyof typeof icons;

export default function NotFound() {
  const t = useTranslations("notFound");
  const tn = useTranslations("nav");

  return (
    <>
      <Container className="border-b border-border py-10 sm:py-12">
        <PageHeader
          breadcrumb={t("breadcrumb")}
          index="404"
          lead={t("headingLead")}
          accent={t("headingAccent")}
          suffix=""
          description={t("description")}
          visual={
            <PageVisual
              page="notFound"
              alt={t("headingAccent")}
              fallback={
                <CodeVisual
                  filename="not-found.js"
                  lines={buildObjectSnippet("response", [
                    ["status", 404],
                    ["found", false],
                    ["reason", "moved or mistyped"],
                    ["tryInstead", ["/work", "/contact"]],
                  ])}
                />
              }
            />
          }
        />
      </Container>

      <Container className="flex flex-col gap-8 py-10 sm:py-12">
        <div className="flex flex-col gap-3 sm:flex-row">
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

        <Card hover={false} className="flex items-center gap-3 p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
            <Lightbulb className="h-4 w-4" strokeWidth={1.6} />
          </span>
          <p className="text-sm text-muted">{t("hint")}</p>
        </Card>

        <div className="flex flex-col gap-4">
          <h2 className="eyebrow">{t("quickLinks")}</h2>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {navItems.map((item) => {
              const Icon = icons[item.icon as IconName] as icons.LucideIcon;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="card card-hover group flex items-center gap-2.5 p-4"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.6} />
                    <span className="truncate text-sm font-medium">
                      {tn(item.id)}
                    </span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </>
  );
}
