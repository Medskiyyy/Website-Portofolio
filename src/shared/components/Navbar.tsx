"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";

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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/75 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/75 transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Logo & Availability Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link 
            href="/" 
            className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition-opacity"
          >
            Ahmad H.
          </Link>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t("available")}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-50 ${
                  isActive 
                    ? "text-zinc-900 dark:text-zinc-50 font-semibold" 
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Utilities (Theme & Lang Switcher) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <Link
            href={pathname}
            locale={nextLocale}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Switch Language"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{localeLabel}</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors"
            aria-label="Toggle Theme"
          >
            {mounted && (resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            ))}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle for mobile header */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors"
            aria-label="Toggle Theme"
          >
            {mounted && (resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            ))}
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors"
            aria-expanded={isOpen}
            aria-label="Main Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 h-[calc(100vh-4rem)] w-full bg-white dark:bg-zinc-950 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-4 p-6 border-t border-zinc-100 dark:border-zinc-900">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium py-2 border-b border-zinc-100 dark:border-zinc-900 transition-colors ${
                    isActive 
                      ? "text-zinc-900 dark:text-zinc-50 font-bold" 
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Language Switcher in Mobile Drawer */}
            <Link
              href={pathname}
              locale={nextLocale}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-md py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
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
