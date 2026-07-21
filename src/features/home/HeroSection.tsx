"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Layers, Smartphone, Globe, Terminal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE_OUT, Magnetic } from "@/components/motion";

export default function HeroSection() {
  const t = useTranslations("Hero");

  const techBadges = [
    { name: "Next.js 16", icon: Globe },
    { name: "Supabase & Prisma", icon: Layers },
    { name: "Kotlin & Jetpack Compose", icon: Smartphone },
    { name: "TypeScript", icon: Terminal },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Engineering grid backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />

      <div className="section-shell relative">
        <div className="flex max-w-3xl flex-col items-start">
          <motion.h1
            className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.22 }}
          >
            <Magnetic strength={0.2}>
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 cursor-pointer gap-2 px-5 text-sm font-semibold shadow-sm transition-all hover:bg-primary/90",
                )}
              >
                {t("ctaProjects")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="/resume.pdf"
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 cursor-pointer gap-2 border-border/80 px-5 text-sm font-semibold transition-colors hover:border-primary/50",
                )}
              >
                {t("ctaResume")}
                <Download className="h-4 w-4" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35 }}
          >
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub Profile
            </a>
            {techBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <span
                  key={badge.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {badge.name}
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
