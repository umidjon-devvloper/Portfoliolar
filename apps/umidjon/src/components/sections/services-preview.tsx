import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { services } from "@/content/site";
import { profile } from "@/content/profile";

export function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      className="relative z-10 border-y border-border bg-surface"
    >
      <Container className="py-24 sm:py-32">
        <div className="flex flex-col gap-14">
          <Reveal>
            <div className="flex flex-col gap-4">
              <span className="label flex items-center gap-3">
                <span className="h-px w-8 gradient-rule" aria-hidden />
                {t("label")}
              </span>
              <h2 className="font-display type-display max-w-2xl text-balance">
                {t("title")}
              </h2>
              <p className="type-lead max-w-xl leading-relaxed text-muted">
                {t("subtitle")}
              </p>
            </div>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <StaggerItem key={service.id} index={index} className="flex">
                <div className="card flex w-full flex-col gap-3 rounded-2xl p-6">
                  <h3 className="font-medium">{t(`${service.id}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`${service.id}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {profile.contact.agency ? (
            <Reveal>
              <a
                href={profile.contact.agency}
                target="_blank"
                rel="noreferrer noopener"
                className="card group flex flex-col gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-display type-title">
                    {t("agencyTitle")}
                  </span>
                  <span className="text-sm text-muted">
                    {t("agencySubtitle")}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm text-accent">
                  umidjon.agency
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
