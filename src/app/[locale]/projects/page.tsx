import { getTranslations } from "next-intl/server";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, BookOpen } from "lucide-react";
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
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Thumbnail placeholder */}
              <div className="h-44 bg-muted flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-muted-foreground/40" />
              </div>

              <div className="flex flex-col flex-1 p-5 gap-4">
                {/* Title + description */}
                <div className="flex-1">
                  <h2 className="font-bold text-card-foreground mb-1">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 border-t border-border">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "gap-1.5 flex-1 justify-center text-xs"
                      )}
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
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "gap-1.5 flex-1 justify-center text-xs"
                      )}
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "gap-1.5 flex-1 justify-center text-xs"
                    )}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    {t("caseStudy")}
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
    </main>
  );
}
