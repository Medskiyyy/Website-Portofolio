"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const nav = useTranslations("Navigation");
  const t = useTranslations("Footer");

  const footerLinks = [
    { href: "/", label: nav("home") },
    { href: "/projects", label: nav("projects") },
    { href: "/resume", label: nav("resume") },
    { href: "/about", label: nav("about") },
    { href: "/contact", label: nav("contact") },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full">
      <div className="section-shell">
        <div className="grid gap-10 border-t border-border pt-12 pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Link href="/" className="flex items-center gap-3 font-semibold">
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-full bg-muted text-[13px] font-semibold text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)]"
              >
                AH
              </span>
              {profile.name}
            </Link>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">{t("bio")}</p>
          </div>

          <nav className="md:col-span-3" aria-label={t("sitemap")}>
            <p className="text-sm font-semibold">{t("sitemap")}</p>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold">{t("elsewhere")}</p>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-muted-foreground transition-colors hover:text-foreground"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {profile.githubHandle}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {profile.name}. {t("rights")}
          </p>
          <p>{t("colophon")}</p>
          <button
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-1.5 self-start font-medium transition-colors hover:text-foreground sm:self-auto"
          >
            {t("toTop")}
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
