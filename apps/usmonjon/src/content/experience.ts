import type { ExperienceEntry } from "./types";

/* Newest first. */
export const experience: ExperienceEntry[] = [
  {
    id: "freelance",
    from: { uz: "2026", ru: "2026", en: "2026" },
    to: null,
    current: true,
    role: {
      uz: "Full Stack dasturchi",
      ru: "Full Stack разработчик",
      en: "Full Stack Developer",
    },
    org: { uz: "Frilans", ru: "Фриланс", en: "Freelance" },
    summary: {
      uz: "Mijozlar uchun web ilovalarni boshidan oxirigacha quraman — interfeysdan serverga va ishga tushirishgacha.",
      ru: "Строю веб-приложения для клиентов от начала до конца — от интерфейса до сервера и запуска.",
      en: "I build web applications for clients end to end — from the interface to the server and launch.",
    },
    duties: [
      {
        uz: "Frontend va backend qismlarini bitta qo'lda yig'ish",
        ru: "Фронтенд и бэкенд в одних руках",
        en: "Frontend and backend under one owner",
      },
      {
        uz: "Server muhitini sozlash va deploy jarayonini yo'lga qo'yish",
        ru: "Настройка серверной среды и процесса деплоя",
        en: "Setting up the server environment and deploy process",
      },
      {
        uz: "Ilovani xavfsiz konfiguratsiya bilan topshirish",
        ru: "Сдача приложения с безопасной конфигурацией",
        en: "Handing over each app with a secure configuration",
      },
    ],
  },
  {
    id: "buxdu",
    from: { uz: "2025", ru: "2025", en: "2025" },
    to: { uz: "2026, may", ru: "май 2026", en: "May 2026" },
    current: false,
    role: {
      uz: "Tarmoq va server administratori",
      ru: "Администратор сетей и серверов",
      en: "Network & Server Administrator",
    },
    org: {
      uz: "Buxoro davlat universiteti",
      ru: "Бухарский государственный университет",
      en: "Bukhara State University",
    },
    summary: {
      uz: "Universitet tarmog'i va serverlarining uzluksiz, xavfsiz ishlashi uchun javob berdim.",
      ru: "Отвечал за бесперебойную и безопасную работу сети и серверов университета.",
      en: "Kept the university's network and servers running reliably and securely.",
    },
    duties: [
      {
        uz: "Linux serverlarni boshqarish va kuzatish",
        ru: "Администрирование и мониторинг Linux-серверов",
        en: "Administering and monitoring Linux servers",
      },
      {
        uz: "Tarmoq infratuzilmasini sozlash va nosozliklarni bartaraf etish",
        ru: "Настройка сетевой инфраструктуры и устранение неполадок",
        en: "Configuring network infrastructure and resolving faults",
      },
      {
        uz: "Tizimlarga kirish va xavfsizlik siyosatini qo'llab-quvvatlash",
        ru: "Поддержка политик доступа и безопасности систем",
        en: "Maintaining access and security policies across systems",
      },
    ],
  },
];
