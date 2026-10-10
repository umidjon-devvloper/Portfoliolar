import type { Metric, Profile, SkillGroup } from "./types";

export const profile: Profile = {
  firstName: "Usmonjon",
  fullName: "Abduroziqov Usmonjon",
  role: "Cloud & DevSecOps Engineer",
  secondaryRole: "Full Stack Developer",
  birthDate: null,
  education: {
    institution: "Buxoro Davlat Universiteti",
    field: null,
    degree: null,
    from: "2022",
    to: "2026",
  },
  location: {
    city: "Buxoro",
    region: "Buxoro viloyati",
    country: "O'zbekiston",
    countryCode: "UZ",
  },
  /* No portrait supplied yet: pages fall back to the drawn backdrop. */
  avatar: null,
  resumeFile: null,
  contact: {
    email: "abdiroziqovusmonjon@gmail.com",
    emailSecondary: null,
    telegram: "https://t.me/usmon_coder",
    telegramHandle: "@usmon_coder",
    phone: "+998940944133",
    phoneDisplay: "+998 94 094 41 33",
    github: null,
    linkedin: "https://www.linkedin.com/in/usmoncoder",
    instagram: null,
    agency: null,
  },
};

export const skillGroups: SkillGroup[] = [
  {
    id: "infra",
    items: ["Linux", "Server administration", "Networking", "Cloud infrastructure"],
  },
  {
    id: "devops",
    items: ["Docker", "Containerization", "CI/CD", "Git", "GitHub"],
  },
  {
    id: "security",
    items: ["System security", "Secure CI/CD", "Network security"],
  },
  {
    id: "frontend",
    items: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Responsive design"],
  },
  {
    id: "design",
    items: ["Figma", "UI/UX"],
  },
];

/* Every number below is either supplied or counted from the content
   itself — nothing is estimated. */
export const metrics: Metric[] = [
  { id: "projects", value: 5, suffix: "+" },
  { id: "experience", value: 2, suffix: "+" },
  { id: "roles", value: 2, suffix: "" },
  {
    id: "tools",
    value: skillGroups.reduce((sum, group) => sum + group.items.length, 0),
    suffix: "",
  },
];

export const marqueeSkills = [
  "Linux",
  "Docker",
  "CI/CD",
  "Cloud",
  "Networking",
  "React",
  "Tailwind CSS",
  "Git",
  "Figma",
];

export const strengthIds = [
  "securityFirst",
  "automation",
  "systems",
  "fullStack",
  "fastLearning",
] as const;

export const goalIds = [
  "cloudArchitect",
  "certifications",
  "devsecops",
  "international",
  "openSource",
] as const;

export const processIds = ["brief", "design", "development", "launch"] as const;
