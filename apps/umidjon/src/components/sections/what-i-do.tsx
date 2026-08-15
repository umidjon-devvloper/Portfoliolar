import { Box, Code, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const pillars = [
  { id: "build", icon: Box },
  { id: "solve", icon: Code },
  { id: "deliver", icon: Send },
];

/** Closing row under the project cards; the rail's CTA sits beside it. */
export function WhatIDo() {
  const t = useTranslations("whatIDo");

  return (
    <section className="flex flex-col gap-5 border-t border-border pt-6">
      <Reveal>
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted">
          {t("title")}
        </span>
      </Reveal>

      <Stagger>
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {pillars.map((pillar, index) => (
            <StaggerItem key={pillar.id} index={index}>
              <div className="flex gap-3">
                <pillar.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">{t(`${pillar.id}.title`)}</h3>
                  <p className="text-xs leading-relaxed text-muted">
                    {t(`${pillar.id}.description`)}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </Stagger>
    </section>
  );
}
