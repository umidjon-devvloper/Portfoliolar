import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { metrics } from "@/content/profile";

export function Metrics() {
  const t = useTranslations("metrics");

  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-20">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <StaggerItem key={metric.id}>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </span>
                <span className="text-sm leading-snug text-muted">
                  {t(metric.id)}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted">
          {t("note")}
        </p>
      </Container>
    </section>
  );
}
