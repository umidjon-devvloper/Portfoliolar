"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { StatusRail } from "@/components/layout/status-rail";
import { Marquee } from "@/components/motion/marquee";
import { ParticleField } from "@/components/motion/particle-field";
import { marqueeSkills } from "@/content/profile";
import { cn } from "@/lib/utils";

function Headline({ text, delay = 0 }: { text: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: shouldReduceMotion ? 0 : "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="grain relative overflow-hidden">
      <ParticleField className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 wash" aria-hidden />

      <motion.div
        style={shouldReduceMotion ? undefined : { y, opacity: fade }}
        className="relative"
      >
        <Container className="grid min-h-[80svh] grid-cols-1 items-center gap-12 pb-16 pt-28 lg:grid-cols-[1fr_14rem] lg:gap-16 lg:pb-20 lg:pt-32">
          <div className="flex flex-col gap-8">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="label"
            >
              {t("eyebrow")}
            </motion.span>

            <h1 className="font-display type-mega max-w-[18ch]">
              <Headline text={t("titleLead")} delay={0.1} />{" "}
              <span className="gradient-text">
                <Headline text={t("titleAccent")} delay={0.3} />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col gap-8"
            >
              <p className="type-lead max-w-lg leading-relaxed text-muted">
                {t("subtitle")}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/projects" className={cn(buttonVariants({ size: "lg" }))}>
                  {t("primaryCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  {t("secondaryCta")}
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <StatusRail />
          </motion.div>
        </Container>
      </motion.div>

      <div className="relative border-y border-border py-4">
        <Marquee items={marqueeSkills} />
      </div>
    </section>
  );
}
