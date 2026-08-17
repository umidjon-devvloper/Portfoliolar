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
      { name: "HTML5 / CSS3", icon: "html5" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Responsive Design", icon: null },
    ],
  },
  {
    id: "backend",
    icon: "Server",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express" },
      { name: "REST API", icon: null },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    id: "devops",
    icon: "Cloud",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
];
