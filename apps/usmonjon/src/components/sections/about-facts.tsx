import { Cake, Compass, GraduationCap, Languages, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";

export function AboutFacts() {
  const t = useTranslations("about");
  const locale = useLocale();
  const { education, location, birthDate } = profile;

  const facts = [
    birthDate
      ? {
          id: "birth",
          icon: Cake,
          value: new Intl.DateTimeFormat(locale === "uz" ? "en-GB" : locale, {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(new Date(birthDate)),
        }
      : null,
    education
      ? {
          id: "education",
          icon: GraduationCap,
          value: `${education.institution} (${education.from}–${education.to})`,
        }
      : null,
    { id: "languages", icon: Languages, value: t("languagesValue") },
    location
      ? {
          id: "location",
          icon: MapPin,
          value: `${location.city}, ${location.country}`,
        }
      : null,
    { id: "focus", icon: Compass, value: t("focusValue") },
  ].filter((item) => item !== null);

  return (
    <Card hover={false} className="divide-y divide-border bg-surface/95 backdrop-blur">
      {facts.map((fact) => (
        <div key={fact.id} className="flex items-start gap-3 p-4">
          <fact.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.6} />
          <div className="flex min-w-0 flex-col">
            <span className="text-[0.6875rem] uppercase tracking-wider text-muted">
              {t(fact.id)}
            </span>
            <span className="text-sm leading-snug">{fact.value}</span>
          </div>
        </div>
      ))}
    </Card>
  );
}
