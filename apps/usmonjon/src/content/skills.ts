export type Skill = {
  name: string;
  icon: string | null;
};

export type SkillCategory = {
  id: string;
  icon: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    icon: "MonitorSmartphone",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML5 / CSS3", icon: "html5" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Framer Motion", icon: "framer" },
      { name: "shadcn/ui", icon: "shadcnui" },
      { name: "Vite", icon: "vite" },
      { name: "Material UI", icon: "mui" },
    ],
  },
  {
    id: "backend",
    icon: "Server",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express" },
      { name: "REST API", icon: "lucide:Network" },
      { name: "Server Actions", icon: "nextdotjs" },
      { name: "Auth / JWT", icon: "jsonwebtoken" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    id: "database",
    icon: "Database",
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "Mongoose", icon: "mongoose" },
      { name: "MongoDB Atlas", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQL", icon: "lucide:Database" },
      { name: "Prisma", icon: "prisma" },
      { name: "Firebase", icon: "firebase" },
      { name: "Firestore", icon: "firebase" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    skills: [
      { name: "React Native", icon: "react" },
      { name: "Expo", icon: "expo" },
      { name: "Expo EAS", icon: "expo" },
      { name: "EAS Build", icon: "expo" },
      { name: "App Store", icon: "appstore" },
      { name: "Google Play", icon: "googleplay" },
    ],
  },
  {
    id: "devops",
    icon: "Cloud",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Vercel", icon: "vercel" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Netlify", icon: "netlify" },
      { name: "Firebase Hosting", icon: "firebase" },
      { name: "GitLab", icon: "gitlab" },
    ],
  },
  {
    id: "payments",
    icon: "CreditCard",
    skills: [
      { name: "Payme", icon: "/images/brands/payme.svg" },
      { name: "Click", icon: "/images/brands/click.svg" },
      { name: "Atmos", icon: "/images/brands/atmos.svg" },
      { name: "Uzum", icon: "/images/brands/uzum.svg" },
      { name: "Visa", icon: "visa" },
      { name: "MasterCard", icon: "mastercard" },
      { name: "Apple Pay", icon: "applepay" },
      { name: "Google Pay", icon: "googlepay" },
      { name: "Stripe", icon: "stripe" },
    ],
  },
  {
    id: "others",
    icon: "CircleEllipsis",
    skills: [
      { name: "Figma", icon: "figma" },
      { name: "UI/UX", icon: "lucide:PenTool" },
      { name: "Adobe XD", icon: null },
    ],
  },
];
