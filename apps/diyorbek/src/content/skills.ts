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
    icon: "Layout",
    skills: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML5 / CSS3", icon: "html5" },
      { name: "Vite", icon: "vite" },
    ],
  },
  {
    id: "backend",
    icon: "Server",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express" },
      { name: "REST API", icon: "lucide:Network" },
      { name: "Auth / JWT", icon: "jsonwebtoken" },
      { name: "Python", icon: "python" },
      { name: "Django", icon: "django" },
      { name: "aiogram", icon: "lucide:Bot" },
      { name: "Telegram Bot API", icon: "telegram" },
    ],
  },
  {
    id: "database",
    icon: "Database",
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "MongoDB Atlas", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQL", icon: "lucide:Database" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    id: "devops",
    icon: "Cloud",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "GitLab", icon: "gitlab" },
      { name: "Vercel", icon: "vercel" },
      { name: "Netlify", icon: "netlify" },
      { name: "Railway", icon: "railway" },
      { name: "Firebase Hosting", icon: "firebase" },
    ],
  },
  {
    id: "others",
    icon: "CircleEllipsis",
    skills: [
      { name: "Figma", icon: "figma" },
      { name: "UI/UX", icon: "lucide:PenTool" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "Android", icon: "android" },
    ],
  },
];
