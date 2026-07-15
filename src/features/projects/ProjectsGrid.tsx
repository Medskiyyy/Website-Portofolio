"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StaggerGroup, StaggerItem, TextReveal } from "@/components/motion";
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
      <div className="mb-12 grid gap-6 border-b border-border pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-heading mt-4 text-5xl font-bold leading-[1.05] text-balance text-gradient md:text-6xl">
            <TextReveal text={title} />
          </h1>
        </div>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
          {subtitle}
        </p>
      </div>

      {projects.length > 0 ? (
        <StaggerGroup
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
          stagger={0.11}
          amount={0.1}
        >
          {projects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <article className="surface-card shine-border group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority={project.isFeatured}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                      {project.title}
                    </div>
                  )}
                  <div className="shimmer absolute inset-0" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold capitalize text-muted-foreground">
                      {project.status}
                    </span>
                    <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      {project.timeline}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold leading-snug text-foreground">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    {project.role}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:border-primary/30 group-hover:text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-6">
                    <Link
                      href={`/projects/${project.slug}`}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "h-10 cursor-pointer gap-2 px-3 text-sm",
                      )}
                    >
                      {caseStudyLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "icon-lg" }),
                          "cursor-pointer",
                        )}
                        aria-label={`${project.title} ${liveDemoLabel}`}
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
                          "cursor-pointer",
                        )}
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
      ) : (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <p>{emptyLabel}</p>
        </div>
      )}
    </>
  );
}
