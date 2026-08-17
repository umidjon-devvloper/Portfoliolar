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
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Responsive Design", icon: null },
    ],
  },
  {
    id: "design",
    icon: "PenTool",
    skills: [
      { name: "Figma", icon: "figma" },
      { name: "UI/UX", icon: null },
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
