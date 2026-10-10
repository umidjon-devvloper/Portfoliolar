import type { CodeLine, Token } from "@/components/ui/code-window";
import { marqueeSkills, metrics, profile } from "./profile";

/**
 * Home window. Every value comes from the content files, so filling those
 * in is the only step — nothing here needs editing by hand.
 */
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

export const developerSnippet: CodeLine[] = buildObjectSnippet("developer", [
  ["name", profile.fullName ?? profile.firstName],
  ["role", profile.role],
  ["location", profile.location
    ? `${profile.location.city}, ${profile.location.countryCode}`
    : null],
  ["skills", marqueeSkills.slice(0, 6)],
  ["projects", metrics.find((metric) => metric.id === "projects")?.value ?? null],
  ["available", true],
]);
