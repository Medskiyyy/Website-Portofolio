"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Download, ExternalLink, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFeaturedProject } from "@/content/projects";
import { Counter, EASE_OUT, Magnetic } from "@/components/motion";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const project = getFeaturedProject();

  const stats = [
    { value: 3, label: t("statProjects") },
    { value: 2, label: t("statPerformance") },
    { value: 1, label: t("statLanguages") },
  ];

  const proofPoints = [
    t("proofProduct"),
    t("proofArchitecture"),
    t("proofDelivery"),
  ];

  return (
    <section className="relative overflow-hidden border-b border-border bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      {/* aurora mesh + grid backdrops */}
      <div className="pointer-events-none absolute inset-0 aurora-mesh opacity-70" />
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />

      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_480px]">
        <div className="flex flex-col items-start">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            {t("badge")}
          </motion.p>

          <motion.h1
            className="font-heading mt-5 max-w-3xl text-5xl font-bold leading-[1.05] text-balance text-gradient sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.08 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className="mt-7 grid gap-3"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.32 } },
            }}
          >
            {proofPoints.map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE_OUT } },
                }}
                className="flex items-start gap-3 text-sm font-medium text-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 }}
          >
            <Magnetic strength={0.25}>
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 cursor-pointer gap-2 px-4 text-sm",
                )}
              >
                {t("ctaProjects")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="/resume.pdf"
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 cursor-pointer gap-2 px-4 text-sm",
                )}
              >
                {t("ctaResume")}
                <Download className="h-4 w-4" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mt-10 grid w-full max-w-2xl grid-cols-3 divide-x divide-border border-y border-border"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.62 } },
            }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
                }}
                className="py-5 pr-4 pl-4 first:pl-0"
              >
                <Counter
                  value={stat.value}
                  className="font-heading text-3xl font-bold text-foreground"
                />
                <p className="mt-1 text-xs font-semibold text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.85 }}
          >
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            {project?.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                {t("featuredLive")}
              </a>
            )}
          </motion.div>
        </div>

        {/* Featured card — parallax tilt on hover */}
        <motion.div
          className="surface-card shine-border group relative overflow-hidden"
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.4 }}
          whileHover={{ y: -6 }}
        >
          {project?.imageUrl && (
            <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-border bg-muted">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="shimmer absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          )}
          <div className="relative p-6">
            <p className="eyebrow">{t("featuredLabel")}</p>
            <h2 className="font-heading mt-3 text-2xl font-bold text-foreground">
              {project?.title ?? t("featuredFallbackTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {project?.description ?? t("featuredFallbackDesc")}
            </p>
            {project && (
              <div className="mt-5 grid gap-3 border-t border-border pt-5">
                {project.results.slice(0, 2).map((result) => (
                  <div key={result} className="flex gap-3 text-sm leading-6 text-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            )}
            {project && (
              <Link
                href={`/projects/${project.slug}`}
                className="group/link mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-200 hover:text-foreground"
              >
                {t("featuredCaseStudy")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
