export const stackLayers = [
  { id: "infra", tools: ["Linux", "Networking", "Cloud"] },
  { id: "containers", tools: ["Docker", "Containers"] },
  { id: "pipeline", tools: ["Git", "GitHub", "CI/CD"] },
  { id: "security", tools: ["Hardening", "Access", "HTTPS"] },
  { id: "app", tools: ["React", "Tailwind CSS"] },
] as const;
