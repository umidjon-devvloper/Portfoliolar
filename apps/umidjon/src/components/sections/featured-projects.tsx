import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const tc = useTranslations("common");

  return (
    <Section id="projects">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="01"
              title={t("featuredTitle")}
              subtitle={t("subtitle")}
            />
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-2 text-sm text-accent"
            >
              {tc("viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug} className="flex">
              <ProjectCard project={project} className="w-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
