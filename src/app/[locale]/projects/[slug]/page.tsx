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
    <main className="py-16 md:py-24">
      <div className="section-shell">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 mb-8 cursor-pointer gap-2")}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-md border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
                {project.status}
              </span>
              <span className="rounded-md border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {project.role}
              </span>
              <span className="rounded-md border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {project.timeline}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {project.description}
            </p>
          </div>

          {project.imageUrl && (
            <div className="surface-card relative aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-6 border-y border-border py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "cursor-pointer gap-2")}
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
                className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer gap-2")}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <SummaryCard title={t("problem")} text={project.problem} />
          <SummaryCard title={t("goal")} text={project.goal} />
          <SummaryCard title={t("solution")} text={project.solution} />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="space-y-4">
            <Section title={t("overview")}>
              <p className="text-sm leading-6 text-muted-foreground">{project.overview}</p>
            </Section>
            <Section title={t("architecture")}>
              <p className="text-sm leading-6 text-muted-foreground">{project.architecture}</p>
            </Section>
          </aside>

          <div className="space-y-8">
            <ListSection title={t("results")} icon="rocket" items={project.results} />
            <ListSection title={t("challenges")} icon="check" items={project.challenges} />
            <ListSection title={t("lessonsLearned")} icon="lightbulb" items={project.lessonsLearned} />
            <Section title={t("futureImprovements")}>
              <ul className="grid gap-3">
                {project.futureImprovements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-md border border-border bg-card p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-card rounded-lg p-5">
      <h2 className="font-heading mb-4 border-b border-border pb-3 text-lg font-bold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SummaryCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="surface-card rounded-lg p-5">
      <h2 className="font-heading text-lg font-bold text-foreground">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
    </section>
  );
}

function ListSection({
  title,
  icon,
  items,
}: {
  title: string;
  icon: "rocket" | "check" | "lightbulb";
  items: string[];
}) {
  const Icon = icon === "rocket" ? Rocket : icon === "check" ? CheckCircle2 : Lightbulb;

  return (
    <Section title={title}>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-md border border-border bg-muted/35 p-4">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm leading-6 text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
