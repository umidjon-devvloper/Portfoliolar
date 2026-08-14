export type LocalizedText = {
  uz: string;
  ru: string;
  en: string;
};

export type ProjectKind =
  | "saas"
  | "mobile"
  | "web"
  | "ecommerce"
  | "business";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "repo" | "appStore" | "playStore";
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
  client: string | null;
  gallery: string[];
};

export type SkillGroup = {
  id: string;
  items: string[];
};

export type Metric = {
  id: string;
  value: number;
  suffix: string;
};

export type ServiceItem = {
  id: string;
  icon: string;
};

export type Education = {
  institution: string;
  field: string;
  degree: string;
  from: string;
  to: string;
};

export type Location = {
  city: string;
  region: string;
  country: string;
  countryCode: string;
};

export type Contact = {
  email: string;
  emailSecondary: string | null;
  telegram: string | null;
  telegramHandle: string | null;
  phone: string | null;
  phoneDisplay: string | null;
  github: string | null;
  linkedin: string | null;
  instagram: string | null;
  agency: string | null;
};

export type Profile = {
  firstName: string;
  fullName: string | null;
  role: string;
  secondaryRole: string;
  birthDate: string | null;
  education: Education | null;
  location: Location | null;
  avatar: string | null;
  resumeFile: string | null;
  contact: Contact;
};
