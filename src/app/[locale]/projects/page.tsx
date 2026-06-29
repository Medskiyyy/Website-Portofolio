import { getTranslations } from "next-intl/server";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink, Github, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return (
    <main className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="section-shell">
        <AnimatedSection delay={0.05}>
          <div className="mb-16 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end pb-8 border-b border-border/20">
            <div>
              <p className="eyebrow">{t("label")}</p>
              <h1 className="font-heading mt-4 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
                {t("title")}
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <AnimatedSection key={project.slug} delay={0.1 + idx * 0.08} className="h-full">
                <div className="double-bezel-wrapper h-full group">
                  <article className="double-bezel-inner h-full flex flex-col justify-between overflow-hidden p-0 gap-0 border-none">
                    <div>
                      {/* Image container */}
                      <div className="relative h-52 w-full bg-muted/30 overflow-hidden rounded-t-[calc(2rem-7px)]">
                        {project.imageUrl ? (
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            priority={project.isFeatured}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                          </div>
                        )}
                        <span className="absolute left-4 top-4 rounded-full border border-foreground/10 bg-background/80 px-3 py-1 text-[10px] font-bold capitalize text-foreground backdrop-blur-md shadow-sm">
                          {project.status}
                        </span>
                      </div>

                      {/* Content details */}
                      <div className="p-6 sm:p-8">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <h2 className="font-heading text-xl font-bold text-card-foreground">
                            {project.title}
                          </h2>
                          <span className="shrink-0 text-xs font-semibold text-muted-foreground">{project.timeline}</span>
                        </div>
                        
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 mb-6 text-pretty">
                          {project.description}
                        </p>
                        
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-4">
                          {project.role}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions bar */}
                    <div className="flex items-center justify-between border-t border-border/10 p-5 mt-auto">
                      <Link
                        href={`/projects/${project.slug}`}
                        className={cn(buttonVariants({ size: "sm" }), "rounded-full cursor-pointer gap-1.5 text-xs group/btn transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]")}
                      >
                        {t("caseStudy")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                      </Link>
                      
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-9 w-9 rounded-full cursor-pointer hover:border-primary/50 hover:text-primary transition-all duration-300 shadow-sm")}
                            title={t("liveDemo")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-9 w-9 rounded-full cursor-pointer hover:border-primary/50 hover:text-primary transition-all duration-300 shadow-sm")}
                            title="GitHub"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <p>{t("empty")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
