export type LocalizedText = {
  uz: string;
  ru: string;
  en: string;
};

export type SkillGroup = {
  id: string;
  items: string[];
};

export type Work = {
  slug: string;
  name: string;
  kind: "ui" | "web" | "branding";
  cover: string | null;
  summary: LocalizedText | null;
  href: string | null;
};

export type Contact = {
  email: string | null;
  telegram: string | null;
  github: string | null;
  behance: string | null;
  dribbble: string | null;
};

export type Profile = {
  firstName: string;
  fullName: string | null;
  role: string;
  education: string | null;
  avatar: string | null;
  contact: Contact;
};
