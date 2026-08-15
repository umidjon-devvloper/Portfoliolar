import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function FeaturedWork() {
  const t = useTranslations("projects");
  const tc = useTranslations("common");

  return (
    <section className="border-b border-border py-12 sm:py-16">
      <Container className="flex flex-col gap-8">
        <Reveal>
          <SectionHeader
            eyebrow={t("featuredEyebrow")}
            title={t("featuredTitle")}
            action={
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                {tc("viewAll")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            }
          />
        </Reveal>

        <Stagger>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                priority={index === 0}
              />
            ))}
          </ul>
        </Stagger>
      </Container>
    </section>
  );
}
