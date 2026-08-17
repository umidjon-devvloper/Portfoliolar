import type { Metric, Profile, SkillGroup } from "./types";

export const profile: Profile = {
  firstName: "Diyorbek",
  fullName: "Hikmatullayev Diyorbek",
  role: "Full Stack Web Developer",
  secondaryRole: null, // TODO
  birthDate: "2004-10-20",
  education: {
    institution: "Buxoro Davlat Universiteti",
    field: null, // TODO: yo'nalish
    degree: null, // TODO
    from: "2022",
    to: "2026",
  },
  location: {
    city: "G'ijduvon",
    region: "Buxoro viloyati",
    country: "O'zbekiston",
    countryCode: "UZ",
  },
  avatar: null, // TODO: /images/profile/portrait.webp
  resumeFile: null, // TODO
  contact: {
    email: "diyorbekhikmatullayev3@gmail.com",
    emailSecondary: null,
    telegram: "https://t.me/Diyorbek3545",
    telegramHandle: "@Diyorbek3545",
    phone: "+998914033545",
    phoneDisplay: "+998 91 403 35 45",
    github: "https://github.com/Diyorbek2010-web",
    linkedin: null, // TODO
    instagram: "https://instagram.com/_diyorbek2010_",
    agency: null,
  },
};

export const metrics: Metric[] = [
  { id: "projects", value: 7, suffix: "" },
  { id: "clients", value: 5, suffix: "" },
  { id: "experience", value: 2, suffix: "+" },
  { id: "response", value: 24, suffix: "h" },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "Vite",
    ],
  },
  {
    id: "backend",
    items: [
      "Node.js",
      "Express.js",
      "REST API",
      "Auth / JWT",
      "Python",
      "Django",
      "aiogram",
      "Telegram Bot API",
    ],
  },
  {
    id: "database",
    items: ["MongoDB", "MongoDB Atlas", "PostgreSQL", "SQL", "Firebase"],
  },
  {
    id: "devops",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Vercel",
      "Netlify",
      "Railway",
      "Firebase Hosting",
    ],
  },
  {
    id: "others",
    items: ["Figma", "UI/UX", "Kotlin", "Android"],
  },
];

export const marqueeSkills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "Python",
  "Django",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
];

export const strengthIds = [
  "fullStackThinking",
  "productThinking",
  "independence",
  "fastLearning",
  "entrepreneurial",
] as const;

export const goalIds = [
  "international",
  "senior",
  "ownSaas",
  "agency",
  "digitalProducts",
  "passiveIncome",
] as const;

export const processIds = ["brief", "design", "development", "launch"] as const;
