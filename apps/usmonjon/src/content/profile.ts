import type { Profile, SkillGroup, Work } from "./types";

/**
 * NOTE: `null` means the data is genuinely unknown — do not invent it.
 */
export const profile: Profile = {
  firstName: "Usmonjon",
  fullName: null, // TODO
  role: "Frontend Developer & UI/UX Designer",
  education: null, // TODO
  avatar: null, // TODO
  contact: {
    email: null, // TODO
    telegram: null, // TODO
    github: null, // TODO
    behance: null, // TODO
    dribbble: null, // TODO
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
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    id: "design",
    items: ["Figma", "UI/UX Design"],
  },
  {
    id: "tools",
    items: ["Git", "GitHub"],
  },
];

// TODO: fill in design work — name, cover image, Figma link.
export const works: Work[] = [];

export const site = {
  domain: "usmonjon.site",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usmonjon.site",
  ogImage: "/og.png",
};

export const sections = ["about", "skills", "work", "contact"] as const;

export const partners = [
  {
    name: "Umidjon",
    role: "Full Stack Web & Mobile Developer",
    href: "https://umidjon.site",
  },
  {
    name: "Diyorbek",
    role: "Full Stack Web Developer",
    href: "https://diyorbek.site",
  },
];
