"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Container } from "@/components/ui/container";
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
    <Container className="flex min-h-[70svh] flex-col justify-center gap-8 py-28">
      <h1 className="font-display type-display text-balance">{t("title")}</h1>
      <p className="type-lead max-w-md leading-relaxed text-muted">
        {t("description")}
      </p>
      <Button size="lg" onClick={reset} className="self-start">
        {t("retry")}
      </Button>
    </Container>
  );
}
