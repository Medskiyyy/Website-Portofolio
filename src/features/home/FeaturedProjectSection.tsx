import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ExternalLink, Github, BookOpen, TrendingUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFeaturedProject } from "@/content/projects";

export default function FeaturedProjectSection() {
  const t = useTranslations("FeaturedProject");
  const project = getFeaturedProject();
  if (!project) return null;

  return (
    <section className="w-full py-20">
      <div className="section-shell">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {t("intro")}
          </p>
        </div>

        <article className="surface-card grid overflow-hidden rounded-lg lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[320px] bg-muted">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center">
                <BookOpen className="h-10 w-10 text-muted-foreground/40" />
              </div>
            )}
            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-zinc-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {project.timeline} / {project.role}
            </div>
          </div>

          <div className="flex flex-col p-6 md:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="font-heading text-3xl font-bold tracking-tight text-card-foreground">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-6 grid gap-3">
              {project.results.slice(0, 2).map((result) => (
                <div key={result} className="flex items-start gap-3 rounded-md border border-border bg-muted/35 p-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm leading-5 text-muted-foreground">{result}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm" }), "cursor-pointer gap-2")}
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("liveDemo")}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer gap-2")}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "cursor-pointer gap-2")}
              >
                <BookOpen className="h-4 w-4" />
                {t("caseStudy")}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
