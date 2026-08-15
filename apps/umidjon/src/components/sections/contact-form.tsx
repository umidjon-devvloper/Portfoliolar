"use client";

import { Lock, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "@/app/actions/send-message";
import { Button } from "@/components/ui/button";

const initialState: ContactState = { status: "idle", message: null };

const fieldClass =
  "w-full rounded-[var(--radius-btn)] border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

function SubmitButton() {
  const t = useTranslations("contact");
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? t("sending") : t("submit")}
      <Send className="h-4 w-4" />
    </Button>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction] = useActionState(sendMessage, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          minLength={2}
          aria-label={t("nameLabel")}
          placeholder={t("namePlaceholder")}
          className={fieldClass}
        />
        <input
          name="email"
          type="email"
          required
          aria-label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          className={fieldClass}
        />
      </div>

      <input
        name="subject"
        type="text"
        aria-label={t("subjectLabel")}
        placeholder={t("subjectPlaceholder")}
        className={fieldClass}
      />

      <textarea
        name="message"
        required
        minLength={10}
        rows={6}
        aria-label={t("messageLabel")}
        placeholder={t("messagePlaceholder")}
        className={`${fieldClass} resize-y`}
      />

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
        <p role="status" className="text-center text-sm text-accent">
          {t("success")}
        </p>
      ) : null}
      {state.status === "error" ? (
        <p role="alert" className="text-center text-sm text-red-500">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
