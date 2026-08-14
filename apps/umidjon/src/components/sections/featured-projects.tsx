import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "./project-row";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const tc = useTranslations("common");

  return (
    <section id="projects" className="border-b border-border py-20 sm:py-28">
      <Container className="flex flex-col gap-10 sm:gap-14">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="label flex items-center gap-3">
                <span className="h-px w-8 gradient-rule" aria-hidden />
                {t("label")}
              </span>
              <h2 className="font-display type-display max-w-2xl text-balance">
                {t("featuredTitle")}
              </h2>
            </div>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2.5 text-sm text-accent"
            >
              {tc("viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Stagger>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                priority={index < 2}
              />
            ))}
          </ul>
        </Stagger>
      </Container>
    </section>
  );
}
