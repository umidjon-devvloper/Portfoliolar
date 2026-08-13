"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "@/app/actions/send-message";
import { Button } from "@/components/ui/button";

const initialState: ContactState = { status: "idle", message: null };

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

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
    <form action={formAction} className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="label">
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="label">
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="label">
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

      {}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center gap-5">
        <SubmitButton />
        {state.status === "success" ? (
          <p role="status" className="text-sm text-accent">
            {t("success")}
          </p>
        ) : null}
        {state.status === "error" ? (
          <p role="alert" className="text-sm text-red-400">
            {t("error")}
          </p>
        ) : null}
      </div>
    </form>
  );
}
