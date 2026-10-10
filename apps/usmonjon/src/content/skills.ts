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
    id: "infra",
    icon: "Server",
    skills: [
      { name: "Linux", icon: "linux" },
      { name: "Server administration", icon: "lucide:Server" },
      { name: "Networking", icon: "lucide:Network" },
      { name: "Cloud infrastructure", icon: "lucide:Cloud" },
    ],
  },
  {
    id: "devops",
    icon: "Workflow",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Containerization", icon: "lucide:Boxes" },
      { name: "CI/CD", icon: "lucide:Workflow" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
  {
    id: "security",
    icon: "KeyRound",
    skills: [
      { name: "System security", icon: "lucide:KeyRound" },
      { name: "Secure CI/CD", icon: "lucide:Workflow" },
      { name: "Network security", icon: "lucide:Network" },
    ],
  },
  {
    id: "frontend",
    icon: "MonitorSmartphone",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Responsive design", icon: "lucide:MonitorSmartphone" },
    ],
  },
  {
    id: "design",
    icon: "PenTool",
    skills: [
      { name: "Figma", icon: "figma" },
      { name: "UI/UX", icon: "lucide:PenTool" },
    ],
  },
];
