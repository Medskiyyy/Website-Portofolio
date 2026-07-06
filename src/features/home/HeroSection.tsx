"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Download, ExternalLink, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFeaturedProject } from "@/content/projects";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const project = getFeaturedProject();

  const stats = [
    { value: "3", label: t("statProjects") },
    { value: "2", label: t("statPerformance") },
    { value: "1", label: t("statLanguages") },
  ];

  const proofPoints = [
    t("proofProduct"),
    t("proofArchitecture"),
    t("proofDelivery"),
  ];

  return (
    <section className="border-b border-border bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_480px]">
        <div className="flex flex-col items-start">
          <p className="eyebrow">{t("badge")}</p>

          <h1 className="font-heading mt-5 max-w-3xl text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>

          <div className="mt-7 grid gap-3">
            {proofPoints.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm font-medium text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/projects"
              className={cn(buttonVariants({ size: "lg" }), "h-11 cursor-pointer gap-2 px-4 text-sm")}
            >
              {t("ctaProjects")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resume.pdf"
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 cursor-pointer gap-2 px-4 text-sm")}
            >
              {t("ctaResume")}
              <Download className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-3 divide-x divide-border border-y border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="py-5 pr-4 pl-4 first:pl-0">
                <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
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
          </div>
        </div>

        <div className="surface-card overflow-hidden">
          {project?.imageUrl && (
            <div className="relative aspect-[16/11] w-full border-b border-border bg-muted">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          )}
          <div className="p-6">
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
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-200 hover:text-foreground"
              >
                {t("featuredCaseStudy")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
