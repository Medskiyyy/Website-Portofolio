"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { BriefcaseBusiness, Globe, Menu, Moon, Sun, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Avoid hydration mismatch by rendering theme toggle only after mount
  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (active) {
        setMounted(true);
      }
    }, 0);
    return () => {
      active = false;
    };
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/resume", label: t("resume") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const nextLocale = currentLocale === "en" ? "id" : "en";
  const localeLabel = currentLocale === "en" ? "ID" : "EN";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/88 backdrop-blur-xl transition-colors duration-200">
      <div className="section-shell flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link 
            href="/" 
            className="font-heading text-base font-bold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            Ahmad H.
          </Link>
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t("available")}
          </span>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/80 p-1 shadow-sm md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-secondary text-secondary-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={pathname}
            locale={nextLocale}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            aria-label="Switch Language"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{localeLabel}</span>
          </Link>

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="cursor-pointer rounded-md border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            aria-label="Toggle Theme"
          >
            {mounted && (resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            ))}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="cursor-pointer rounded-md border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle Theme"
          >
            {mounted && (resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            ))}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer rounded-md border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-expanded={isOpen}
            aria-label="Main Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 h-[calc(100vh-4rem)] w-full border-t border-border bg-background md:hidden animate-fade-in">
          <nav className="section-shell flex flex-col gap-2 py-6">
            <div className="mb-3 flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <BriefcaseBusiness className="h-4 w-4" />
              {t("available")}
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-3 py-3 text-base font-medium transition-colors ${
                    isActive 
                      ? "bg-secondary text-secondary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href={pathname}
              locale={nextLocale}
              onClick={() => setIsOpen(false)}
              className="mt-3 flex items-center gap-2 rounded-md border border-border bg-card px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              <span>Switch to {currentLocale === "en" ? "Bahasa Indonesia" : "English"}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
