import type { CodeLine, Token } from "@/components/ui/code-window";

type AboutValues = {
  birth: string;
  role: string;
  education: string;
  location: string;
  projects: number;
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
    entry("role", values.role),
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
    [
      { text: "  projects", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: String(values.projects), tone: "st" },
      { text: ",", tone: "pn" },
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
    { text: "  location", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "'Buxoro, UZ'", tone: "st" },
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
    { text: "'React Native'", tone: "st" },
    { text: ", ", tone: "pn" },
    { text: "'Expo'", tone: "st" },
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
    { text: ",", tone: "pn" },
  ],
  [
    { text: "  available", tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: "true", tone: "kw" },
    { text: ",", tone: "pn" },
  ],
  [{ text: "};", tone: "pn" }],
];


type SnippetValue = string | number | boolean | string[] | null;

/**
 * Generic object block: strings quoted, numbers and booleans bare, arrays
 * wrapped every `perRow` items so a window never has to scroll sideways.
 * Null values are skipped — an unknown field is left out, not faked.
 */
export function buildObjectSnippet(
  name: string,
  entries: [string, SnippetValue][],
  perRow = 2,
): CodeLine[] {
  const rows: CodeLine[] = [];

  entries.forEach(([key, value]) => {
    if (value === null || (Array.isArray(value) && value.length === 0)) return;

    if (Array.isArray(value)) {
      const pad = " ".repeat(key.length + 5);

      for (let start = 0; start < value.length; start += perRow) {
        const chunk = value.slice(start, start + perRow);
        const row: CodeLine =
          start === 0
            ? [
                { text: `  ${key}`, tone: "pr" },
                { text: ": [", tone: "pn" },
              ]
            : [{ text: pad, tone: "pn" }];

        chunk.forEach((item, index) => {
          row.push({ text: `'${item}'`, tone: "st" });
          if (start + index < value.length - 1) {
            row.push({ text: ", ", tone: "pn" });
          }
        });

        if (start + perRow >= value.length) row.push({ text: "],", tone: "pn" });
        rows.push(row);
      }

      return;
    }

    const literal: Token =
      typeof value === "number"
        ? { text: String(value), tone: "st" }
        : typeof value === "boolean"
          ? { text: String(value), tone: "kw" }
          : { text: `'${value}'`, tone: "st" };

    rows.push([
      { text: `  ${key}`, tone: "pr" },
      { text: ": ", tone: "pn" },
      literal,
      { text: ",", tone: "pn" },
    ]);
  });

  return [
    [
      { text: "const", tone: "kw" },
      { text: ` ${name}`, tone: "fn" },
      { text: " = {", tone: "pn" },
    ],
    ...rows,
    [{ text: "};", tone: "pn" }],
  ];
}

/** Contact header block, built from the same profile data the cards use. */
export function buildContactSnippet(values: {
  name: string;
  telegram: string | null;
  location: string | null;
  replyWithin: string | null;
  status: string;
}): CodeLine[] {
  const entry = (key: string, value: string): CodeLine => [
    { text: `  ${key}`, tone: "pr" },
    { text: ": ", tone: "pn" },
    { text: `'${value}'`, tone: "st" },
    { text: ",", tone: "pn" },
  ];

  /* Unknown values are dropped rather than printed empty. */
  const rows: CodeLine[] = (
    [
      /* The address is too long for this window, so the card carries it. */
      ["name", values.name],
      ["telegram", values.telegram],
      ["location", values.location],
      ["replyWithin", values.replyWithin],
      ["status", values.status],
    ] as const
  )
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => entry(key, value as string));

  return [
    [
      { text: "const", tone: "kw" },
      { text: " contact", tone: "fn" },
      { text: " = {", tone: "pn" },
    ],
    ...rows,
    [{ text: "};", tone: "pn" }],
  ];
}

type ExperienceValues = {
  since: string;
  roles: number;
  current: string;
  agency: string;
  projects: number;
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
    [
      { text: "  agency", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: `'${values.agency}'`, tone: "st" },
      { text: ",", tone: "pn" },
    ],
    [
      { text: "  projects", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: String(values.projects), tone: "st" },
      { text: ",", tone: "pn" },
    ],
    stack,
    [{ text: "};", tone: "pn" }],
  ];
}

/** Services header block. */
export function buildServicesSnippet(values: {
  offers: string[];
  from: string;
  delivery: string;
  clients: number;
  replyWithin: string;
}): CodeLine[] {
  /* Three per line so the window stays narrow. */
  const rows: CodeLine[] = [];
  const perRow = 3;

  for (let start = 0; start < values.offers.length; start += perRow) {
    const chunk = values.offers.slice(start, start + perRow);
    const row: CodeLine =
      start === 0
        ? [
            { text: "  offers", tone: "pr" },
            { text: ": [", tone: "pn" },
          ]
        : [{ text: "            ", tone: "pn" }];

    chunk.forEach((item, index) => {
      row.push({ text: `'${item}'`, tone: "st" });
      if (start + index < values.offers.length - 1) {
        row.push({ text: ", ", tone: "pn" });
      }
    });

    if (start + perRow >= values.offers.length) {
      row.push({ text: "],", tone: "pn" });
    }

    rows.push(row);
  }

  return [
    [
      { text: "const", tone: "kw" },
      { text: " services", tone: "fn" },
      { text: " = {", tone: "pn" },
    ],
    ...rows,
    [
      { text: "  stack", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: `'${values.from}'`, tone: "st" },
      { text: ",", tone: "pn" },
    ],
    [
      { text: "  delivery", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: `'${values.delivery}'`, tone: "st" },
      { text: ",", tone: "pn" },
    ],
    [
      { text: "  clients", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: String(values.clients), tone: "st" },
      { text: ",", tone: "pn" },
    ],
    [
      { text: "  replyWithin", tone: "pr" },
      { text: ": ", tone: "pn" },
      { text: `'${values.replyWithin}'`, tone: "st" },
      { text: ",", tone: "pn" },
    ],
    [{ text: "};", tone: "pn" }],
  ];
}
