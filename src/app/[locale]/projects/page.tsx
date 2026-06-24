import { getTranslations } from "next-intl/server";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink, Github, BookOpen } from "lucide-react";
import type { Metadata } from "next";

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
    <main className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("title")}
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="surface-card group flex overflow-hidden rounded-lg transition-colors duration-200 hover:border-primary/35 lg:flex-col"
              >
                <div className="relative h-56 w-full bg-muted">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority={project.isFeatured}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-zinc-950/80 px-2.5 py-1 text-[11px] font-semibold capitalize text-white backdrop-blur-md">
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h2 className="font-heading text-xl font-bold text-card-foreground">
                        {project.title}
                      </h2>
                      <span className="shrink-0 text-xs font-medium text-muted-foreground">{project.timeline}</span>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {project.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 border-t border-border pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer gap-1.5 text-xs")}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t("liveDemo")}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "cursor-pointer gap-1.5 text-xs")}
                      >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className={cn(buttonVariants({ size: "sm" }), "ml-auto cursor-pointer gap-1.5 text-xs")}
                    >
                      {t("caseStudy")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
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
