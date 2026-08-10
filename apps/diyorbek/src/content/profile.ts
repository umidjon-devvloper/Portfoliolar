import type { Profile, Project, SkillGroup } from "./types";

/**
 * NOTE: `null` means the data is genuinely unknown — do not invent it.
 */
export const profile: Profile = {
  firstName: "Diyorbek",
  fullName: null, // TODO
  role: "Full Stack Web Developer",
  education: null, // TODO
  avatar: null, // TODO
  contact: {
    email: null, // TODO
    telegram: null, // TODO
    github: null, // TODO
  },
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    id: "backend",
    items: ["Node.js", "Express.js", "REST API", "MongoDB"],
  },
  {
    id: "tools",
    items: ["Git", "GitHub"],
  },
];

// TODO: fill in real projects — name, role, stack, link.
export const projects: Project[] = [];

export const site = {
  domain: "diyorber.site",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://diyorber.site",
  ogImage: "/og.png",
};

export const sections = ["about", "skills", "projects", "contact"] as const;

export const partners = [
  {
    name: "Umidjon",
    role: "Full Stack Web & Mobile Developer",
    href: "https://umidjon.site",
  },
  {
    name: "Usmonjon",
    role: "Frontend Developer & UI/UX Designer",
    href: "https://usmonjon.site",
  },
];
