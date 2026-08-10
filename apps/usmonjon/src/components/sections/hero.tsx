"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { skillGroups } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();

  const marqueeItems = skillGroups.flatMap((group) => group.items);

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="top" className="overflow-hidden border-b border-border">
      <Container className="flex flex-col gap-10 py-24 sm:py-32 lg:py-40">
        <motion.span
          initial="hidden"
          animate="show"
          variants={rise}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-[0.3em] text-accent"
        >
          {t("role")}
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={rise}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display text-balance text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        >
          {t("titleLine1")}
          <br />
          <span className="text-accent">{t("titleLine2")}</span>
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="show"
          variants={rise}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-balance text-base text-muted sm:text-lg">
            {t("subtitle")}
          </p>
          <a
            href="#work"
            className={cn(buttonVariants({ size: "lg" }), "shrink-0")}
          >
            {t("cta")}
            <ArrowDownRight className="h-4 w-4" />
          </a>
        </motion.div>
      </Container>

      <div className="flex overflow-hidden border-t border-border py-5">
        <div className="marquee-track flex shrink-0 gap-8 pr-8">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="whitespace-nowrap font-display text-2xl text-muted sm:text-3xl"
            >
              {item}
              <span className="ml-8 text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
