"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*
   * While the mobile menu is open it behaves as a modal dialog: page scroll is
   * locked, Escape closes it, focus moves inside, and Tab cycles within the
   * overlay instead of reaching the page behind it.
   */
  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        overlay?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!overlay?.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/resume", label: t("resume") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const nextLocale = currentLocale === "en" ? "id" : "en";

  /** "/" only matches exactly; every other link also matches its subroutes. */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const menuVariants: Variants = {
    closed: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 8 },
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
          isScrolled || isOpen
            ? "border-border bg-background/92 backdrop-blur-md"
            : "border-transparent bg-background"
        }`}
      >
        <div className="section-shell flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="display relative z-50 text-xl leading-none transition-colors hover:text-primary"
          >
            Ahmad Hidayatullah
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group inline-flex items-baseline gap-1.5 text-sm transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[0.65rem] text-primary">
                    {String(i).padStart(2, "0")}
                  </span>
                  <span
                    className={`decoration-primary decoration-1 underline-offset-[6px] ${
                      active ? "underline" : "group-hover:underline"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href={pathname}
              locale={nextLocale}
              className="flex h-9 items-center gap-1 px-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              aria-label={t("switchLanguage")}
            >
              <span className={currentLocale === "id" ? "text-foreground" : undefined}>ID</span>
              <span aria-hidden>/</span>
              <span className={currentLocale === "en" ? "text-foreground" : undefined}>EN</span>
            </Link>

            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label={t("toggleTheme")}
            >
              {/* Swapped by CSS rather than a mounted flag: next-themes puts
                  `.dark` on <html> before paint, so there is nothing to
                  hydrate and no icon flash. */}
              <Moon className="h-4 w-4 dark:hidden" />
              <Sun className="hidden h-4 w-4 dark:block" />
            </button>
          </div>

          {/* Mobile Toggle with Morph Hamburger animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center text-foreground md:hidden"
            aria-expanded={isOpen}
            aria-label={t("menu")}
          >
            <div className="relative h-4 w-5">
              <span className={`absolute left-0 top-[1px] block h-[1.5px] w-full bg-current transition-all duration-300 ease-out ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7.5px] block h-[1.5px] w-full bg-current transition-all duration-200 ease-out ${isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} />
              <span className={`absolute bottom-[1px] left-0 block h-[1.5px] w-full bg-current transition-all duration-300 ease-out ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            className="fixed inset-0 z-40 flex h-[100dvh] w-full flex-col bg-background px-5 pt-24 pb-10 md:hidden"
          >
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-1 flex-col"
            >
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.div key={link.href} variants={itemVariants} className="border-b border-border">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="font-mono text-xs text-primary">
                        {String(i).padStart(2, "0")}
                      </span>
                      <span className={`display text-4xl ${active ? "italic text-primary" : ""}`}>
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants} className="mt-auto flex items-center gap-3 font-mono text-xs">
                <Link
                  href={pathname}
                  locale={nextLocale}
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 items-center gap-2 border border-foreground px-4"
                  aria-label={t("switchLanguage")}
                >
                  <span className={currentLocale === "id" ? "text-foreground" : "text-muted-foreground"}>ID</span>
                  <span aria-hidden className="text-muted-foreground">/</span>
                  <span className={currentLocale === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
                </Link>
                <button
                  onClick={() => {
                    setTheme(resolvedTheme === "dark" ? "light" : "dark");
                    setIsOpen(false);
                  }}
                  className="flex h-11 items-center gap-2 border border-foreground px-4"
                >
                  <Moon className="h-4 w-4 dark:hidden" />
                  <Sun className="hidden h-4 w-4 dark:block" />
                  <span className="dark:hidden">{t("darkMode")}</span>
                  <span className="hidden dark:inline">{t("lightMode")}</span>
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
