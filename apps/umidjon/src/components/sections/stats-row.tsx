import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { StatsCard } from "@/components/ui/stats-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { metrics } from "@/content/profile";

const iconFor: Record<string, string> = {
  projects: "Code",
  clients: "Smile",
  experience: "Trophy",
  response: "Clock",
};

export function StatsRow() {
  const t = useTranslations("metrics");

  return (
    <section className="border-b border-border py-12 sm:py-16">
      <Container>
        <Stagger>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <StaggerItem key={metric.id} index={index}>
                <StatsCard
                  icon={iconFor[metric.id] ?? "Code"}
                  value={metric.value}
                  suffix={metric.suffix}
                  label={t(metric.id)}
                />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </section>
  );
}
