export type Service = {
  id: string;
  icon: string;
  group: "infrastructure" | "security" | "development";
  points: string[];
};

export const services: Service[] = [
  {
    id: "cloud",
    icon: "Cloud",
    group: "infrastructure",
    points: [
      "Cloud server setup",
      "Scalable environment design",
      "Environment and secrets separation",
      "Backups and recovery plan",
      "Uptime monitoring",
    ],
  },
  {
    id: "cicd",
    icon: "Workflow",
    group: "infrastructure",
    points: [
      "Automated build and test",
      "Automated deploy",
      "Container-based releases",
      "Rollback on failure",
      "Security checks in the pipeline",
    ],
  },
  {
    id: "containers",
    icon: "Boxes",
    group: "infrastructure",
    points: [
      "Dockerising applications",
      "One environment from dev to prod",
      "Lean, minimal images",
      "Service isolation",
    ],
  },
  {
    id: "security",
    icon: "KeyRound",
    group: "security",
    points: [
      "Linux server hardening",
      "Access and permission review",
      "SSH and firewall configuration",
      "HTTPS / TLS setup",
      "Configuration audit",
    ],
  },
  {
    id: "servers",
    icon: "Server",
    group: "security",
    points: [
      "Linux server administration",
      "Network configuration",
      "Troubleshooting and fault fixing",
      "Ongoing maintenance",
    ],
  },
  {
    id: "web",
    icon: "Code",
    group: "development",
    points: [
      "React / Tailwind CSS interfaces",
      "Responsive, mobile-first layouts",
      "Full stack web applications",
      "Deployment included",
    ],
  },
];

export const serviceGroups = ["all", "infrastructure", "security", "development"] as const;

export type ServiceGroup = (typeof serviceGroups)[number];

export const processSteps = ["discuss", "plan", "build", "deliver", "support"] as const;
