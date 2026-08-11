import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
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
    alternates: {
      canonical: "/",
      languages: {
        uz: "/",
        ru: "/ru",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: site.domain,
      title: t("title"),
      description: t("description"),
      url: site.url,
      locale,
      images: [{ url: site.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [site.ogImage],
    },
    robots: {
      index: true,
      follow: true,
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

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName ?? profile.firstName,
    givenName: profile.firstName,
    jobTitle: profile.role,
    description: t("description"),
    url: site.url,
    image: profile.avatar,
    email: contact.email,
    telephone: contact.phone,
    birthDate: profile.birthDate,
    address: location
      ? {
          "@type": "PostalAddress",
          addressLocality: location.city,
          addressRegion: location.region,
          addressCountry: location.countryCode,
        }
      : undefined,
    alumniOf: education
      ? { "@type": "CollegeOrUniversity", name: education.institution }
      : undefined,
    knowsLanguage: ["uz", "ru", "en"],
    sameAs: [
      contact.github,
      contact.linkedin,
      contact.telegram,
      contact.instagram,
      contact.agency,
    ].filter((item) => item !== null),
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <ScrollProgress />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
