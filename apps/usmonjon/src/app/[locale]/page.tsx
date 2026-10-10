import { setRequestLocale } from "next-intl/server";
import { About, Contact, Experience, Hero, Skills, Work } from "@/components/sections";
import { profile, site } from "@/content/profile";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Cloud & DevSecOps Engineer",
    email: `mailto:${profile.contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Bukhara", addressCountry: "UZ" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Bukhara State University" },
    sameAs: [profile.contact.linkedin, profile.contact.telegram],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Contact />
    </>
  );
}
