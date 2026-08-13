import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { featuredProjects } from "@/content/projects";
import { ProjectRow } from "./project-row";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const tc = useTranslations("common");

  return (
    <section id="projects" className="py-24 sm:py-32 lg:py-40">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="label">{t("label")}</span>
          <h2 className="font-display type-display max-w-2xl text-balance">
            {t("featuredTitle")}
          </h2>
        </div>
      </Container>

      {/* Rows run full-bleed so the rules read as page structure. */}
      <ul className="mt-4 border-t border-border">
        {featuredProjects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </ul>

      <Container className="mt-12">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 text-sm text-accent"
        >
          {tc("viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </Container>
    </section>
  );
}
