import type { Metric, Profile, SkillGroup } from "./types";

/**
 * NOTE: fields set to `null` are intentionally unknown.
 * Do not invent values — fill them in from the real source.
 */
export const profile: Profile = {
  firstName: "Umidjon",
  fullName: "G'afforov Umidjon", // TODO: add patronymic when known
  role: "Full Stack Web & Mobile Developer",
  secondaryRole: "Entrepreneur / Founder of Umidjon Agency",
  birthDate: "2005-01-01",
  education: {
    institution: "Buxoro Davlat Universiteti",
    field: "Computer Science and Programming Technologies",
    degree: "Bakalavr",
    from: "2022",
    to: "2026",
  },
  location: {
    city: "Buxoro",
    region: "Buxoro viloyati",
    country: "O'zbekiston",
    countryCode: "UZ",
  },
  avatar: "https://avatars.githubusercontent.com/u/213957524?v=4",
  resumeFile: null, // page is generated from this data; TODO: attach a real PDF
  contact: {
    email: "umidjongafforov844@gmail.com",
    emailSecondary: "umidjongafforov175@gmail.com",
    telegram: "https://t.me/umidjon_dasturchi",
    telegramHandle: "@umidjon_dasturchi",
    phone: "+998936558959",
    phoneDisplay: "+998 93 655 89 59",
    github: "https://github.com/umidjon-devvloper",
    linkedin: "https://www.linkedin.com/in/umidjon-gafforov-8b151b325",
    instagram: "https://instagram.com/umidjon_developer",
    agency: "https://www.umidjon.agency",
  },
};

/**
 * Figures mirrored from umidjon.agency. Every number here must stay
 * verifiable against real work — never round upward.
 */
export const metrics: Metric[] = [
  { id: "projects", value: 12, suffix: "" },
  { id: "clients", value: 6, suffix: "" },
  { id: "experience", value: 3, suffix: "+" },
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
    items: ["Payme", "Stripe", "Apple Pay", "Google Pay"],
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

/** Headline technologies for the hero marquee. */
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
