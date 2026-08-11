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

/**
 * Starting prices mirror umidjon.agency. Keep both in sync —
 * a mismatch between the two sites reads as untrustworthy.
 */
export const services: ServiceItem[] = [
  { id: "landing", icon: "Globe", priceFrom: 300 },
  { id: "corporate", icon: "LayoutDashboard", priceFrom: 800 },
  { id: "ecommerce", icon: "ShoppingCart", priceFrom: 1500 },
  { id: "mobile", icon: "Smartphone", priceFrom: 2500 },
  { id: "backend", icon: "Server", priceFrom: 600 },
  { id: "uiux", icon: "PenTool", priceFrom: 400 },
  { id: "saas", icon: "Boxes", priceFrom: null },
  { id: "bots", icon: "Bot", priceFrom: null },
];

export const partners = [
  {
    name: "Diyorbek",
    role: "Full Stack Web Developer",
    href: "https://diyorber.site",
  },
  {
    name: "Usmonjon",
    role: "Frontend Developer & UI/UX Designer",
    href: "https://usmonjon.site",
  },
];
