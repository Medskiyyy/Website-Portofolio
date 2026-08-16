"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, ExternalLink, Github, Layers, Smartphone, Store, Timer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import type { Project } from "@/types/project";

type ProjectsGridProps = {
  projects: Project[];
  caseStudyLabel: string;
  liveDemoLabel: string;
  emptyLabel: string;
  title: string;
  eyebrow: string;
  subtitle: string;
};

/** Only the icon is fixed per project; the label comes from localised copy. */
const categoryIcons: Record<string, React.ElementType> = {
  "pempek-cek-lis": Store,
  synclancer: Layers,
  mother: Timer,
  "hitung-uang": Smartphone,
};

export default function ProjectsGrid({
  projects,
  caseStudyLabel,
  liveDemoLabel,
  emptyLabel,
  title,
  eyebrow,
  subtitle,
}: ProjectsGridProps) {
  return (
    <>
      <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-border/40 pb-8 lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {projects.length > 0 ? (
        <StaggerGroup
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
          amount={0.1}
        >
          {projects.map((project, index) => {
            const CategoryIcon = categoryIcons[project.slug] ?? Layers;
            const isPortrait = project.aspectRatio === "portrait";

            return (
              <StaggerItem key={project.slug} className="h-full">
                <article className="group surface-card flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-md">
                  {/* Dynamic Project Thumbnail (Landscape vs Portrait Phone Mockup) */}
                  {isPortrait ? (
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden border-b border-border/60 bg-muted/30 flex items-center justify-center p-3">
                      {/* Ambient soft glow */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="h-44 w-32 rounded-full bg-primary/25 blur-2xl" />
                      </div>

                      {/* Sleek Android device frame mockup (exact 9:20 aspect ratio) */}
                      <div className="relative z-10 h-full aspect-[9/20] rounded-[20px] border-[3px] border-border/90 bg-background shadow-md overflow-hidden flex flex-col transition-transform duration-500 group-hover:scale-[1.03]">
                        {/* Camera punch-hole */}
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 h-2 w-2 rounded-full bg-foreground/30 pointer-events-none" />
                        <div className="relative flex-1 w-full h-full overflow-hidden">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={`${project.title} interface`}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 768px) 180px, 220px"
                              priority={index === 0}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm font-semibold text-muted-foreground">
                              {project.title}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
                        <CategoryIcon className="h-3.5 w-3.5 text-primary" />
                        {project.category}
                      </span>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted">
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
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{project.role}</span>
                      <span aria-hidden>·</span>
                      <span>{project.timeline}</span>
                    </div>

                    <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h2>
                    <p className="mt-2.5 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border/40 pt-5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-xs font-medium text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                      {project.techStack.length > 4 && (
                        <li className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-xs font-medium text-muted-foreground">
                          +{project.techStack.length - 4}
                        </li>
                      )}
                    </ul>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <Link
                        href={`/projects/${project.slug}`}
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "h-10 cursor-pointer gap-1.5 px-4 text-sm font-semibold active:scale-[0.985]",
                        )}
                      >
                        {caseStudyLabel}
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
                            aria-label={`${liveDemoLabel}: ${project.title}`}
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
      ) : (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <p>{emptyLabel}</p>
        </div>
      )}
    </>
  );
}
