"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { profile } from "@/content/profile";

/** Local time in Bekasi, so a visitor can tell at a glance whether a reply is likely soon. */
const subscribeToClock = (tick: () => void) => {
  const id = setInterval(tick, 15000);
  return () => clearInterval(id);
};

function LocalClock() {
  const locale = useLocale();
  const time = useSyncExternalStore(
    subscribeToClock,
    () =>
      new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: profile.timeZone,
      }).format(new Date()),
    () => null,
  );

  return (
    <span className="block text-[13px] font-medium text-muted-foreground tabular-nums">
      {profile.city}
      {time && <> · {time} WIB</>}
    </span>
  );
}

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
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
          isScrolled || isOpen ? "bg-background/90 backdrop-blur-md" : "bg-background"
        }`}
      >
        <div className="section-shell flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-full bg-muted text-[13px] font-semibold text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)]"
            >
              AH
            </span>
            <span className="leading-tight">
              <span className="block font-semibold">{profile.name}</span>
              <LocalClock />
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.slice(0, 4).map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                    active
                      ? "bg-muted text-foreground"
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
              className="flex h-9 items-center gap-1 px-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label={t("switchLanguage")}
            >
              <span className={currentLocale === "id" ? "text-foreground" : undefined}>ID</span>
              <span aria-hidden>/</span>
              <span className={currentLocale === "en" ? "text-foreground" : undefined}>EN</span>
            </Link>

            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={t("toggleTheme")}
            >
              {/* Swapped by CSS rather than a mounted flag: next-themes puts
                  `.dark` on <html> before paint, so there is nothing to
                  hydrate and no icon flash. */}
              <Moon className="h-4 w-4 dark:hidden" />
              <Sun className="hidden h-4 w-4 dark:block" />
            </button>

            <Link href="/contact" className="btn-pill btn-dark ml-1 h-10">
              {t("contactCta")}
            </Link>
          </div>

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
            className="fixed inset-0 z-40 flex h-[100dvh] w-full flex-col bg-background px-5 pt-28 pb-10 md:hidden"
          >
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-1 flex-col"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`display block py-2.5 text-[2.5rem] leading-tight transition-colors ${
                        active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants} className="mt-auto flex items-center gap-3 text-sm font-medium">
                <Link
                  href={pathname}
                  locale={nextLocale}
                  onClick={() => setIsOpen(false)}
                  className="btn-pill btn-outline"
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
                  className="btn-pill btn-outline"
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
