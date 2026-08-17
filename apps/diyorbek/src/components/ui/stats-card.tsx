import * as icons from "lucide-react";
import { Counter } from "@/components/motion/counter";
import { Card } from "./card";

type IconName = keyof typeof icons;

export function StatsCard({
  icon,
  value,
  suffix,
  label,
}: {
  icon: string;
  value: number;
  suffix?: string;
  label: string;
}) {
  const Icon = icons[icon as IconName] as icons.LucideIcon;

  return (
    <Card className="flex flex-col gap-3 p-5">
      <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        <Counter value={value} suffix={suffix} />
      </span>
      <span className="text-sm leading-snug text-muted">{label}</span>
    </Card>
  );
}
