"use client";

import React from "react";
import { Mail, Github, ArrowUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Navigation");

  const footerLinks = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/resume", label: t("resume") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border/30 bg-card/40 py-16 transition-colors duration-500">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] pb-12 border-b border-border/20">
          <div>
            <Link href="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
              Ahmad.
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Information Systems student and Full Stack Developer focused on building high-performance web products, clean architecture, and deployment-ready workflows.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Sitemap</p>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground order-2 sm:order-1">
            &copy; {currentYear} Ahmad Hidayatullah. All rights reserved.
          </p>

          <div className="flex items-center gap-4 order-1 sm:order-2">
            <a
              href="mailto:hidayatahmadd1377@gmail.com"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors duration-300 shadow-sm"
              aria-label="Email Profile"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors duration-300 shadow-sm"
              aria-label="GitHub Profile"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <button
              onClick={scrollToTop}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors duration-300 shadow-sm cursor-pointer"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
