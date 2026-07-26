"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/components/motion";
import { profile } from "@/content/profile";

const techBadges = ["Next.js", "TypeScript", "Postgres & Supabase", "Kotlin & Compose"];

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Single ambient backdrop — the grid alone, no stacked glows. */}
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />

      <div className="section-shell relative z-10">
        <div className="flex w-full max-w-4xl flex-col items-start">
          {/* Availability — the one thing a recruiter needs to know first */}
          <motion.p
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary" />
            {t("availability")}
          </motion.p>

          <motion.h1
            className="font-heading mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.06 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.14 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.22 }}
          >
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 cursor-pointer gap-2.5 px-7 text-sm font-semibold",
              )}
            >
              {t("ctaProjects")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={profile.resumeUrl}
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 cursor-pointer gap-2 border-border/80 px-7 text-sm font-semibold",
              )}
            >
              {t("ctaResume")}
              <Download className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            className="mt-12 flex w-full flex-wrap items-center gap-2.5 border-t border-border/50 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35 }}
          >
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              {t("githubLink")}
            </a>
            {techBadges.map((name) => (
              <span
                key={name}
                className="rounded-lg border border-border/40 bg-muted/40 px-3 py-2 text-sm font-medium text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
