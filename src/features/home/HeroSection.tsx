"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Download, Github, Mail, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export default function HeroSection() {
  const t = useTranslations("Hero");
  const stats = [
    { value: "3+", label: t("statProjects") },
    { value: "90+", label: t("statPerformance") },
    { value: "2", label: t("statLanguages") },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <motion.div 
        className="section-shell grid min-h-[min(calc(100dvh-10rem),800px)] items-center gap-16 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col items-start">
          <motion.div variants={fadeUpVariants} className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t("badge")}
          </motion.div>

          <motion.h1 variants={fadeUpVariants} className="font-heading max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-[5.5rem] lg:text-[6rem]">
            {t("title")}
          </motion.h1>

          <motion.p variants={fadeUpVariants} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={fadeUpVariants} className="mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
            <Link
              href="/projects"
              className={cn(buttonVariants({ size: "lg" }), "group h-14 rounded-full pl-8 pr-2 text-base shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.15)] active:scale-95")}
            >
              {t("ctaProjects")}
              <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 dark:bg-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-background/30">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
            <a
              href="/resume.pdf"
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group h-14 rounded-full px-8 text-base bg-background/50 backdrop-blur-md transition-all hover:-translate-y-1 active:scale-95")}
            >
              {t("ctaResume")}
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </a>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mt-16 w-full max-w-md">
            <div className="grid grid-cols-3 divide-x divide-border/40 rounded-[2rem] border border-border/40 bg-card/40 p-2 backdrop-blur-sm">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center p-4">
                  <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border/50 group-hover:border-foreground/20 transition-colors">
                <Github className="h-4 w-4" />
              </div>
              <span className="tracking-wide">GitHub</span>
            </a>
            <a
              href="mailto:hidayatahmadd1377@gmail.com"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border/50 group-hover:border-foreground/20 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <span className="tracking-wide">Email</span>
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="relative mt-12 md:mt-0"
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Double-Bezel Architecture */}
          <div className="relative mx-auto max-w-md w-full rounded-[2.5rem] border border-border/30 bg-black/5 dark:bg-white/5 p-2.5 sm:p-3 shadow-2xl">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[calc(2.5rem-10px)] bg-muted shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <Image
                src="/profile.jpg"
                alt="Ahmad Hidayatullah"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">Ahmad Hidayatullah</h3>
                    <p className="mt-1.5 text-sm font-medium text-white/70">{t("profileRole")}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white ring-1 ring-white/20">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {t("profileBadge")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
