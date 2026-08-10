export type LocalizedText = {
  uz: string;
  ru: string;
  en: string;
};

export type ProjectKind = "saas" | "mobile" | "fullstack" | "business";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  year: string | null;
  featured: boolean;
  tagline: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  result: LocalizedText | null;
  stack: string[];
  integrations: string[];
  components: string[];
  links: ProjectLink[];
  cover: string | null;
  gallery: string[];
};

export type SkillGroup = {
  id: string;
  items: string[];
};

export type ServiceItem = {
  id: string;
  icon: string;
};

export type Contact = {
  email: string | null;
  telegram: string | null;
  phone: string | null;
  github: string | null;
  linkedin: string | null;
  agency: string | null;
};

export type Profile = {
  firstName: string;
  fullName: string | null;
  role: string;
  secondaryRole: string;
  education: string | null;
  location: string | null;
  avatar: string | null;
  resumeFile: string | null;
  contact: Contact;
};
