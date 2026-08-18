import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "psixologik-skrining",
    name: "Psixologik Skrining Tizimi",
    kind: "web",
    year: "2026",
    client: null,
    featured: true,
    cover: null, // TODO
    logo: null,
    gallery: [],
    links: [], // TODO: havola chiqqach qo'shiladi
    stack: ["Django", "PostgreSQL", "React"],
    collaborator: null,
    contribution: null,
    integrations: [],
    components: [],
    tagline: {
      uz: "Psixologik test va natija tizimi",
      ru: "Система психологического тестирования",
      en: "Psychological screening and results system",
    },
    problem: null, // TODO
    solution: {
      uz: "Admin savollarni kiritadi, foydalanuvchi testni ishlaydi va natijasini oladi.",
      ru: "Администратор вводит вопросы, пользователь проходит тест и получает результат.",
      en: "An admin enters the questions; the user takes the test and gets the result.",
    },
    result: null, // TODO
  },
  {
    slug: "olimpiada-bot",
    name: "Online Olimpiada Telegram Bot",
    kind: "bot",
    year: "2025",
    client: null,
    featured: true,
    cover: null, // TODO
    logo: null,
    gallery: [],
    links: [
      {
        label: "@Olimpiada_uzb_bot",
        href: "https://t.me/Olimpiada_uzb_bot",
        kind: "live",
      },
    ],
    stack: ["Python", "Telegram Bot API"],
    collaborator: null,
    contribution: null,
    integrations: ["Telegram"],
    components: [],
    tagline: {
      uz: "Telegram orqali onlayn olimpiada o'tkazish",
      ru: "Проведение онлайн-олимпиад через Telegram",
      en: "Running online olympiads through Telegram",
    },
    problem: null, // TODO
    solution: null, // TODO
    result: null,
  },
  {
    slug: "video-downloader-bot",
    name: "Instagram & YouTube Video Yuklovchi Bot",
    kind: "bot",
    year: "2024",
    client: null,
    featured: false,
    cover: null, // TODO
    logo: null,
    gallery: [],
    links: [
      {
        label: "@yuk1ash_bot",
        href: "https://t.me/yuk1ash_bot",
        kind: "live",
      },
    ],
    stack: ["Python", "yt-dlp"],
    collaborator: null,
    contribution: null,
    integrations: ["Telegram", "Instagram", "YouTube"],
    components: [],
    tagline: {
      uz: "Instagram va YouTube videolarini yuklab beruvchi bot",
      ru: "Бот для скачивания видео из Instagram и YouTube",
      en: "A bot that downloads Instagram and YouTube videos",
    },
    problem: null,
    solution: null,
    result: null,
  },
  {
    slug: "wikipedia-bot",
    name: "Wikipedia Bot",
    kind: "bot",
    year: "2024",
    client: null,
    featured: false,
    cover: null, // TODO
    logo: null,
    gallery: [],
    links: [
      {
        label: "@wikiped1auzbot",
        href: "https://t.me/wikiped1auzbot",
        kind: "live",
      },
    ],
    stack: ["Python", "Wikipedia API"],
    collaborator: null,
    contribution: null,
    integrations: ["Telegram", "Wikipedia API"],
    components: [],
    tagline: {
      uz: "Telegram orqali Wikipedia'dan qidirish",
      ru: "Поиск по Wikipedia через Telegram",
      en: "Searching Wikipedia from Telegram",
    },
    problem: null,
    solution: null,
    result: null,
  },
  {
    slug: "minesweeper",
    name: "Minesweeper O'yini",
    kind: "game",
    year: "2025",
    client: null,
    featured: false,
    cover: null, // TODO
    logo: null,
    gallery: [],
    links: [], // Play Market'ga chiqarilmagan
    stack: ["Kotlin", "Android"],
    collaborator: null,
    contribution: null,
    integrations: [],
    components: [],
    tagline: {
      uz: "Android uchun Minesweeper o'yini",
      ru: "Игра «Сапёр» для Android",
      en: "Minesweeper for Android",
    },
    problem: null,
    solution: null,
    result: null,
  },
  {
    slug: "thehotelsaas",
    name: "TheHotelSaaS",
    kind: "saas",
    year: "2026",
    client: null,
    featured: true,
    cover: "/images/projects/thehotelsaas.webp",
    logo: null,
    gallery: [],
    links: [
      {
        label: "thehotelsaas.com",
        href: "https://thehotelsaas.com",
        kind: "live",
      },
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "SerpAPI", "Tailwind CSS"],
    collaborator: "Umidjon",
    contribution: {
      uz: "Tizimning mijoz va xodim uchun mo'ljallangan qismini yozganman.",
      ru: "Я написал часть системы, предназначенную для клиента и сотрудника.",
      en: "I built the client-facing and staff-facing side of the system.",
    },
    integrations: ["Google Hotels", "Booking", "Expedia", "Agoda", "SerpAPI"],
    components: [],
    tagline: {
      uz: "Mehmonxonalar uchun SaaS platforma",
      ru: "SaaS-платформа для отелей",
      en: "SaaS platform for hotels",
    },
    problem: {
      uz: "Mehmonxonalar boshqaruvni qo'lda olib boradi va raqobatchilarning OTA platformalaridagi narxlarini kuzata olmaydi.",
      ru: "Отели ведут управление вручную и не могут отслеживать цены конкурентов на OTA-платформах.",
      en: "Hotels run operations by hand and cannot track competitor pricing across OTA platforms.",
    },
    solution: {
      uz: "RateRadar nomi bilan narx monitoringi sifatida boshlangan va to'liq boshqaruv platformasiga o'sgan mahsulot.",
      ru: "Продукт начинался как мониторинг цен под именем RateRadar и вырос в полноценную платформу управления.",
      en: "Started as a rate-monitoring tool called RateRadar and grew into a full management platform.",
    },
    result: {
      uz: "Ishlab turgan tizim — internetda ochiq va foydalanishda.",
      ru: "Работающая система — доступна онлайн и используется.",
      en: "A live system, online and in use.",
    },
  },
  {
    slug: "artsuzani",
    name: "ArtSuzani",
    kind: "ecommerce",
    year: "2025",
    client: "ArtSuzani",
    featured: true,
    cover: "/images/projects/artsuzani.webp",
    logo: null,
    gallery: [],
    links: [{ label: "artsuzani.com", href: "https://artsuzani.com", kind: "live" }],
    stack: ["Next.js 14", "TypeScript", "Stripe", "Sanity CMS"],
    collaborator: "Umidjon",
    contribution: {
      uz: "Tizimning mijoz va xodim uchun mo'ljallangan qismini yozganman.",
      ru: "Я написал часть системы, предназначенную для клиента и сотрудника.",
      en: "I built the client-facing and staff-facing side of the system.",
    },
    integrations: ["Stripe", "Sanity"],
    components: [],
    tagline: {
      uz: "O'zbek hunarmandchiligi uchun premium onlayn do'kon",
      ru: "Премиальный магазин узбекских ремёсел",
      en: "Premium e-commerce for Uzbek handicrafts",
    },
    problem: {
      uz: "Hunarmandchilik brendiga xalqaro xaridorga sotadigan do'kon kerak edi.",
      ru: "Ремесленному бренду нужен был магазин для продаж международным покупателям.",
      en: "A handicraft brand needed a store that sells to international buyers.",
    },
    solution: {
      uz: "Savat, sevimlilar, Stripe to'lovi va CMS orqali boshqariladigan katalog.",
      ru: "Корзина, избранное, оплата через Stripe и каталог под управлением CMS.",
      en: "Cart, wishlist, Stripe checkout and a CMS-driven catalogue.",
    },
    result: {
      uz: "Ishlayotgan do'kon — xalqaro to'lov qabul qiladi.",
      ru: "Работающий магазин с приёмом международных платежей.",
      en: "A live store accepting international payments.",
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectKinds = [
  "all",
  "saas",
  "web",
  "ecommerce",
  "mobile",
  "bot",
  "game",
  "business",
] as const;

export type ProjectFilter = (typeof projectKinds)[number];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
