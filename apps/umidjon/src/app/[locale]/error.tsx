"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flex min-h-[60vh] items-center">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-md text-muted">{t("description")}</p>
        <Button size="lg" onClick={reset}>
          {t("retry")}
        </Button>
      </div>
    </Section>
  );
}
