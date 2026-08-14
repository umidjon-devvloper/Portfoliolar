"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { useInView } from "@/lib/use-in-view";
import { stackLayers } from "@/content/stack-layers";

export function StackSpine() {
  const t = useTranslations("stack");
  const { ref, inView } = useInView<HTMLDivElement>("-5% 0px -5% 0px");

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container className="flex flex-col gap-10 sm:gap-14">
        <div className="flex max-w-3xl flex-col gap-3">
          <span className="label flex items-center gap-3">
            <span className="h-px w-8 gradient-rule" aria-hidden />
            {t("label")}
          </span>
          <h2 className="font-display type-display text-balance">
            {t("title")}
          </h2>
          <p className="type-lead leading-relaxed text-muted">{t("subtitle")}</p>
        </div>

        <div
          ref={ref}
          data-show={inView ? "true" : "false"}
          className="stagger relative pl-7 sm:pl-10"
        >
          <span
            aria-hidden
            className="spine absolute bottom-0 left-[3px] top-0 w-px sm:left-[5px]"
          />

          <ol className="flex flex-col">
            {stackLayers.map((layer, index) => (
              <li
                key={layer.id}
                className="stagger-item group relative border-b border-border py-6 last:border-b-0 sm:py-7"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span
                  aria-hidden
                  className="absolute -left-7 top-8 h-2 w-2 rounded-full border-2 border-border-strong bg-background transition-colors duration-500 group-hover:border-accent-2 sm:-left-10"
                />

                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_1.5fr] sm:items-baseline sm:gap-8">
                  <div className="flex items-baseline gap-3">
                    <span className="label shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display type-title transition-colors group-hover:text-accent-2">
                      {t(`${layer.id}.title`)}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      {t(`${layer.id}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {layer.tools.map((tool) => (
                        <span key={tool} className="font-mono text-xs text-muted">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
