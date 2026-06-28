"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { Globe, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/resume", label: t("resume") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const nextLocale = currentLocale === "en" ? "id" : "en";

  const menuVariants: Variants = {
    closed: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <>
      <header className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isScrolled 
          ? "border-primary/20 bg-background/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-3xl py-0.5" 
          : "border-border/40 bg-background/50 shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-xl"
      }`}>
        <div className="flex h-14 items-center justify-between px-2 sm:px-4">
          <div className="pl-3">
            <Link 
              href="/" 
              className="font-heading text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
            >
              Ahmad.
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-secondary/80 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center md:flex pr-1">
            <Link
              href={pathname}
              locale={nextLocale}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Switch Language"
            >
              <Globe className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Theme"
            >
              {mounted && (resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
            </button>
          </div>

          {/* Mobile Toggle with Morph Hamburger animation */}
          <div className="flex items-center pr-1 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-secondary text-foreground transition-all duration-300"
              aria-expanded={isOpen}
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`absolute left-0 top-[1px] block w-full h-[1.5px] bg-current transition-all duration-300 ease-out ${isOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                <span className={`absolute left-0 top-[7.5px] block w-full h-[1.5px] bg-current transition-all duration-200 ease-out ${isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} />
                <span className={`absolute left-0 bottom-[1px] block w-full h-[1.5px] bg-current transition-all duration-300 ease-out ${isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 h-[100dvh] w-full bg-background/80 md:hidden flex flex-col justify-center px-8"
          >
            <motion.nav 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-6"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-heading font-medium tracking-tight ${
                        isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants} className="mt-8 flex items-center gap-4">
                <Link
                  href={pathname}
                  locale={nextLocale}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm font-medium"
                >
                  <Globe className="h-4 w-4" />
                  {currentLocale === "en" ? "ID" : "EN"}
                </Link>
                <button
                  onClick={() => {
                    setTheme(resolvedTheme === "dark" ? "light" : "dark");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm font-medium"
                >
                  {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {mounted && resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
