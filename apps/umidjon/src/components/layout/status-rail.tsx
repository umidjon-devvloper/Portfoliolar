"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";

export function StatusRail() {
  const t = useTranslations("hero");
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Tashkent",
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  const rows = [
    {
      key: "status",
      label: t("railStatus"),
      value: t("railAvailable"),
      live: true,
    },
    {
      key: "time",
      label: t("railTime"),
      value: time ? `${time} UTC+5` : "—",
      live: false,
    },
    {
      key: "base",
      label: t("railBase"),
      value: profile.location
        ? `${profile.location.city}, ${profile.location.countryCode}`
        : "—",
      live: false,
    },
  ];

  return (
    <dl className="flex flex-col divide-y divide-border border-y border-border">
      {rows.map((row) => (
        <div key={row.key} className="flex flex-col gap-1.5 py-4">
          <dt className="label">{row.label}</dt>
          <dd className="flex items-center gap-2 font-mono text-sm text-foreground">
            {row.live ? (
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
            ) : null}
            <span suppressHydrationWarning>{row.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
