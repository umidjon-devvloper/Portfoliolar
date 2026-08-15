export const navItems = [
  { id: "home", href: "/", icon: "House" },
  { id: "about", href: "/about", icon: "User" },
  { id: "work", href: "/work", icon: "Briefcase" },
  { id: "skills", href: "/skills", icon: "Code" },
  { id: "experience", href: "/experience", icon: "ChartNoAxesColumn" },
  { id: "services", href: "/services", icon: "LayoutGrid" },
  { id: "contact", href: "/contact", icon: "Send" },
] as const;

/** Five slots on the bottom bar; the rest live in the sheet menu. */
export const bottomNavIds = ["home", "about", "work", "skills", "contact"] as const;
