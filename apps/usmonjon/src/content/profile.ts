import type { Metric, Profile, SkillGroup } from "./types";

/** `null` means the value is genuinely unknown — it is not invented here. */
export const profile: Profile = {
  firstName: "Usmonjon",
  fullName: null, // TODO
  role: "Frontend Developer & UI/UX Designer",
  secondaryRole: null, // TODO
  birthDate: null, // TODO
  education: null, // TODO
  location: null, // TODO
  avatar: null, // TODO: /images/profile/portrait.webp
  resumeFile: null, // TODO
  contact: {
    email: null, // TODO
    emailSecondary: null,
    telegram: null, // TODO
    telegramHandle: null, // TODO
    phone: null, // TODO
    phoneDisplay: null, // TODO
    github: null, // TODO
    linkedin: null, // TODO
    instagram: null, // TODO
    agency: null,
  },
};

// TODO: counts stay empty until they can be confirmed.
export const metrics: Metric[] = [];

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    items: ["HTML5 / CSS3", "JavaScript", "React.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    id: "design",
    items: ["Figma", "UI/UX"],
  },
  {
    id: "devops",
    items: ["Git", "GitHub"],
  },
];

export const marqueeSkills = ["HTML5 / CSS3", "JavaScript", "React.js", "Tailwind CSS", "Responsive Design", "Figma", "UI/UX", "Git", "GitHub"];

export const strengthIds = [] as const;

export const goalIds = [] as const;

export const processIds = ["brief", "design", "development", "launch"] as const;
