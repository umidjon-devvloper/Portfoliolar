import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/motion/counter";
import { metrics } from "@/content/profile";

export function Metrics() {
  const t = useTranslations("metrics");

  return (
    <section className="relative z-10 border-b border-border bg-background/60 backdrop-blur-sm">
      <Container className="py-16 sm:py-20">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="flex flex-col gap-2 border-l border-border pl-5 transition-colors hover:border-accent"
            >
              <dd className="font-display text-4xl sm:text-5xl">
                <Counter value={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="label leading-relaxed">{t(metric.id)}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
