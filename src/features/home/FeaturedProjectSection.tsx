"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, ExternalLink, Github, Layers, Smartphone, Store } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import type { Project } from "@/types/project";

/** Only the icon is fixed per project; the label comes from localised copy. */
const categoryIcons: Record<string, React.ElementType> = {
  "pempek-cek-lis": Store,
  synclancer: Layers,
  "hitung-uang": Smartphone,
};

export default function FeaturedProjectSection({ projects }: { projects: Project[] }) {
  const t = useTranslations("FeaturedProject");

  return (
    <section className="w-full border-b border-border/60 bg-transparent py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal direction="up">
            <span className="eyebrow">{t("label")}</span>
            <h2 className="font-heading mt-3 max-w-2xl text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.12}
          amount={0.1}
        >
          {projects.map((project, index) => {
            const CategoryIcon = categoryIcons[project.slug] ?? Layers;

            return (
              <StaggerItem key={project.slug} className="h-full">
                <article className="group surface-card flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs transition-all duration-200 hover:border-primary/50 hover:shadow-md">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted/40">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={`${project.title} interface`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-semibold text-muted-foreground">
                        {project.title}
                      </div>
                    )}
                    <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
                      <CategoryIcon className="h-3.5 w-3.5 text-primary" />
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{project.role}</span>
                      <span aria-hidden>·</span>
                      <span>{project.timeline}</span>
                    </div>

                    <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-xs font-medium text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <Link
                        href={`/projects/${project.slug}`}
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "h-10 cursor-pointer gap-1.5 px-4 text-sm font-semibold active:scale-[0.985]",
                        )}
                      >
                        {t("caseStudy")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "outline", size: "icon-lg" }),
                              "h-10 w-10 cursor-pointer border-border/80 active:scale-[0.985]",
                            )}
                            aria-label={`${t("liveDemo")}: ${project.title}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "outline", size: "icon-lg" }),
                              "h-10 w-10 cursor-pointer border-border/80 active:scale-[0.985]",
                            )}
                            aria-label={`GitHub repository: ${project.title}`}
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
