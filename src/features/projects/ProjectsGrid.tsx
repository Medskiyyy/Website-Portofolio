"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, ExternalLink, Github, Layers, Smartphone, Store } from "lucide-react";
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
  const projectBadges: Record<string, { label: string; icon: React.ElementType }> = {
    "pempek-cek-lis": { label: "Web Storefront & CMS", icon: Store },
    synclancer: { label: "Multi-Tenant SaaS", icon: Layers },
    "hitung-uang": { label: "Offline-First Android", icon: Smartphone },
  };

  return (
    <>
      <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-border/40 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <TextReveal text={title} />
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {projects.length > 0 ? (
        <StaggerGroup
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
          amount={0.1}
        >
          {projects.map((project, index) => {
            const badge = projectBadges[project.slug] || { label: project.role, icon: Layers };
            const CategoryIcon = badge.icon;

            return (
              <StaggerItem key={project.slug} className="h-full">
                <article className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-semibold text-muted-foreground">
                        {project.title}
                      </div>
                    )}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-background/20 bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md">
                        <CategoryIcon className="h-3.5 w-3.5 text-primary" />
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-primary">{project.role}</span>
                      <span>{project.timeline}</span>
                    </div>

                    <h2 className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <Link
                        href={`/projects/${project.slug}`}
                        className={cn(
                          buttonVariants({ size: "sm" }),
                          "h-9 cursor-pointer gap-1.5 px-3.5 text-xs font-semibold shadow-none",
                        )}
                      >
                        {caseStudyLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "outline", size: "icon-sm" }),
                              "h-9 w-9 cursor-pointer border-border/80 transition-colors hover:border-primary/50",
                            )}
                            title={liveDemoLabel}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "outline", size: "icon-sm" }),
                              "h-9 w-9 cursor-pointer border-border/80 transition-colors hover:border-primary/50",
                            )}
                            title="GitHub Repository"
                          >
                            <Github className="h-3.5 w-3.5" />
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
