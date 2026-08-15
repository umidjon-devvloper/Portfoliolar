import { Rocket, Send, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const pillars = [
  { id: "build", icon: Wrench },
  { id: "solve", icon: Rocket },
  { id: "deliver", icon: Send },
];

export function WhatIDo() {
  const t = useTranslations("whatIDo");

  return (
    <section className="border-t border-border px-5 py-8 sm:px-7 lg:pl-12 lg:pr-8 xl:pl-16 xl:pr-12">
      <div className="flex flex-col gap-6">
        <Reveal>
          <span className="eyebrow">{t("title")}</span>
        </Reveal>

        <Stagger>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8 xl:max-w-[calc(100%-25rem)]">
            {pillars.map((pillar, index) => (
              <StaggerItem key={pillar.id} index={index}>
                <div className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
                    <pillar.icon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{t(`${pillar.id}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {t(`${pillar.id}.description`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
