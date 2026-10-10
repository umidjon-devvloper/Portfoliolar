"use client";

import { useState } from "react";
import { Check, Clock, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";

/* Icons are looked up by key: components cannot cross the server boundary. */
const icons = { mail: Mail, phone: Phone, telegram: Send, location: MapPin, clock: Clock };

export type Channel = {
  id: string;
  label: string;
  value: string;
  href: string | null;
  copy: string | null;
  icon: keyof typeof icons;
};

export function ContactChannels({ channels }: { channels: Channel[] }) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState<string | null>(null);

  /* Clipboard is unavailable on insecure origins, so failure is silent. */
  const onCopy = async (channel: Channel) => {
    if (!channel.copy) return;

    try {
      await navigator.clipboard.writeText(channel.copy);
      setCopied(channel.id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <ul className="flex flex-col gap-3">
      {channels.map((channel) => {
        const Icon = icons[channel.icon];
        const isCopied = copied === channel.id;

        return (
          <li
            key={channel.id}
            className="tile group flex items-center gap-4 rounded-[var(--radius-btn)] border border-border bg-surface px-4 py-3.5"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
              <Icon className="h-4 w-4" strokeWidth={1.6} />
            </span>

            <span className="flex min-w-0 flex-col">
              <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                {channel.label}
              </span>

              {channel.href ? (
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="truncate text-[0.875rem] transition-colors hover:text-accent"
                >
                  {channel.value}
                </a>
              ) : (
                <span className="truncate text-[0.875rem]">{channel.value}</span>
              )}
            </span>

            {channel.copy ? (
              <button
                type="button"
                onClick={() => onCopy(channel)}
                aria-label={isCopied ? t("copied") : t("copy")}
                title={isCopied ? t("copied") : t("copy")}
                className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-sm)] text-muted transition-colors duration-300 hover:bg-accent-soft hover:text-accent"
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-accent" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
