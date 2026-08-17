export type Role = {
  id: string;
  company: string | null;
  from: string;
  to: string | null;
  current: boolean;
  stack: string[];
  /** Number of bullet points held in messages under `<id>.duties`. */
  duties: number;
};

export const roles: Role[] = [
  {
    id: "fullstack",
    company: "Umidjon Agency",
    from: "2026",
    to: null,
    current: true,
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "React Native",
      "Expo",
      "Tailwind CSS",
      "Firebase",
      "Git",
      "Vercel",
    ],
    duties: 5,
  },
  {
    // TODO: title, description, duties and stack are not confirmed yet.
    id: "kbk",
    company: "KBK",
    from: "2025",
    to: "2026",
    current: false,
    stack: [],
    duties: 0,
  },
  {
    // TODO: title, description, duties and stack are not confirmed yet.
    id: "agrocluster",
    company: "Bukhara Agrocluster",
    from: "2024",
    to: "2025",
    current: false,
    stack: [],
    duties: 0,
  },
  {
    id: "freelance",
    company: null,
    from: "2021",
    to: "2024",
    current: false,
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Git",
      "Vercel",
    ],
    duties: 4,
  },
];

/** First year on the timeline. */
export const careerStart: string | null =
  roles.map((role) => role.from.slice(0, 4)).sort()[0] ?? null;

/** The role held right now, if one is marked current. */
export const currentRole = roles.find((role) => role.current) ?? null;

/** Technologies that appear across the most roles. */
export const careerStack = Object.entries(
  roles
    .flatMap((role) => role.stack)
    .reduce<Record<string, number>>((counts, item) => {
      counts[item] = (counts[item] ?? 0) + 1;
      return counts;
    }, {}),
)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 3)
  .map(([item]) => item);
