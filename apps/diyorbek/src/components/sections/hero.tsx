"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();

  const lines = [
    `const developer = {`,
    `  name: "${profile.firstName}",`,
    `  role: "${profile.role}",`,
    `  stack: ["React", "Next.js", "Node.js", "MongoDB"],`,
    `};`,
  ];

  return (
    <section id="top" className="border-b border-border">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            {t("role")}
          </span>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {t("subtitle")}
          </p>
          <a href="#contact" className={buttonVariants({ size: "md" })}>
            {t("cta")}
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-lg border border-border bg-surface"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="ml-2 text-xs text-muted">developer.ts</span>
          </div>
          <pre className="overflow-x-auto p-5 text-xs leading-relaxed sm:text-sm">
            <code>
              {lines.map((line, index) => (
                <div key={line} className="flex gap-4">
                  <span className="select-none text-muted/60">{index + 1}</span>
                  <span className={index === 0 || index === 4 ? "text-accent" : ""}>
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </motion.div>
      </Container>
    </section>
  );
}
