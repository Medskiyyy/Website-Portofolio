"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Layers, Smartphone, Globe, Terminal, ShieldCheck } from "lucide-react";
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

  const proofPoints = [
    t("proofProduct"),
    t("proofArchitecture"),
    t("proofDelivery"),
  ];

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background grid + ambient backlight */}
      <div className="pointer-events-none absolute inset-0 aurora-mesh opacity-80" />
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />

      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            {t("badge")}
          </motion.div>

          <motion.h1
            className="font-heading mt-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.08 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.18 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
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
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.45 }}
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

        {/* Clean Engineering Overview Card (Replaces redundant Pempek preview card) */}
        <motion.div
          className="surface-card relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-6 shadow-lg lg:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
        >
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">engineering_stack.ts</span>
          </div>

          <div className="mt-6 space-y-4 font-mono text-xs leading-relaxed">
            <div className="rounded-lg border border-border/40 bg-muted/30 p-4">
              <p className="font-semibold text-primary">// Full-Stack Web Development</p>
              <p className="mt-1 text-muted-foreground">Next.js 16 App Router · React 19 · TypeScript</p>
              <p className="text-muted-foreground">Supabase PostgreSQL · Prisma ORM · Tailwind CSS v4</p>
            </div>

            <div className="rounded-lg border border-border/40 bg-muted/30 p-4">
              <p className="font-semibold text-primary">// Native Android Development</p>
              <p className="mt-1 text-muted-foreground">Kotlin 2.x · Jetpack Compose · Offline-First</p>
              <p className="text-muted-foreground">Room Persistence DB · Dagger Hilt · Google ML Kit</p>
            </div>
          </div>

          <div className="mt-6 space-y-2.5 border-t border-border/60 pt-5">
            {proofPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 font-sans font-medium">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
