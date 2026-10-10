import type { ServiceItem } from "./types";

export const site = {
  domain: "usmonjon.site",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usmonjon.site",
  ogImage: "/og.png",
};

export const navItems = [
  { id: "about", href: "/about" },
  { id: "projects", href: "/projects" },
  { id: "services", href: "/services" },
  { id: "resume", href: "/resume" },
  { id: "contact", href: "/contact" },
] as const;

export const services: ServiceItem[] = [
  { id: "cloud", icon: "Cloud" },
  { id: "cicd", icon: "Workflow" },
  { id: "security", icon: "KeyRound" },
  { id: "servers", icon: "Server" },
  { id: "web", icon: "Code" },
];

export const partners = [
  {
    name: "Umidjon",
    role: "Full Stack Web & Mobile Developer",
    href: "https://umidjon.site",
  },
  {
    name: "Diyorbek",
    role: "Full Stack Web Developer",
    href: "https://diyorbek.site",
  },
];
