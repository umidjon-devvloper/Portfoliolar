"use client";

import { Dribbble, Github, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "@/app/actions/send-message";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/content/profile";

const initialState: ContactState = { status: "idle", message: null };

const fieldClass =
  "w-full rounded-2xl border border-border bg-surface px-5 py-4 text-base outline-none transition-colors placeholder:text-muted focus:border-accent";

function SubmitButton() {
  const t = useTranslations("contact");
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? t("sending") : t("submit")}
    </Button>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  const [state, formAction] = useActionState(sendMessage, initialState);
  const { contact } = profile;

  const channels = [
    contact.email
      ? { href: `mailto:${contact.email}`, icon: Mail, label: contact.email }
      : null,
    contact.telegram
      ? { href: contact.telegram, icon: Send, label: "Telegram" }
      : null,
    contact.behance
      ? { href: contact.behance, icon: Dribbble, label: "Behance" }
      : null,
    contact.dribbble
      ? { href: contact.dribbble, icon: Dribbble, label: "Dribbble" }
      : null,
    contact.github
      ? { href: contact.github, icon: Github, label: "GitHub" }
      : null,
  ].filter((item) => item !== null);

  return (
    <Section id="contact">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-8">
          <SectionHeading index="04" title={t("title")} subtitle={t("subtitle")} />

          <div className="flex flex-col gap-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 text-base text-muted transition-colors hover:text-accent"
              >
                <channel.icon className="h-4 w-4 text-accent" />
                {channel.label}
              </a>
            ))}
          </div>
        </div>

        <form action={formAction} className="flex flex-col gap-5">
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
      </div>
    </Section>
  );
}
