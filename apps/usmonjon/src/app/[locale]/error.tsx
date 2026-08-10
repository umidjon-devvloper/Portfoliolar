"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flex min-h-[60vh] items-center">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h1>
        <p className="max-w-md text-sm text-muted">{t("description")}</p>
        <Button onClick={reset}>{t("retry")}</Button>
      </div>
    </Section>
  );
}
