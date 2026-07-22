"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ExternalLink, Github, Layers, Smartphone, Store } from "lucide-react";
import { projects } from "@/content/projects";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, StaggerGroup, StaggerItem, TiltCard, SpotlightCard } from "@/components/motion";

export default function FeaturedProjectSection() {
  const t = useTranslations("FeaturedProject");

  const projectBadges: Record<string, { label: string; icon: React.ElementType }> = {
    "pempek-cek-lis": { label: "Web Storefront & CMS", icon: Store },
    synclancer: { label: "Multi-Tenant SaaS", icon: Layers },
    "hitung-uang": { label: "Offline-First Android", icon: Smartphone },
  };

  return (
    <section className="w-full border-b border-border/60 bg-background py-20 md:py-28 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="section-shell relative z-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal direction="up">
            <span className="eyebrow">{t("label")}</span>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
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
            const badge = projectBadges[project.slug] || { label: project.role, icon: Layers };
            const CategoryIcon = badge.icon;

            return (
              <StaggerItem key={project.slug} className="h-full">
                <TiltCard maxTilt={6} className="h-full">
                  <SpotlightCard className="h-full rounded-2xl border border-border/80 bg-card/90 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl shadow-black/5">
                    <article className="group flex h-full flex-col overflow-hidden">
                      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted">
                        {project.imageUrl ? (
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index === 0}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm font-semibold text-muted-foreground">
                            {project.title}
                          </div>
                        )}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-background/20 bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md shadow-sm">
                            <CategoryIcon className="h-3.5 w-3.5 text-primary" />
                            {badge.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-semibold text-primary">{project.role}</span>
                          <span className="font-mono text-[11px]">{project.timeline}</span>
                        </div>

                        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>

                        <div className="mt-4 space-y-2 border-t border-border/40 pt-4">
                          {project.results.slice(0, 2).map((result) => (
                            <div key={result} className="flex gap-2 text-xs leading-normal text-foreground/90">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                              <span>{result}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                          <Link
                            href={`/projects/${project.slug}`}
                            className={cn(
                              buttonVariants({ size: "sm" }),
                              "h-9 cursor-pointer gap-1.5 px-4 text-xs font-semibold shadow-none group-hover:bg-primary/90",
                            )}
                          >
                            {t("caseStudy")}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>

                          <div className="flex items-center gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  buttonVariants({ variant: "outline", size: "icon-sm" }),
                                  "h-9 w-9 cursor-pointer border-border/80 transition-colors hover:border-primary/50 hover:bg-muted",
                                )}
                                title={t("liveDemo")}
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
                                  "h-9 w-9 cursor-pointer border-border/80 transition-colors hover:border-primary/50 hover:bg-muted",
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
                  </SpotlightCard>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
