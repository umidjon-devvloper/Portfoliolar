import Image from "next/image";
import { ArrowUpRight, Mail, Phone, Send, Linkedin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { ports, skillGroups } from "@/content/skills";
import { pick } from "@/lib/locale";
import { ContactForm } from "./contact-form";
import { Monogram } from "./monogram";
import { PortScan } from "./port-scan";

function Section({
  id,
  heading,
  children,
  aside,
}: {
  id: string;
  heading: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-seam">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[17rem_1fr] lg:gap-16">
        <div>
          <h2
            id={`${id}-heading`}
            className="font-display text-2xl font-semibold tracking-tight sm:text-3xl lg:sticky lg:top-24"
          >
            {heading}
          </h2>
          {aside}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-24">
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(2.6rem,7.5vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            {profile.firstName}
            <br />
            <span className="text-fog">{profile.lastName}</span>
          </h1>
          <p className="mt-7 text-lg font-medium sm:text-xl">
            {t("role")}
            <span className="text-fog"> / {t("secondary")}</span>
          </p>
          <p className="mt-4 max-w-[34rem] text-fog">{t("lead")}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-sm bg-signal px-5 py-3 font-medium text-signal-ink transition-colors hover:bg-frost"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-seam px-5 py-3 font-medium transition-colors hover:border-fog"
            >
              {t("ctaSecondary")}
              <ArrowUpRight aria-hidden className="size-4 text-fog" />
            </a>
          </div>
        </div>

        <PortScan
          label={t("scanLabel")}
          start={t("scanStart")}
          done={t("scanDone", profile.metrics)}
          rows={ports.map((p) => ({
            port: p.port,
            service: p.service,
            label: pick(p.label, locale),
          }))}
        />
      </div>
    </section>
  );
}

export async function About() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "about" });

  const facts: [string, string][] = [
    [t("location"), t("locationValue")],
    [
      t("education"),
      `${pick(profile.education.institution, locale)}, ${profile.education.from}–${profile.education.to}`,
    ],
    [t("focus"), t("focusValue")],
    [t("projects"), profile.metrics.projects],
    [t("years"), t("yearsValue", { years: profile.metrics.years })],
  ];

  return (
    <Section
      id="about"
      heading={t("heading")}
      aside={
        <div className="mt-8 hidden lg:block">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={`${profile.firstName} ${profile.lastName}`}
              width={224}
              height={224}
              className="size-28 border border-seam object-cover"
            />
          ) : (
            <Monogram size="lg" />
          )}
        </div>
      }
    >
      <div className="max-w-[40rem] space-y-5 text-lg leading-relaxed sm:text-xl">
        <p>{t("p1")}</p>
        <p className="text-fog">{t("p2")}</p>
        <p className="text-fog">{t("p3")}</p>
      </div>
      <dl className="mt-12 grid max-w-[40rem] border-t border-seam text-[0.95rem]">
        {facts.map(([term, value]) => (
          <div key={term} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-seam py-3">
            <dt className="text-fog">{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export async function Experience() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "experience" });

  return (
    <Section id="experience" heading={t("heading")}>
      <ol className="relative max-w-[44rem] border-l border-seam">
        {experience.map((job) => (
          <li key={job.id} className="relative pb-14 pl-8 last:pb-0">
            <span
              aria-hidden
              className={
                job.current
                  ? "absolute -left-[5px] top-2 size-[9px] bg-signal"
                  : "absolute -left-[5px] top-2 size-[9px] border border-fog bg-bastion"
              }
            />
            <p className="font-mono text-sm text-fog">
              {pick(job.from, locale)} — {job.to ? pick(job.to, locale) : t("now")}
              {job.current && <span className="sr-only">, {t("current")}</span>}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
              {pick(job.role, locale)}
            </h3>
            <p className="mt-1 text-fog">{pick(job.org, locale)}</p>
            <p className="mt-4">{pick(job.summary, locale)}</p>
            <ul className="mt-4 space-y-2 text-fog">
              {job.duties.map((duty) => (
                <li key={duty.en} className="flex gap-3">
                  <span aria-hidden className="mt-[0.75em] h-[2px] w-3 shrink-0 bg-seam" />
                  {pick(duty, locale)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export async function Work() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <Section
      id="work"
      heading={t("heading")}
      aside={<p className="mt-4 max-w-[17rem] text-fog lg:sticky lg:top-44">{t("note")}</p>}
    >
      <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <a href={project.href} target="_blank" rel="noreferrer" className="group block">
              <div className="relative aspect-[16/10] overflow-hidden border border-seam bg-hull">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-semibold tracking-tight">{project.name}</h3>
                <span className="font-mono text-sm text-fog">{project.year}</span>
              </div>
              <p className="mt-1 text-fog">{pick(project.tagline, locale)}</p>
              <p className="mt-3 text-sm text-fog">{project.stack.join(", ")}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
                {t("open")}: {project.hrefLabel}
                <ArrowUpRight aria-hidden className="size-4" />
              </p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export async function Skills() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "skills" });

  return (
    <Section id="skills" heading={t("heading")}>
      <div className="grid gap-10 sm:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.id}>
            <h3 className="border-b border-seam pb-3 font-medium">{t(group.id)}</h3>
            <ul className="mt-4 space-y-2 text-fog">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export async function Contact() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "contact" });
  const c = profile.contact;

  const channels = [
    { label: t("email"), value: c.email, href: `mailto:${c.email}`, icon: Mail },
    { label: t("telegram"), value: c.telegramHandle, href: c.telegram, icon: Send },
    { label: t("phone"), value: c.phoneDisplay, href: `tel:${c.phone}`, icon: Phone },
    { label: t("linkedin"), value: c.linkedinHandle, href: c.linkedin, icon: Linkedin },
  ];

  return (
    <Section id="contact" heading={t("heading")}>
      <div className="grid gap-12 xl:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="max-w-[30rem] text-lg">{t("lead")}</p>
          <ul className="mt-8 border-t border-seam">
            {channels.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-4 border-b border-seam py-4 transition-colors hover:text-signal"
                >
                  <Icon aria-hidden className="size-5 shrink-0 text-fog" />
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    <span className="sr-only">{label}: </span>
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm
          labels={{
            name: t("name"),
            email: t("emailField"),
            message: t("message"),
            messagePlaceholder: t("messagePlaceholder"),
            send: t("send"),
            sending: t("sending"),
            success: t("success"),
            error: t("error"),
          }}
        />
      </div>
    </Section>
  );
}
