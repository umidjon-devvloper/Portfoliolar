export type SkillLevel = number | null;

/** TODO: levels came from the design mock-up — confirm before launch. */
export type Skill = {
  name: string;
  icon: string | null;
  level: SkillLevel;
  tier: "core" | "regular" | "familiar";
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
      { name: "React", icon: "react", level: 95, tier: "core" },
      { name: "Next.js", icon: "nextdotjs", level: 95, tier: "core" },
      { name: "TypeScript", icon: "typescript", level: 90, tier: "core" },
      { name: "Tailwind CSS", icon: "tailwindcss", level: 90, tier: "core" },
      { name: "HTML5 / CSS3", icon: "html5", level: 95, tier: "core" },
      { name: "JavaScript", icon: "javascript", level: 90, tier: "core" },
    ],
  },
  {
    id: "backend",
    icon: "Server",
    skills: [
      { name: "Node.js", icon: "nodedotjs", level: 95, tier: "core" },
      { name: "Express.js", icon: "express", level: 90, tier: "core" },
      { name: "REST API", icon: null, level: 95, tier: "core" },
      { name: "GraphQL", icon: "graphql", level: 80, tier: "familiar" },
    ],
  },
  {
    id: "database",
    icon: "Database",
    skills: [
      { name: "MongoDB", icon: "mongodb", level: 90, tier: "core" },
      { name: "Mongoose", icon: "mongoose", level: 85, tier: "regular" },
      { name: "Firebase", icon: "firebase", level: 80, tier: "regular" },
      { name: "Redis", icon: "redis", level: 75, tier: "familiar" },
    ],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    skills: [
      { name: "React Native", icon: "react", level: 90, tier: "core" },
      { name: "Expo", icon: "expo", level: 90, tier: "core" },
      { name: "Expo EAS", icon: "expo", level: 85, tier: "regular" },
      { name: "App Store", icon: "appstore", level: 85, tier: "regular" },
      { name: "Google Play", icon: "googleplay", level: 85, tier: "regular" },
    ],
  },
  {
    id: "devops",
    icon: "Cloud",
    skills: [
      { name: "Git", icon: "git", level: 95, tier: "core" },
      { name: "GitHub", icon: "github", level: 95, tier: "core" },
      { name: "Vercel", icon: "vercel", level: 90, tier: "core" },
      { name: "Cloudflare", icon: "cloudflare", level: 80, tier: "regular" },
      { name: "Netlify", icon: "netlify", level: 80, tier: "regular" },
      { name: "GitLab", icon: "gitlab", level: 75, tier: "familiar" },
    ],
  },
  {
    id: "others",
    icon: "CircleEllipsis",
    skills: [
      { name: "Figma", icon: "figma", level: 85, tier: "core" },
      { name: "UI/UX", icon: null, level: 85, tier: "regular" },
      { name: "Stripe", icon: "stripe", level: 85, tier: "regular" },
      { name: "Payme", icon: null, level: 85, tier: "regular" },
      { name: "Apple Pay", icon: "applepay", level: 75, tier: "familiar" },
      { name: "Google Pay", icon: "googlepay", level: 75, tier: "familiar" },
    ],
  },
];

export const tierOrder = ["core", "regular", "familiar"] as const;

export const tierWeight: Record<Skill["tier"], number> = {
  core: 1,
  regular: 0.68,
  familiar: 0.4,
};
