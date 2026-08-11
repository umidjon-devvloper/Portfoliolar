"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Marquee } from "@/components/motion/marquee";
import { marqueeSkills, profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content drifts up slightly slower than the page as you scroll away.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 26 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      className="noise relative overflow-hidden border-b border-border"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute inset-0 aurora" />

      <motion.div
        style={shouldReduceMotion ? undefined : { y, opacity }}
        className="relative"
      >
        <Container className="flex flex-col items-start gap-8 py-24 sm:py-32 lg:py-40">
          <motion.div
            initial="hidden"
            animate="show"
            variants={rise}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t("eyebrow")}
            </span>

            {profile.location ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location.city}, {profile.location.country}
              </span>
            ) : null}
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={rise}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="max-w-4xl text-balance text-4xl font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t("titleLead")}{" "}
            <span className="text-gradient">{t("titleAccent")}</span>{" "}
            {t("titleTail")}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={rise}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={rise}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/projects"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              {t("primaryCta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t("secondaryCta")}
            </Link>

            {profile.avatar ? (
              <span className="ml-1 hidden items-center gap-3 sm:flex">
                <Image
                  src={profile.avatar}
                  alt={profile.fullName ?? profile.firstName}
                  width={44}
                  height={44}
                  className="rounded-full border border-border"
                  priority
                />
                <span className="flex flex-col text-xs leading-tight">
                  <span className="font-medium">
                    {profile.fullName ?? profile.firstName}
                  </span>
                  <span className="text-muted">{profile.secondaryRole}</span>
                </span>
              </span>
            ) : null}
          </motion.div>
        </Container>
      </motion.div>

      <div className="relative border-t border-border py-5">
        <Marquee items={marqueeSkills} />
      </div>
    </section>
  );
}
