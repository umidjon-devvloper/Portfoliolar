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
      { name: "REST API", icon: null },
      { name: "Server Actions", icon: "nextdotjs" },
      { name: "Auth / JWT", icon: null },
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
    /* TODO: only the four below are confirmed integrations. Stripe,
       Apple Pay and Google Pay came from the mock-up — confirm or drop.
       Payme, Click and Atmos have no simple-icons entry; drop their
       brand files in public/images/brands/ and point icon at the path. */
    id: "payments",
    icon: "CreditCard",
    skills: [
      /* TODO: Click, Atmos and Uzum have no simple-icons entry. Drop
         their files in public/images/brands/ and set icon to the path —
         TechIcon renders a hosted file the same way. */
      { name: "Payme", icon: "/images/brands/payme.svg" },
      { name: "Click", icon: null },
      { name: "Atmos", icon: null },
      { name: "Uzum", icon: null },
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
      { name: "UI/UX", icon: null },
      { name: "Adobe XD", icon: null },
    ],
  },
];
