import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "thehotelsaas",
    name: "TheHotelSaaS",
    kind: "saas",
    year: null, // TODO
    featured: true,
    cover: null, // TODO: /projects/thehotelsaas.webp
    gallery: [],
    links: [], // TODO: live demo / repo
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    integrations: [],
    components: [],
    tagline: {
      uz: "Mehmonxonalar uchun SaaS platforma",
      ru: "SaaS-платформа для отелей",
      en: "SaaS platform for hotels",
    },
    problem: {
      uz: "Hotel bizneslarida boshqaruv, monitoring va operatsion jarayonlar qo'lda olib boriladi — bu vaqt va daromad yo'qotishga olib keladi.",
      ru: "В отельном бизнесе управление, мониторинг и операционные процессы ведутся вручную — это приводит к потере времени и дохода.",
      en: "Hotel businesses run management, monitoring and operations manually, which costs them both time and revenue.",
    },
    solution: {
      uz: "Raqamli boshqaruv, monitoring va biznes jarayonlarini avtomatlashtirish imkonini beruvchi to'liq SaaS platforma.",
      ru: "Полноценная SaaS-платформа для цифрового управления, мониторинга и автоматизации бизнес-процессов.",
      en: "A complete SaaS platform for digital management, monitoring and automation of business processes.",
    },
    result: {
      uz: "Ishlab turgan mahsulot, xalqaro bozorga chiqarish rejalashtirilgan.",
      ru: "Работающий продукт, планируется выход на международный рынок.",
      en: "A live product, with international market entry planned.",
    },
  },
  {
    slug: "rateradar",
    name: "RateRadar",
    kind: "saas",
    year: null, // TODO
    featured: true,
    cover: null, // TODO
    gallery: [],
    links: [], // TODO
    stack: ["Node.js", "SerpAPI", "MongoDB", "Next.js"],
    integrations: ["Google Hotels", "Booking", "Expedia", "Agoda", "SerpAPI"],
    components: [],
    tagline: {
      uz: "Hotel narxlarini monitoring qiluvchi mahsulot",
      ru: "Продукт для мониторинга цен отелей",
      en: "Hotel rate monitoring product",
    },
    problem: {
      uz: "Mehmonxonalar raqobatchilarning OTA platformalaridagi narxlarini kuzata olmaydi va narx strategiyasini ma'lumotga asoslab qura olmaydi.",
      ru: "Отели не могут отслеживать цены конкурентов на OTA-платформах и строить ценовую стратегию на основе данных.",
      en: "Hotels cannot track competitor pricing across OTA platforms, so their rate strategy is not data-driven.",
    },
    solution: {
      uz: "OTA platformalaridan raqobatchi narxlarini yig'ish, tahlil qilish va hotel biznesiga foydali insightlar taqdim etish.",
      ru: "Сбор цен конкурентов с OTA-платформ, их анализ и предоставление отелю полезных инсайтов.",
      en: "Collecting competitor rates from OTA platforms, analysing them and turning them into actionable insights.",
    },
    result: null, // TODO: measurable outcome
  },
  {
    slug: "sushi-time",
    name: "Sushi Time",
    kind: "fullstack",
    year: null, // TODO
    featured: true,
    cover: null, // TODO
    gallery: [],
    links: [], // TODO
    stack: ["Node.js", "Express.js", "MongoDB", "React Native", "Expo", "React"],
    integrations: [],
    components: ["Backend API", "Admin panel", "Mobile application", "Web client"],
    tagline: {
      uz: "Bir nechta qismdan iborat to'liq tizim",
      ru: "Целостная система из нескольких частей",
      en: "A complete multi-part system",
    },
    problem: {
      uz: "Restoran uchun buyurtma va boshqaruv jarayonlarini raqamlashtirish.",
      ru: "Цифровизация процессов заказа и управления для ресторана.",
      en: "Digitising ordering and management processes for a restaurant.",
    },
    solution: {
      uz: "Backend, admin, mobil va web mijoz qismlarini bitta ekotizimga birlashtirish.",
      ru: "Объединение backend, админки, мобильного и веб-клиента в единую экосистему.",
      en: "Uniting backend, admin panel, mobile app and web client into a single ecosystem.",
    },
    result: {
      uz: "Frontend, backend, mobile va admin tizimlarini birlashtirish tajribasi.",
      ru: "Опыт объединения frontend, backend, mobile и admin систем.",
      en: "Hands-on experience integrating frontend, backend, mobile and admin systems.",
    },
  },
  {
    slug: "zapchasty",
    name: "Zapchasty",
    kind: "mobile",
    year: null, // TODO
    featured: false,
    cover: null, // TODO
    gallery: [],
    links: [], // TODO: App Store / Google Play
    stack: ["React Native", "Expo", "EAS Build", "Node.js"],
    integrations: [],
    components: [],
    tagline: {
      uz: "Avtomobil ehtiyot qismlari uchun mobil ilova",
      ru: "Мобильное приложение для автозапчастей",
      en: "Mobile app for car spare parts",
    },
    problem: {
      uz: "Ehtiyot qism izlash va sotib olish jarayoni tarqoq va noqulay.",
      ru: "Поиск и покупка запчастей — процесс разрозненный и неудобный.",
      en: "Finding and buying spare parts is fragmented and inconvenient.",
    },
    solution: {
      uz: "React Native / Expo asosida mobil marketplace ilova.",
      ru: "Мобильное marketplace-приложение на React Native / Expo.",
      en: "A mobile marketplace app built with React Native / Expo.",
    },
    result: {
      uz: "Google Play va App Store publish jarayonlari to'liq bajarilgan.",
      ru: "Полностью пройдены процессы публикации в Google Play и App Store.",
      en: "Full release pipeline completed on both Google Play and the App Store.",
    },
  },
  {
    slug: "umidjon-agency",
    name: "Umidjon Agency",
    kind: "business",
    year: null, // TODO
    featured: false,
    cover: null, // TODO
    gallery: [],
    links: [{ label: "umidjon.agency", href: "https://umidjon.agency" }],
    stack: [],
    integrations: [],
    components: [
      "Web saytlar",
      "Web applications",
      "Mobile applications",
      "Telegram botlar",
      "Biznes uchun raqamli tizimlar",
      "UI/UX",
      "Backend va API",
      "Deployment va texnik qo'llab-quvvatlash",
    ],
    tagline: {
      uz: "Web va mobil development agentligi",
      ru: "Агентство web- и мобильной разработки",
      en: "Web and mobile development agency",
    },
    problem: {
      uz: "Bizneslar raqamli mahsulotni bir nechta ijrochi orqali qurishga majbur — natija bo'linib ketadi.",
      ru: "Бизнесу приходится собирать цифровой продукт у разных исполнителей — результат распадается.",
      en: "Businesses have to assemble a digital product from several separate vendors, and the result falls apart.",
    },
    solution: {
      uz: "Idea'dan deploymentgacha bo'lgan butun jarayonni bitta jamoada bajarish.",
      ru: "Весь путь от идеи до деплоя внутри одной команды.",
      en: "The whole path from idea to deployment handled by one team.",
    },
    result: null, // TODO
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectKinds = ["all", "saas", "mobile", "fullstack", "business"] as const;

export type ProjectFilter = (typeof projectKinds)[number];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
