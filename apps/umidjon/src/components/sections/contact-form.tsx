"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "@/app/actions/send-message";
import { Button } from "@/components/ui/button";

const initialState: ContactState = { status: "idle", message: null };

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

function SubmitButton() {
  const t = useTranslations("contact");
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? t("sending") : t("submit")}
    </Button>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction] = useActionState(sendMessage, initialState);

  return (
    <form action={formAction} className="flex w-full max-w-xl flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-muted">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          placeholder={t("namePlaceholder")}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-muted">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-muted">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* honeypot — hidden from humans */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex items-center gap-4">
        <SubmitButton />
        {state.status === "success" ? (
          <p role="status" className="text-sm text-accent">
            {t("success")}
          </p>
        ) : null}
        {state.status === "error" ? (
          <p role="alert" className="text-sm text-red-500">
            {t("error")}
          </p>
        ) : null}
      </div>
    </form>
  );
}
