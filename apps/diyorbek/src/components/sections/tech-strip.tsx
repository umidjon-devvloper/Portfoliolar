import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { TechIcon } from "@/components/ui/tech-icon";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { skillCategories } from "@/content/skills";

const featured = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "Python",
  "Django",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
];

export function TechStrip() {
  const t = useTranslations("skills");

  const lookup = new Map(
    skillCategories.flatMap((category) =>
      category.skills.map((skill) => [skill.name, skill.icon] as const),
    ),
  );

  return (
    <section className="border-y border-border py-10">
      <Container className="flex flex-col gap-5">
        <Reveal>
          <span className="eyebrow">{t("stripTitle")}</span>
        </Reveal>

        <Stagger>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
            {featured.map((name, index) => (
              <li
                key={name}
                className="stagger-item card card-hover flex flex-col items-center gap-2 p-3"
                style={{ transitionDelay: `${index * 35}ms` }}
              >
                <TechIcon
                  slug={lookup.get(name) ?? null}
                  fallback={name}
                  className="h-5 w-5"
                />
                <span className="w-full truncate text-center text-[0.625rem] text-muted">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Stagger>
      </Container>
    </section>
  );
}
