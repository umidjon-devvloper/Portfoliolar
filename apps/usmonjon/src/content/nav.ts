export const navItems = [
  { id: "home", href: "/", icon: "House" },
  { id: "about", href: "/about", icon: "User" },
  { id: "work", href: "/work", icon: "Briefcase" },
  { id: "skills", href: "/skills", icon: "Code" },
  { id: "contact", href: "/contact", icon: "Send" },
] as const;

/** Five slots on the bottom bar, and five pages — nothing spills over yet. */
export const bottomNavIds = ["home", "about", "work", "skills", "contact"] as const;
