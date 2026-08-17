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

/**
 * TODO: verify every entry against the real work history before launch.
 * These came from the design mock-up, not from a confirmed source.
 */
export const roles: Role[] = [
  {
    id: "fullstack",
    company: "Umidjon Agency",
    from: "2025-05",
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
    id: "freelance",
    company: null,
    from: "2023-05",
    to: "2025-04",
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
  {
    id: "frontend",
    company: null,
    from: "2022-01",
    to: "2023-04",
    current: false,
    stack: ["React", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "Git", "Figma"],
    duties: 3,
  },
  {
    id: "junior",
    company: null,
    from: "2021-06",
    to: "2021-12",
    current: false,
    stack: ["JavaScript", "HTML5 / CSS3", "Git", "GitHub"],
    duties: 3,
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
