import { Rocket, Send, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const pillars = [
  { id: "build", icon: Wrench },
  { id: "solve", icon: Rocket },
  { id: "deliver", icon: Send },
];

export function WhatIDo() {
  const t = useTranslations("whatIDo");

  return (
    <section className="border-b border-border py-12 sm:py-16">
      <Container className="flex flex-col gap-7">
        <Reveal>
          <h2 className="type-section">{t("title")}</h2>
        </Reveal>

        <Stagger>
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <StaggerItem key={pillar.id} index={index}>
                <div className="flex flex-col gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
                    <pillar.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-semibold">{t(`${pillar.id}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`${pillar.id}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </section>
  );
}
