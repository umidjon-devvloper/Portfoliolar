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
      "HTML5",
      "CSS3 / SCSS",
      "JavaScript ES6+",
      "TypeScript",
      "React.js",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Material UI",
      "Framer Motion",
      "SSR / SSG",
      "Responsive / Mobile-first",
    ],
  },
  {
    id: "mobile",
    items: [
      "React Native",
      "Expo",
      "Expo EAS",
      "Android",
      "iOS",
      "App Store Connect",
      "Google Play Console",
    ],
  },
  {
    id: "backend",
    items: [
      "Node.js",
      "Express.js",
      "REST API",
      "GraphQL",
      "MongoDB",
      "Mongoose",
      "Firebase",
      "Redis",
    ],
  },
  {
    id: "database",
    items: ["PostgreSQL", "SQL", "Prisma"],
  },
  {
    id: "authDb",
    items: [
      "Firebase Authentication",
      "Firestore",
      "Firebase Realtime Database",
      "MongoDB Atlas",
      "Mongoose",
    ],
  },
  {
    id: "payments",
    items: ["Payme", "Click", "Atmos", "Uzum", "Visa"],
  },
  {
    id: "devops",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Vercel",
      "Netlify",
      "Firebase Hosting",
      "Cloudflare",
      "EAS Build",
    ],
  },
  {
    id: "design",
    items: [
      "Figma",
      "Adobe XD",
      "UI/UX",
      "Responsive design",
      "Modern SaaS interfaces",
    ],
  },
];

export const marqueeSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "React Native",
  "Expo",
  "MongoDB",
  "Tailwind CSS",
  "Express.js",
  "Firebase",
  "GraphQL",
  "Figma",
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
