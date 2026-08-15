import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { TechIcon } from "@/components/ui/tech-icon";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { skillCategories } from "@/content/skills";

/** The core stack only — one row of marks, no scrolling ticker. */
const featured = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "React Native",
  "Tailwind CSS",
  "Expo",
  "Firebase",
  "Figma",
];

export function TechStrip() {
  const t = useTranslations("skills");

  const lookup = new Map(
    skillCategories.flatMap((category) =>
      category.skills.map((skill) => [skill.name, skill.icon] as const),
    ),
  );

  return (
    <section className="border-b border-border py-12 sm:py-16">
      <Container className="flex flex-col gap-7">
        <Reveal>
          <SectionTitle title={t("stripTitle")} />
        </Reveal>

        <Stagger>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {featured.map((name, index) => (
              <li
                key={name}
                className="stagger-item card card-hover flex flex-col items-center gap-2 p-4"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <TechIcon
                  slug={lookup.get(name) ?? null}
                  fallback={name}
                  className="h-6 w-6"
                />
                <span className="text-center text-[0.6875rem] text-muted">{name}</span>
              </li>
            ))}
          </ul>
        </Stagger>
      </Container>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="type-section text-balance">{title}</h2>;
}
