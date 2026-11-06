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
    <footer className="w-full bg-foreground text-background">
      <div className="section-shell pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Link href="/" className="display text-3xl text-background decoration-1 underline-offset-4 hover:underline">
              Ahmad Hidayatullah
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-background/70">{t("bio")}</p>
          </div>

          <nav className="md:col-span-3" aria-label={t("sitemap")}>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-background/60">{t("sitemap")}</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/85 decoration-1 underline-offset-4 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-background/60">{t("elsewhere")}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-background/85 decoration-1 underline-offset-4 hover:underline"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-background/85 decoration-1 underline-offset-4 hover:underline"
                >
                  {profile.githubHandle}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-background/20 pt-6 font-mono text-xs text-background/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {profile.name}. {t("rights")}
          </p>
          <p>{t("colophon")}</p>
          <button
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-1.5 self-start text-background/80 decoration-1 underline-offset-4 hover:underline sm:self-auto"
          >
            {t("toTop")}
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
