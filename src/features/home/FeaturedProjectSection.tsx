"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ExternalLink, Github } from "lucide-react";
import { projects } from "@/content/projects";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";

export default function FeaturedProjectSection() {
  const t = useTranslations("FeaturedProject");

  return (
    <section className="w-full border-b border-border bg-background py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <Reveal direction="up">
            <p className="eyebrow">{t("label")}</p>
            <h2 className="font-heading mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground lg:justify-self-end">
              {t("intro")}
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          className="grid gap-5 lg:grid-cols-3"
          stagger={0.12}
          amount={0.15}
        >
          {projects.map((project, index) => (
            <StaggerItem
              key={project.slug}
              direction={index === 0 ? "left" : "up"}
              className={cn("h-full", index === 0 && "lg:col-span-2")}
            >
              <article
                className={cn(
                  "surface-card shine-border group flex h-full flex-col overflow-hidden",
                )}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden border-b border-border bg-muted",
                    index === 0 ? "aspect-[16/9]" : "aspect-[16/10]",
                  )}
                >
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
                      sizes={
                        index === 0
                          ? "(max-width: 1024px) 100vw, 66vw"
                          : "(max-width: 1024px) 100vw, 33vw"
                      }
                      priority={project.isFeatured}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      {project.title}
                    </div>
                  )}
                  <div className="shimmer absolute inset-0" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      {project.timeline}
                    </span>
                    <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold leading-snug text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 grid gap-3">
                    {project.results.slice(0, index === 0 ? 2 : 1).map((result) => (
                      <div key={result} className="flex gap-3 text-sm leading-6 text-foreground">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.slice(0, index === 0 ? 5 : 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:border-primary/30 group-hover:text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                    <Link
                      href={`/projects/${project.slug}`}
                      className={cn(buttonVariants({ size: "lg" }), "h-10 cursor-pointer gap-2 px-3 text-sm")}
                    >
                      {t("caseStudy")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "cursor-pointer")}
                        aria-label={`${project.title} ${t("liveDemo")}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "cursor-pointer")}
                        aria-label={`${project.title} GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
