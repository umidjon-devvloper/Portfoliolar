"use client";

import { CheckCircle2, Lock, Send, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "@/app/actions/send-message";
import { Button } from "@/components/ui/button";

const initialState: ContactState = { status: "idle", message: null };

const fieldClass =
  "w-full rounded-[var(--radius-btn)] border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-300 placeholder:text-muted focus:border-accent";

const labelClass = "text-xs font-medium tracking-wide text-muted";

function SubmitButton() {
  const t = useTranslations("contact");
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? t("sending") : t("submit")}
      <Send className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
    </Button>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction] = useActionState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>{t("nameLabel")}</span>
          <input
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>{t("emailLabel")}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>
          {t("subjectLabel")}{" "}
          <span className="text-muted/70">({t("optional")})</span>
        </span>
        <input
          name="subject"
          type="text"
          placeholder={t("subjectPlaceholder")}
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>{t("messageLabel")}</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={7}
          placeholder={t("messagePlaceholder")}
          className={`${fieldClass} resize-y`}
        />
      </label>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <SubmitButton />

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
        <Lock className="h-3 w-3" />
        {t("privacy")}
      </p>

      {state.status === "success" ? (
        <p
          role="status"
          className="flex items-center gap-2.5 rounded-[var(--radius-btn)] border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-accent"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {t("success")}
        </p>
      ) : null}

      {state.status === "error" ? (
        <p
          role="alert"
          className="flex items-center gap-2.5 rounded-[var(--radius-btn)] border border-red-500/40 px-4 py-3 text-sm text-red-500"
        >
          <TriangleAlert className="h-4 w-4 shrink-0" />
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
