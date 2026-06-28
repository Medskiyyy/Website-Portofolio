"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ExternalLink, Github, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { getFeaturedProject } from "@/content/projects";
import { motion } from "framer-motion";

export default function FeaturedProjectSection() {
  const t = useTranslations("FeaturedProject");
  const project = getFeaturedProject();
  if (!project) return null;

  return (
    <section className="w-full py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-1/3 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

      <motion.div 
        className="section-shell"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {t("label")}
            </div>
            <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl text-balance leading-[1.05]">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            {t("intro")}
          </p>
        </div>

        {/* Double-Bezel Architecture */}
        <div className="group relative rounded-[2.5rem] border border-border/20 bg-black/5 dark:bg-white/5 p-2 sm:p-3 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-2xl hover:border-primary/20">
          <article className="relative grid overflow-hidden rounded-[calc(2.5rem-8px)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[420px] bg-muted/30 overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03] group-hover:rotate-[0.5deg]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              ) : (
                <div className="flex h-full min-h-[420px] items-center justify-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent opacity-80" />
              
              <div className="absolute left-6 top-6 rounded-full border border-foreground/10 bg-background/80 px-4 py-1.5 text-[10px] font-bold tracking-widest text-foreground uppercase backdrop-blur-md shadow-sm">
                {project.timeline} / {project.role}
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <div className="mb-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/50 bg-muted/40 px-3.5 py-1 text-xs font-semibold tracking-wide text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="font-heading text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
                {project.description}
              </p>

              <div className="mt-6 grid gap-3">
                {project.results.slice(0, 2).map((result) => (
                  <div key={result} className="flex items-center gap-3.5 rounded-2xl border border-border/40 bg-muted/20 p-4 transition-all duration-300 hover:bg-muted/40">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold leading-relaxed text-foreground/80">{result}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/btn relative flex h-14 items-center justify-between overflow-hidden rounded-full bg-primary pl-8 pr-2 text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] active:scale-95 sm:w-auto"
                >
                  <span className="font-semibold text-sm">{t("caseStudy")}</span>
                  <div className="ml-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/25 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-1 group-hover/btn:scale-105">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
                
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-border/50 bg-card transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-primary/50 hover:text-primary active:scale-95 shadow-sm"
                      aria-label={t("liveDemo")}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-border/50 bg-card transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-primary/50 hover:text-primary active:scale-95 shadow-sm"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </motion.div>
    </section>
  );
}
