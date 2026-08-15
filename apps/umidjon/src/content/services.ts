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
    points: ["Next.js / React / TypeScript", "Tailwind CSS / shadcn/ui", "API integration", "Performance"],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    group: "development",
    points: ["React Native / Expo", "Clean UI/UX", "Firebase / REST API", "App Store & Play Store"],
  },
  {
    id: "backend",
    icon: "Server",
    group: "development",
    points: ["Node.js / Express.js", "MongoDB", "Auth & authorization", "Payment integration"],
  },
  {
    id: "saas",
    icon: "Cloud",
    group: "development",
    points: ["Multi-tenant architecture", "Subscription & billing", "Admin dashboard", "Analytics"],
  },
  {
    id: "uiux",
    icon: "PenTool",
    group: "design",
    points: ["Figma design", "User research", "Wireframes & prototypes", "Design systems"],
  },
  {
    id: "seo",
    icon: "Rocket",
    group: "other",
    points: ["Core Web Vitals", "SEO optimisation", "Image & asset optimisation", "Page speed"],
  },
];

export const serviceGroups = ["all", "development", "design", "other"] as const;

export type ServiceGroup = (typeof serviceGroups)[number];

export const processSteps = ["discuss", "plan", "build", "deliver", "support"] as const;
