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
    <section className="w-full py-32 md:py-40">
      <motion.div 
        className="section-shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              {t("label")}
            </div>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </div>

        {/* Double-Bezel Architecture */}
        <div className="group relative rounded-[2rem] border border-border/40 bg-black/5 dark:bg-white/5 p-2 sm:p-3 shadow-xl transition-all duration-500 hover:shadow-2xl">
          <article className="relative grid overflow-hidden rounded-[calc(2rem-8px)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[400px] bg-muted/50 overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              ) : (
                <div className="flex h-full min-h-[400px] items-center justify-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                {project.timeline} / {project.role}
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className="mb-8 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-8 grid gap-4">
                {project.results.slice(0, 2).map((result) => (
                  <div key={result} className="flex items-start gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 transition-colors hover:bg-muted/40">
                    <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium leading-relaxed text-foreground/80">{result}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/btn relative flex h-14 items-center justify-between overflow-hidden rounded-full bg-primary pl-8 pr-2 text-primary-foreground transition-all hover:scale-[0.98] active:scale-95 sm:w-auto"
                >
                  <span className="font-semibold">{t("caseStudy")}</span>
                  <div className="ml-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
                
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-border/50 bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary active:scale-95"
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
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-border/50 bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary active:scale-95"
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
