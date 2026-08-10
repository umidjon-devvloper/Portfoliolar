export type LocalizedText = {
  uz: string;
  ru: string;
  en: string;
};

export type SkillGroup = {
  id: string;
  items: string[];
};

export type Project = {
  slug: string;
  name: string;
  role: string | null;
  stack: string[];
  summary: LocalizedText | null;
  href: string | null;
};

export type Contact = {
  email: string | null;
  telegram: string | null;
  github: string | null;
};

export type Profile = {
  firstName: string;
  fullName: string | null;
  role: string;
  education: string | null;
  avatar: string | null;
  contact: Contact;
};
