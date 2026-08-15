export type Role = {
  id: string;
  company: string | null;
  from: string;
  to: string | null;
  current: boolean;
  stack: string[];
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
    stack: ["Next.js", "React", "Node.js", "MongoDB", "React Native"],
  },
  {
    id: "freelance",
    company: null,
    from: "2023-05",
    to: "2025-04",
    current: false,
    stack: ["React", "Next.js", "TypeScript", "Express.js"],
  },
  {
    id: "frontend",
    company: null,
    from: "2022-01",
    to: "2023-04",
    current: false,
    stack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "junior",
    company: null,
    from: "2021-06",
    to: "2021-12",
    current: false,
    stack: ["JavaScript", "HTML", "CSS"],
  },
];
