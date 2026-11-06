import type { Metadata, Viewport } from "next";
import { Great_Vibes, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { alternates } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const signature = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-signature",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
  colorScheme: "dark light",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("title"),
      template: `%s — ${profile.firstName}`,
    },
    description: t("description"),
    authors: [{ name: profile.fullName ?? profile.firstName, url: site.url }],
    creator: profile.fullName ?? profile.firstName,
    alternates: alternates("/", locale),
    openGraph: {
      type: "website",
      siteName: site.domain,
      title: t("title"),
      description: t("description"),
      url: site.url,
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      /* images intentionally omitted — [locale]/opengraph-image.tsx renders them per route */
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      /* images intentionally omitted — Next.js emits twitter:image from opengraph-image.tsx */
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: "JZICUs3_lRU4_aEoFgEDn_FnWo8cySs7OtE3tfMFIJM",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : undefined,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const { contact, location, education } = profile;

  const personId = `${site.url}#person`;
  const organizationId = `${site.url}#organization`;
  const websiteId = `${site.url}#website`;

  const sameAs = [
    contact.github,
    contact.linkedin,
    contact.telegram,
    contact.instagram,
    contact.agency,
  ].filter((item): item is string => Boolean(item));

  const postalAddress = location
    ? {
        "@type": "PostalAddress",
        addressLocality: location.city,
        addressRegion: location.region,
        addressCountry: location.countryCode,
      }
    : undefined;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: profile.fullName ?? profile.firstName,
    givenName: profile.firstName,
    jobTitle: profile.role,
    description: t("description"),
    url: site.url,
    image: profile.avatar ? `${site.url}${profile.avatar}` : undefined,
    email: contact.email,
    telephone: contact.phone,
    birthDate: profile.birthDate,
    address: postalAddress,
    alumniOf: education
      ? { "@type": "CollegeOrUniversity", name: education.institution }
      : undefined,
    knowsLanguage: ["uz", "ru", "en"],
    worksFor: contact.agency ? { "@id": organizationId } : undefined,
    sameAs,
  };

  /* Sitelinks search box + brand signal. */
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: t("title"),
    description: t("description"),
    inLanguage: ["uz", "ru", "en"],
    publisher: { "@id": personId },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/work?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  /* Agency entity, so the brand shows up as its own thing in results. */
  const organizationJsonLd = contact.agency
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": organizationId,
        name: "Umidjon Agency",
        url: contact.agency,
        logo: `${site.url}/images/brands/umidjon-agency.webp`,
        founder: { "@id": personId },
        sameAs: [contact.agency].filter(Boolean),
      }
    : undefined;

  /* Local-SEO: Tashkent-based service — ranks on geo queries. */
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}#service`,
    name: `${profile.firstName} — ${profile.role}`,
    description: t("description"),
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    priceRange: "$$",
    telephone: contact.phone,
    email: contact.email,
    address: postalAddress,
    areaServed: [
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "City", name: location?.city ?? "Tashkent" },
    ],
    serviceType: [
      "Web development",
      "Mobile app development",
      "SaaS development",
      "E-commerce development",
      "UI/UX design",
    ],
    provider: { "@id": personId },
    sameAs,
  };

  const graph = [
    personJsonLd,
    websiteJsonLd,
    professionalServiceJsonLd,
    organizationJsonLd,
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${signature.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Sidebar />
            <div className="flex min-h-dvh flex-col lg:pl-[var(--sidebar)]">
              <TopBar />
              <main className="flex-1 pb-20 lg:pb-0 lg:pt-10">{children}</main>
              <Footer />
            </div>
            <BottomNav />
          </NextIntlClientProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
