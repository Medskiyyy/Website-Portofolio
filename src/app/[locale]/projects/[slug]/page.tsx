import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, ArrowLeft, CheckCircle2, Lightbulb, Rocket } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "ProjectDetail" });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Back link */}
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "gap-2 mb-8 -ml-2"
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        {t("back")}
      </Link>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
            {project.status}
          </span>
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {project.role}
          </span>
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {project.timeline}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "gap-2")}
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
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Project Image */}
      {project.imageUrl && (
        <div className="relative aspect-video w-full rounded-2xl border border-border bg-muted overflow-hidden mb-12 shadow-sm">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-border mb-12" />

      {/* Content sections */}
      <div className="space-y-12">
        <Section title={t("overview")}>
          <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
        </Section>

        <Section title={t("problem")}>
          <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
        </Section>

        <Section title={t("goal")}>
          <p className="text-muted-foreground leading-relaxed">{project.goal}</p>
        </Section>

        <Section title={t("solution")}>
          <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
        </Section>

        <Section title={t("architecture")}>
          <p className="text-muted-foreground leading-relaxed">{project.architecture}</p>
        </Section>

        <Section title={t("challenges")}>
          <ul className="space-y-3">
            {project.challenges.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("results")}>
          <ul className="space-y-3">
            {project.results.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("lessonsLearned")}>
          <ul className="space-y-3">
            {project.lessonsLearned.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("futureImprovements")}>
          <ul className="space-y-3">
            {project.futureImprovements.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground mt-0.5 shrink-0">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
        {title}
      </h2>
      {children}
    </section>
  );
}
