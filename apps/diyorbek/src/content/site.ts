import type { ServiceItem } from "./types";

export const site = {
  domain: "diyorbek.site",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://diyorbek.site",
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
    name: "Umidjon",
    role: "Full Stack Web & Mobile Developer",
    href: "https://umidjon.site",
  },
  {
    name: "Usmonjon",
    role: "Frontend Developer & UI/UX Designer",
    href: "https://usmonjon.site",
  },
];
