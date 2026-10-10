import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/content/nav";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo-mark";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <LogoMark className="h-7 w-7" />
          <p className="max-w-[16rem] text-xs leading-relaxed text-muted">
            {tf("tagline")}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
            >
              {t(item.id)}
            </Link>
          ))}
        </nav>
      </Container>

      <Container className="border-t border-border py-5">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.domain}. {tf("rights")}
        </p>
      </Container>
    </footer>
  );
}
