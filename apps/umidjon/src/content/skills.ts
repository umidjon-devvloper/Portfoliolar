export type SkillLevel = number | null;

export type Skill = {
  name: string;
  icon: string | null;
  level: SkillLevel;
  tier: "core" | "regular" | "familiar";
};

export type SkillCategory = {
  id: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    skills: [
      { name: "React", icon: "react", level: null, tier: "core" },
      { name: "Next.js", icon: "nextdotjs", level: null, tier: "core" },
      { name: "TypeScript", icon: "typescript", level: null, tier: "core" },
      { name: "Tailwind CSS", icon: "tailwindcss", level: null, tier: "core" },
      { name: "JavaScript", icon: "javascript", level: null, tier: "core" },
      { name: "HTML5", icon: "html5", level: null, tier: "core" },
      { name: "CSS3", icon: "css", level: null, tier: "core" },
      { name: "Framer Motion", icon: "framer", level: null, tier: "regular" },
      { name: "Vite", icon: "vite", level: null, tier: "regular" },
      { name: "shadcn/ui", icon: "shadcnui", level: null, tier: "regular" },
      { name: "Material UI", icon: "mui", level: null, tier: "familiar" },
    ],
  },
  {
    id: "mobile",
    skills: [
      { name: "React Native", icon: "react", level: null, tier: "core" },
      { name: "Expo", icon: "expo", level: null, tier: "core" },
      { name: "Expo EAS", icon: "expo", level: null, tier: "regular" },
      { name: "App Store", icon: "appstore", level: null, tier: "regular" },
      { name: "Google Play", icon: "googleplay", level: null, tier: "regular" },
    ],
  },
  {
    id: "backend",
    skills: [
      { name: "Node.js", icon: "nodedotjs", level: null, tier: "core" },
      { name: "Express.js", icon: "express", level: null, tier: "core" },
      { name: "MongoDB", icon: "mongodb", level: null, tier: "core" },
      { name: "Mongoose", icon: "mongoose", level: null, tier: "regular" },
      { name: "Firebase", icon: "firebase", level: null, tier: "regular" },
      { name: "GraphQL", icon: "graphql", level: null, tier: "familiar" },
      { name: "Redis", icon: "redis", level: null, tier: "familiar" },
    ],
  },
  {
    id: "payments",
    skills: [
      { name: "Stripe", icon: "stripe", level: null, tier: "regular" },
      { name: "Payme", icon: null, level: null, tier: "regular" },
      { name: "Apple Pay", icon: "applepay", level: null, tier: "familiar" },
      { name: "Google Pay", icon: "googlepay", level: null, tier: "familiar" },
    ],
  },
  {
    id: "devops",
    skills: [
      { name: "Git", icon: "git", level: null, tier: "core" },
      { name: "GitHub", icon: "github", level: null, tier: "core" },
      { name: "Vercel", icon: "vercel", level: null, tier: "core" },
      { name: "Cloudflare", icon: "cloudflare", level: null, tier: "regular" },
      { name: "Netlify", icon: "netlify", level: null, tier: "familiar" },
      { name: "GitLab", icon: "gitlab", level: null, tier: "familiar" },
    ],
  },
  {
    id: "design",
    skills: [
      { name: "Figma", icon: "figma", level: null, tier: "core" },
      { name: "UI/UX", icon: null, level: null, tier: "regular" },
      { name: "Adobe XD", icon: null, level: null, tier: "familiar" },
    ],
  },
];

export const tierOrder = ["core", "regular", "familiar"] as const;

export const tierWeight: Record<Skill["tier"], number> = {
  core: 1,
  regular: 0.68,
  familiar: 0.4,
};
