export type Service = {
  id: string;
  icon: string;
  group: "development" | "design" | "other";
  points: string[];
};

export const services: Service[] = [
  {
    id: "web",
    icon: "Code",
    group: "development",
    points: [
      "React.js / Next.js / TypeScript",
      "Tailwind CSS",
      "REST API integration",
      "Multi-language routing",
      "Responsive layouts",
    ],
  },
  {
    id: "backend",
    icon: "Server",
    group: "development",
    points: [
      "Node.js / Express.js",
      "Django",
      "REST API design",
      "Auth / JWT",
      "PostgreSQL and MongoDB",
      "Admin panels",
    ],
  },
  {
    id: "bots",
    icon: "Bot",
    group: "development",
    points: [
      "Python / aiogram",
      "Telegram Bot API",
      "Command and menu flows",
      "Database-backed bots",
      "Deployment and hosting",
    ],
  },
  {
    id: "saas",
    icon: "Cloud",
    group: "development",
    points: [
      "Role-based access",
      "Admin and customer dashboards",
      "Subscriptions and billing",
      "Onboarding flows",
    ],
  },
  {
    id: "uiux",
    icon: "PenTool",
    group: "design",
    points: [
      "Figma design files",
      "Wireframes and prototypes",
      "Responsive layouts",
      "Dark and light themes",
      "Handover to development",
    ],
  },
];

export const serviceGroups = ["all", "development", "design", "other"] as const;

export type ServiceGroup = (typeof serviceGroups)[number];

export const processSteps = ["discuss", "plan", "build", "deliver", "support"] as const;
