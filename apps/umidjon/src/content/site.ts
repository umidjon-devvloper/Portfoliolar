import type { ServiceItem } from "./types";

export const site = {
  domain: "umidjon.site",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://umidjon.site",
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
  { id: "landing", icon: "Globe" },
  { id: "corporate", icon: "LayoutDashboard" },
  { id: "ecommerce", icon: "ShoppingCart" },
  { id: "mobile", icon: "Smartphone" },
  { id: "backend", icon: "Server" },
  { id: "uiux", icon: "PenTool" },
  { id: "saas", icon: "Boxes" },
  { id: "bots", icon: "Bot" },
];

export const partners = [
  {
    name: "Diyorbek",
    role: "Full Stack Web Developer",
    href: "https://diyorbek.site",
  },
  {
    name: "Usmonjon",
    role: "Frontend Developer & UI/UX Designer",
    href: "https://usmonjon.site",
  },
];
