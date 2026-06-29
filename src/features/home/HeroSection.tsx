"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Download, Github, Mail } from "lucide-react";
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
      {/* Dark mode/light mode ambient decorative glow orbs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[130px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-[280px] w-[280px] rounded-full bg-primary/8 blur-[100px] opacity-50 pointer-events-none" />

      <motion.div 
        className="section-shell grid min-h-[min(calc(100dvh-10rem),800px)] items-center gap-16 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col items-start">
          <motion.h1 variants={fadeUpVariants} className="font-heading max-w-2xl text-5xl font-bold leading-[1.05] tracking-[-0.03em] md:tracking-[-0.04em] text-foreground sm:text-6xl md:text-[5.5rem] lg:text-[6rem] text-balance">
            {t("title")}
          </motion.h1>

          <motion.p variants={fadeUpVariants} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={fadeUpVariants} className="mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
            <Link
              href="/projects"
              className={cn(buttonVariants({ size: "lg" }), "group h-14 rounded-full pl-8 pr-2 text-base shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_8px_25px_0_rgba(0,0,0,0.12)] active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]")}
            >
              {t("ctaProjects")}
              <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 dark:bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105 group-hover:bg-background/30">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
            <a
              href="/resume.pdf"
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group h-14 rounded-full px-8 text-base bg-background/40 backdrop-blur-md hover:-translate-y-0.5 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]")}
            >
              {t("ctaResume")}
              <Download className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mt-16 w-full max-w-md">
            {/* Double-Bezel for stats block */}
            <div className="double-bezel-wrapper p-1 rounded-3xl bg-black/5 dark:bg-white/5 border border-border/20 shadow-md">
              <div className="grid grid-cols-3 divide-x divide-border/20 rounded-[calc(1.5rem-2px)] bg-card/60 p-1.5 backdrop-blur-sm">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center p-3 sm:p-4">
                    <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border/50 group-hover:border-primary/50 group-hover:text-primary transition-colors duration-300">
                <Github className="h-4 w-4" />
              </div>
              <span className="tracking-wide">GitHub</span>
            </a>
            <a
              href="mailto:hidayatahmadd1377@gmail.com"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border/50 group-hover:border-primary/50 group-hover:text-primary transition-colors duration-300">
                <Mail className="h-4 w-4" />
              </div>
              <span className="tracking-wide">Email</span>
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="relative mt-12 md:mt-0"
          initial={{ opacity: 0, scale: 0.95, rotate: -1.5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Subtle floating animation container */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            {/* Double-Bezel Architecture */}
            <div className="relative mx-auto max-w-md w-full rounded-[2.5rem] border border-border/30 bg-black/5 dark:bg-white/5 p-2.5 sm:p-3 shadow-2xl">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[calc(2.5rem-10px)] bg-muted shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <Image
                  src="/profile.jpg"
                  alt="Ahmad Hidayatullah"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent dark:from-background/90" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">Ahmad Hidayatullah</h3>
                      <p className="mt-1.5 text-sm font-medium text-muted-foreground">{t("profileRole")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
