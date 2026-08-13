import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/motion/counter";
import { metrics } from "@/content/profile";

/**
 * Set as a data band rather than four equal cards: numbers at display
 * size on a single rule, labels in mono underneath.
 */
export function Metrics() {
  const t = useTranslations("metrics");

  return (
    <section className="border-b border-border">
      <Container className="py-16 sm:py-20">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="flex flex-col gap-2 border-l border-border pl-5"
            >
              <dd className="font-display text-4xl sm:text-5xl lg:text-6xl">
                <Counter value={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="label leading-relaxed">{t(metric.id)}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-12 max-w-xl text-xs leading-relaxed text-muted">
          {t("note")}
        </p>
      </Container>
    </section>
  );
}
