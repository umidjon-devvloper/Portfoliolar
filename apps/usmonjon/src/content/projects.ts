import type { Project } from "./types";

// TODO: no project is listed until its details are confirmed.
export const projects: Project[] = [];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectKinds = [
  "all",
  "saas",
  "web",
  "ecommerce",
  "mobile",
  "business",
] as const;

export type ProjectFilter = (typeof projectKinds)[number];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
