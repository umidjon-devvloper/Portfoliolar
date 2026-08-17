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
      "Next.js / React / TypeScript",
      "Tailwind CSS / shadcn/ui",
      "CMS and content modelling",
      "REST and GraphQL integration",
      "Core Web Vitals and SEO",
      "Multi-language routing",
    ],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    group: "development",
    points: [
      "React Native / Expo",
      "One codebase, iOS and Android",
      "Push notifications and deep links",
      "Firebase and REST integration",
      "EAS build pipeline",
      "App Store and Play Store release",
    ],
  },
  {
    id: "backend",
    icon: "Server",
    group: "development",
    points: [
      "Node.js / Express.js",
      "MongoDB and Mongoose schemas",
      "Authentication and roles",
      "Payment gateways",
      "File storage and media",
      "Admin panel and dashboards",
    ],
  },
  {
    id: "saas",
    icon: "Cloud",
    group: "development",
    points: [
      "Multi-tenant architecture",
      "Subscriptions and billing",
      "Role-based access",
      "Usage analytics",
      "Admin and customer dashboards",
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
      "Design system and tokens",
      "Responsive layouts",
      "Dark and light themes",
      "Handover to development",
    ],
  },
  {
    id: "seo",
    icon: "Rocket",
    group: "other",
    points: [
      "Core Web Vitals audit",
      "Bundle and image optimisation",
      "Caching and CDN setup",
      "Technical SEO and sitemaps",
      "Structured data",
      "Ongoing monitoring",
    ],
  },
];

export const serviceGroups = ["all", "development", "design", "other"] as const;

export type ServiceGroup = (typeof serviceGroups)[number];

export const processSteps = ["discuss", "plan", "build", "deliver", "support"] as const;
