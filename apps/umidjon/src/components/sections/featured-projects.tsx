import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ProjectsSpine } from "@/components/motion/projects-spine";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "./project-row";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const tc = useTranslations("common");

  return (
    <section id="projects" className="relative z-10 py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <Reveal>
          <div className="flex flex-col gap-4">
            <span className="label flex items-center gap-3">
              <span className="h-px w-8 gradient-rule" aria-hidden />
              {t("label")}
            </span>
            <h2 className="font-display type-display max-w-2xl text-balance">
              {t("featuredTitle")}
            </h2>
          </div>
        </Reveal>

        <ProjectsSpine>
          <ul className="flex flex-col gap-16 md:gap-24 md:px-14">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </ul>
        </ProjectsSpine>

        <Reveal>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-sm text-accent"
          >
            {tc("viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
