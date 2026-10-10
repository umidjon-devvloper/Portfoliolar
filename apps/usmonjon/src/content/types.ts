export type LocalizedText = {
  uz: string;
  ru: string;
  en: string;
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  tagline: LocalizedText;
  stack: string[];
  cover: string;
  href: string;
  hrefLabel: string;
};

export type ExperienceEntry = {
  id: string;
  /** ISO-ish start, shown as given */
  from: LocalizedText;
  to: LocalizedText | null;
  current: boolean;
  role: LocalizedText;
  org: LocalizedText;
  summary: LocalizedText;
  duties: LocalizedText[];
};

/** A skill presented as an open service in the hero scan. */
export type PortEntry = {
  port: string;
  service: string;
  label: LocalizedText;
};

export type SkillGroup = {
  id: "infra" | "security" | "build";
  items: string[];
};
