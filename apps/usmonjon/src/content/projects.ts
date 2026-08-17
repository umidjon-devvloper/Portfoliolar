import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "thehotelsaas",
    name: "TheHotelSaaS",
    kind: "saas",
    year: "2026",
    client: null,
    featured: true,
    cover: "/images/projects/thehotelsaas.webp",
    gallery: [],
    links: [
      {
        label: "thehotelsaas.com",
        href: "https://thehotelsaas.com",
        kind: "live",
      },
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "SerpAPI", "Tailwind CSS"],
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
    slug: "sushi-time",
    name: "Sushi Time",
    kind: "web",
    year: "2026",
    client: null,
    featured: true,
    // TODO: swap to "/images/projects/sushi-time.webp" once the file is in public/
    cover:
      "https://vjuubkjgs6.ufs.sh/f/ATnCuPXyY61iGtwWFzCgKshzbFy4nfRVW8wJLrAx6IimUM9e",
    gallery: [],
    links: [
      { label: "sushitimetr.com", href: "https://sushitimetr.com", kind: "live" },
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "React Native", "Expo", "React"],
    integrations: [],
    components: ["Backend API", "Admin panel", "Mobile application", "Web client"],
    tagline: {
      uz: "To'rt qismli restoran tizimi",
      ru: "Ресторанная система из четырёх частей",
      en: "A four-part restaurant system",
    },
    problem: {
      uz: "Restoran uchun buyurtma va boshqaruv jarayonlarini raqamlashtirish.",
      ru: "Цифровизация процессов заказа и управления для ресторана.",
      en: "Digitising ordering and management for a restaurant.",
    },
    solution: {
      uz: "Backend, admin, mobil va web mijoz qismlarini bitta ekotizimga birlashtirish.",
      ru: "Объединение backend, админки, мобильного и веб-клиента в единую экосистему.",
      en: "Backend, admin panel, mobile app and web client united into one ecosystem.",
    },
    result: {
      uz: "To'rt qismli tizim ishlab turibdi.",
      ru: "Система из четырёх частей работает.",
      en: "All four parts are in production.",
    },
  },
  {
    slug: "zapchasty",
    name: "Zapchasty",
    kind: "mobile",
    year: "2026",
    client: null,
    featured: true,
    // TODO: swap to "/images/projects/zapchasty.webp" once the file is in public/
    cover:
      "https://vjuubkjgs6.ufs.sh/f/ATnCuPXyY61itvP4Op7lcRD4YAzEN6SPXovQgifU1IG20bBt",
    gallery: [],
    links: [
      { label: "zapchasty.uz", href: "https://www.zapchasty.uz", kind: "live" },
    ],
    stack: ["React Native", "Expo", "EAS Build", "Node.js"],
    integrations: [],
    components: ["Mobile application", "Admin panel", "Web frontend"],
    tagline: {
      uz: "Avtomobil ehtiyot qismlari marketplace",
      ru: "Маркетплейс автозапчастей",
      en: "Car spare parts marketplace",
    },
    problem: {
      uz: "Ehtiyot qism izlash va sotib olish jarayoni tarqoq va noqulay.",
      ru: "Поиск и покупка запчастей — процесс разрозненный и неудобный.",
      en: "Finding and buying spare parts is fragmented and inconvenient.",
    },
    solution: {
      uz: "React Native va Expo asosida mobil marketplace ilova.",
      ru: "Мобильное marketplace-приложение на React Native и Expo.",
      en: "A mobile marketplace built with React Native and Expo.",
    },
    result: {
      uz: "Google Play va App Store'da chop etilgan.",
      ru: "Опубликовано в Google Play и App Store.",
      en: "Published on Google Play and the App Store.",
    },
  },
  {
    slug: "kbkm",
    name: "KBKM",
    kind: "web",
    year: "2025",
    client: "Kichik Biznesga Ko'maklashish Markazi",
    featured: false,
    cover: "/images/projects/kbkm.webp",
    gallery: [],
    links: [{ label: "kbkm.uz", href: "https://www.kbkm.uz", kind: "live" }],
    stack: ["Vite", "React", "TypeScript"],
    integrations: [],
    components: [],
    tagline: {
      uz: "Biznesga ko'maklashish markazi sayti",
      ru: "Сайт центра поддержки бизнеса",
      en: "Small business support centre website",
    },
    problem: {
      uz: "Markazga uch tilda, sekin mobil internetda ham tez ochiladigan sayt kerak edi.",
      ru: "Центру нужен был трёхъязычный сайт, который быстро открывается даже на медленном мобильном интернете.",
      en: "The centre needed a trilingual site that opens fast even on slow mobile connections.",
    },
    solution: {
      uz: "Uch til alohida indekslanadigan, mobil-first va tez birinchi renderga optimallashtirilgan sayt.",
      ru: "Сайт с тремя отдельно индексируемыми языками, mobile-first и с быстрой первой отрисовкой.",
      en: "Three separately indexed languages, mobile-first, tuned for fast first paint.",
    },
    result: {
      uz: "Sayt ishlab turibdi — uz, ru va en tillarida.",
      ru: "Сайт работает на uz, ru и en.",
      en: "Live in Uzbek, Russian and English.",
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
    gallery: [],
    links: [{ label: "artsuzani.com", href: "https://artsuzani.com", kind: "live" }],
    stack: ["Next.js 14", "TypeScript", "Stripe", "Sanity CMS"],
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
  {
    slug: "bukhara-suzana",
    name: "Bukhara Suzana",
    kind: "ecommerce",
    year: "2024",
    client: "Bukhara Suzana",
    featured: false,
    cover: "/images/projects/bukhara-suzana.webp",
    gallery: [],
    links: [
      {
        label: "bukhara-suzana.uz",
        href: "https://www.bukhara-suzana.uz",
        kind: "live",
      },
    ],
    stack: ["React", "Tailwind CSS", "Vite"],
    integrations: [],
    components: [],
    tagline: {
      uz: "Hunarmand brendi uchun do'kon",
      ru: "Магазин ремесленного бренда",
      en: "Storefront for an artisan brand",
    },
    problem: {
      uz: "Brendga mahsulotlarini ko'rsatadigan va so'rov qabul qiladigan sayt kerak edi.",
      ru: "Бренду нужен был сайт, показывающий товары и принимающий заявки.",
      en: "The brand needed a site to show products and take enquiries.",
    },
    solution: {
      uz: "Mahsulot galereyasi, dinamik filtr va WhatsApp orqali so'rov oqimi.",
      ru: "Галерея товаров, динамический фильтр и поток заявок через WhatsApp.",
      en: "Product gallery, dynamic filtering and a WhatsApp enquiry flow.",
    },
    result: null,
  },
  {
    slug: "sara-silvers",
    name: "SARA SILVERS",
    kind: "ecommerce",
    year: "2025",
    client: "SARA SILVERS",
    featured: false,
    cover: "/images/projects/sara-silvers.webp",
    gallery: [],
    links: [
      { label: "sarasilvers.uz", href: "https://www.sarasilvers.uz", kind: "live" },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    integrations: [],
    components: [],
    tagline: {
      uz: "Zargarlik brendi uchun onlayn do'kon",
      ru: "Интернет-магазин ювелирного бренда",
      en: "Online store for a jewellery brand",
    },
    problem: {
      uz: "Zargarlik mahsulotini ekranda ham qimmatbaho ko'rsatish kerak edi.",
      ru: "Нужно было показать ювелирные изделия дорого и на экране.",
      en: "Jewellery had to look as valuable on screen as it does in hand.",
    },
    solution: {
      uz: "Mahsulot zoom, silliq sahifa o'tishlari va savat.",
      ru: "Зум товара, плавные переходы между страницами и корзина.",
      en: "Product zoom, smooth page transitions and a cart.",
    },
    result: null,
  },
  {
    slug: "gijduvan-crafts",
    name: "Gijduvan Crafts",
    kind: "web",
    year: "2025",
    client: "Bukhara Handcrafted Ceramics",
    featured: false,
    cover: "/images/projects/gijduvan-crafts.webp",
    gallery: [],
    links: [
      {
        label: "gijduvan-crafts.vercel.app",
        href: "https://gijduvan-crafts.vercel.app",
        kind: "live",
      },
    ],
    stack: ["React", "Tailwind CSS"],
    integrations: [],
    components: [],
    tagline: {
      uz: "Buxoro keramikasi uchun sayt",
      ru: "Сайт бухарской керамики",
      en: "Site for Bukhara handcrafted ceramics",
    },
    problem: {
      uz: "Qo'lda yasalgan keramikani onlayn ko'rsatish kerak edi.",
      ru: "Нужно было показать керамику ручной работы онлайн.",
      en: "Handmade ceramics needed to be shown online.",
    },
    solution: {
      uz: "Skroll animatsiyalari bilan mahsulot galereyasi.",
      ru: "Галерея товаров со скролл-анимациями.",
      en: "A product gallery with scroll animations.",
    },
    result: null,
  },
  {
    slug: "zarina-portfolio",
    name: "Zarina Portfolio",
    kind: "web",
    year: "2025",
    client: "Zarina",
    featured: false,
    cover: "/images/projects/zarina-portfolio.webp",
    gallery: [],
    links: [
      {
        label: "zarina-portfolio-ruby.vercel.app",
        href: "https://zarina-portfolio-ruby.vercel.app",
        kind: "live",
      },
    ],
    stack: ["React", "Tailwind CSS"],
    integrations: [],
    components: [],
    tagline: {
      uz: "Dizayner uchun portfolio sayt",
      ru: "Портфолио-сайт для дизайнера",
      en: "Portfolio site for a designer",
    },
    problem: {
      uz: "Dizaynerga ishlarini ko'rsatadigan o'ziga xos sayt kerak edi.",
      ru: "Дизайнеру нужен был сайт с характером для показа работ.",
      en: "A designer needed a site with character to show work.",
    },
    solution: {
      uz: "Custom kursor va sahifalar orasida silliq o'tishlar.",
      ru: "Кастомный курсор и плавные переходы между страницами.",
      en: "A custom cursor and smooth page transitions.",
    },
    result: null,
  },
  {
    slug: "umidjon-agency",
    name: "Umidjon Agency",
    kind: "business",
    year: "2026",
    client: null,
    featured: false,
    cover: "/images/projects/umidjon-agency.webp",
    gallery: [],
    links: [
      {
        label: "umidjon.agency",
        href: "https://www.umidjon.agency",
        kind: "live",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    integrations: [],
    components: [],
    tagline: {
      uz: "Web va mobil development agentligi",
      ru: "Агентство web- и мобильной разработки",
      en: "Web and mobile development agency",
    },
    problem: {
      uz: "Bizneslar raqamli mahsulotni bir nechta ijrochi orqali qurishga majbur.",
      ru: "Бизнесу приходится собирать продукт у разных исполнителей.",
      en: "Businesses have to assemble a product from several vendors.",
    },
    solution: {
      uz: "Idea'dan deploymentgacha butun jarayon bitta jamoada.",
      ru: "Весь путь от идеи до деплоя внутри одной команды.",
      en: "The whole path from idea to deployment in one team.",
    },
    result: {
      uz: "12 ta tugallangan loyiha, 6 tasi mijoz uchun.",
      ru: "12 завершённых проектов, 6 из них клиентские.",
      en: "12 completed projects, 6 of them for clients.",
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
