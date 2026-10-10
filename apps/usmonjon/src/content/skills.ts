import type { PortEntry, SkillGroup } from "./types";

/* Hero scan: each line is a real port number paired with the discipline
   that lives behind it. Order is ascending, like real scanner output. */
export const ports: PortEntry[] = [
  {
    port: "22/tcp",
    service: "ssh",
    label: { uz: "Linux serverlar", ru: "Linux-серверы", en: "Linux servers" },
  },
  {
    port: "53/udp",
    service: "dns",
    label: { uz: "Tarmoq infratuzilmasi", ru: "Сетевая инфраструктура", en: "Network infrastructure" },
  },
  {
    port: "443/tcp",
    service: "https",
    label: { uz: "Tizim xavfsizligi", ru: "Безопасность систем", en: "System security" },
  },
  {
    port: "2376/tcp",
    service: "docker",
    label: { uz: "Konteynerlashtirish", ru: "Контейнеризация", en: "Containerization" },
  },
  {
    port: "3000/tcp",
    service: "http",
    label: { uz: "Full stack ilovalar", ru: "Full stack приложения", en: "Full stack apps" },
  },
  {
    port: "8080/tcp",
    service: "ci",
    label: { uz: "CI/CD avtomatlashtirish", ru: "Автоматизация CI/CD", en: "CI/CD automation" },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "infra",
    items: [
      "Linux",
      "Containers",
      "Cloud infrastructure",
      "CI/CD",
      "Server administration",
      "Networking",
      "Git / GitHub",
    ],
  },
  {
    id: "security",
    items: ["System security", "Secure CI/CD", "Network administration"],
  },
  {
    id: "build",
    items: [
      "HTML / CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Responsive design",
      "Figma",
    ],
  },
];
