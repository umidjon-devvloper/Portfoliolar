/**
 * The site's central claim: one person covers every layer of a product.
 * Rendered as a vertical spine that fills as you scroll (StackSpine).
 * Each layer names real tools he ships with — no aspirational entries.
 */
export const stackLayers = [
  { id: "design", tools: ["Figma", "UI/UX", "Prototype"] },
  { id: "frontend", tools: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { id: "backend", tools: ["Node.js", "Express", "MongoDB", "REST / GraphQL"] },
  { id: "mobile", tools: ["React Native", "Expo", "EAS Build"] },
  { id: "release", tools: ["Vercel", "App Store", "Google Play", "Cloudflare"] },
] as const;
