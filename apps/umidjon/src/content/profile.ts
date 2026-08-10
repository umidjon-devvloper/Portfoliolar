import type { Profile, SkillGroup } from "./types";

/**
 * NOTE: fields set to `null` are intentionally unknown.
 * Do not invent values — fill them in from the real source.
 */
export const profile: Profile = {
  firstName: "Umidjon",
  fullName: null, // TODO: full legal name for JSON-LD / resume
  role: "Full Stack Web & Mobile Developer",
  secondaryRole: "Entrepreneur / Founder of Umidjon Agency",
  education: null, // TODO: university name + years
  location: null, // TODO
  avatar: null, // TODO: /avatar.webp (800x800+)
  resumeFile: null, // TODO: /resume-umidjon.pdf
  contact: {
    email: null, // TODO
    telegram: null, // TODO
    phone: null, // TODO
    github: "https://github.com/umidjon-devvloper",
    linkedin: null, // TODO
    agency: "https://umidjon.agency",
  },
};

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
