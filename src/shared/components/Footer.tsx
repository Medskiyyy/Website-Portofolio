"use client";

import React from "react";
import { Mail, Github, ArrowUp } from "lucide-react";
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
    <footer className="w-full border-t border-border/30 bg-card/40 py-16">
      <div className="section-shell">
        <div className="grid gap-10 border-b border-border/20 pb-12 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr]">
          <div>
            <Link href="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
              Ahmad.
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("bio")}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <p className="text-xs font-bold tracking-widest text-primary uppercase">
              {t("sitemap")}
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
          <p className="order-2 text-sm text-muted-foreground sm:order-1">
            &copy; {currentYear} {profile.name}. {t("rights")}
          </p>

          <div className="order-1 flex items-center gap-4 sm:order-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              aria-label={t("email")}
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              aria-label={t("github")}
            >
              <Github className="h-4 w-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              aria-label={t("toTop")}
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
