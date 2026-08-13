"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { stackLayers } from "@/content/stack-layers";

/**
 * Signature element. A single vertical line runs the height of the section
 * and fills with the accent as you scroll; each layer node lights up as the
 * fill passes it. The structure is the argument — one continuous line,
 * every layer on it, no gaps handed to somebody else.
 */
export function StackSpine() {
  const t = useTranslations("stack");
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="border-y border-border bg-surface">
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="flex flex-col gap-14 lg:gap-20">
          <div className="flex max-w-3xl flex-col gap-5">
            <span className="label">{t("label")}</span>
            <h2 className="font-display type-display text-balance">
              {t("title")}
            </h2>
            <p className="type-lead leading-relaxed text-muted">
              {t("subtitle")}
            </p>
          </div>

          <div ref={ref} className="relative pl-8 sm:pl-12">
            {/* track */}
            <div
              className="absolute bottom-0 left-[3px] top-0 w-px bg-border sm:left-[7px]"
              aria-hidden
            />
            {/* fill */}
            <motion.div
              style={shouldReduceMotion ? { height: "100%" } : { height }}
              className="absolute left-[3px] top-0 w-px bg-accent sm:left-[7px]"
              aria-hidden
            />

            <ol className="flex flex-col">
              {stackLayers.map((layer, index) => (
                <motion.li
                  key={layer.id}
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative border-b border-border py-8 last:border-b-0 sm:py-10"
                >
                  <span
                    className="absolute -left-8 top-[2.35rem] h-1.5 w-1.5 rounded-full bg-border-strong ring-4 ring-surface transition-colors duration-500 group-hover:bg-accent sm:-left-12 sm:h-[15px] sm:w-[15px] sm:border sm:border-border-strong sm:bg-surface sm:ring-0"
                    aria-hidden
                  />

                  <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr] sm:items-baseline sm:gap-10">
                    <div className="flex items-baseline gap-4">
                      <span className="label shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display type-title">
                        {t(`${layer.id}.title`)}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="leading-relaxed text-muted">
                        {t(`${layer.id}.description`)}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {layer.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-xs text-muted"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
