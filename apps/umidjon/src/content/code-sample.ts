import type { CodeLine } from "@/components/ui/code-window";

type AboutValues = {
  birth: string;
  education: string;
  location: string;
  languages: string[];
  focus: string[];
};

/**
 * The About panel as a code block, built from the same profile data the
 * rest of the page uses so the two can never drift apart.
 */
export function buildAboutSnippet(values: AboutValues): CodeLine[] {
  const list = (items: string[]): CodeLine => {
    const line: CodeLine = [{ text: "[", tone: "pn" }];

    items.forEach((item, index) => {
      line.push({ text: `'${item}'`, tone: "st" });
      if (index < items.length - 1) line.push({ text: ", ", tone: "pn" });
    });

    line.push({ text: "],", tone: "pn" });
    return line;
  };

  const entry = (key: string, value: string): CodeLine => [
    { text: `  ${key}`, tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: `'${value}'`, tone: "st" },
    { text: ",", tone: "pn" },
  ];

  return [
    [
      { text: "const", tone: "kw" },
      { text: " umidjon", tone: "fn" },
      { text: " = {", tone: "pn" },
    ],
    entry("birth", values.birth),
    entry("education", values.education),
    entry("location", values.location),
    [
      { text: "  languages", tone: "pr" },
      { text: ": ", tone: "pn" },
      ...list(values.languages),
    ],
    [
      { text: "  focus", tone: "pr" },
      { text: ": ", tone: "pn" },
      ...list(values.focus),
    ],
    [{ text: "};", tone: "pn" }],
  ];
}

export const developerSnippet: CodeLine[] = [
  [
    { text: "const", tone: "kw" },
    { text: " developer", tone: "fn" },
    { text: " = {", tone: "pn" },
  ],
  [
    { text: "  name", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Umidjon'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [
    { text: "  role", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Full-Stack Developer'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [
    { text: "  passion", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Digital products'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [
    { text: "  skills", tone: "pr" },
    { text: ": [", tone: "pn" },
    { text: "'Next.js'", tone: "st" },
    { text: ", ", tone: "pn" },
    { text: "'React'", tone: "st" },
    { text: ",", tone: "pn" },
  ],
  [
    { text: "           ", tone: "pn" },
    { text: "'Node.js'", tone: "st" },
    { text: ", ", tone: "pn" },
    { text: "'MongoDB'", tone: "st" },
    { text: "],", tone: "pn" },
  ],
  [
    { text: "  focus", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Performance & UX'", tone: "st" },
  ],
  [{ text: "};", tone: "pn" }],
];

type ExperienceValues = {
  since: string;
  roles: number;
  current: string;
  stack: string[];
};

/** Experience header block, assembled from the roles data. */
export function buildExperienceSnippet(values: ExperienceValues): CodeLine[] {
  const stack: CodeLine = [
    { text: "  stack", tone: "pr" },
    { text: ": [", tone: "pn" },
  ];

  values.stack.forEach((item, index) => {
    stack.push({ text: `'${item}'`, tone: "st" });
    if (index < values.stack.length - 1) stack.push({ text: ", ", tone: "pn" });
  });
  stack.push({ text: "],", tone: "pn" });

  return [
    [
      { text: "const", tone: "kw" },
      { text: " experience", tone: "fn" },
      { text: " = {", tone: "pn" },
    ],
    [
      { text: "  since", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: values.since, tone: "st" },
      { text: ",", tone: "pn" },
    ],
    [
      { text: "  roles", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: String(values.roles), tone: "st" },
      { text: ",", tone: "pn" },
    ],
    [
      { text: "  current", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: `'${values.current}'`, tone: "st" },
      { text: ",", tone: "pn" },
    ],
    stack,
    [{ text: "};", tone: "pn" }],
  ];
}
