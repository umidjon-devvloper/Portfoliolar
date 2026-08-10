"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <Container className="relative flex flex-col items-start gap-8 py-24 sm:py-32 lg:py-40">
        <motion.span
          initial="hidden"
          animate="show"
          variants={rise}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("eyebrow")}
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={rise}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={rise}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="max-w-2xl text-balance text-base text-muted sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={rise}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Link
            href="/projects"
            className={cn(buttonVariants({ size: "lg" }), "group")}
          >
            {t("primaryCta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {t("secondaryCta")}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
