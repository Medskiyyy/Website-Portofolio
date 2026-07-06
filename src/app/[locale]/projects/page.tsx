import { getTranslations } from "next-intl/server";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
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
    <main className="border-b border-border bg-background py-28 md:py-36">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 border-b border-border pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-foreground md:text-6xl">
              {t("title")}
            </h1>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
            {t("subtitle")}
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="surface-card flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] w-full border-b border-border bg-muted">
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
                    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                      {project.title}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
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
                        className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground"
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
                      className={cn(buttonVariants({ size: "lg" }), "h-10 cursor-pointer gap-2 px-3 text-sm")}
                    >
                      {t("caseStudy")}
                      <ArrowRight className="h-4 w-4" />
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
