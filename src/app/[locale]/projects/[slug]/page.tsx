import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, ExternalLink, Github, Lightbulb, Rocket } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const locales = ["en", "id"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
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
    <main className="border-b border-border bg-background py-28 md:py-36">
      <div className="section-shell">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 mb-8 cursor-pointer gap-2")}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <header className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground capitalize">
                {project.status}
              </span>
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {project.role}
              </span>
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {project.timeline}
              </span>
            </div>

            <h1 className="font-heading text-5xl font-bold leading-tight text-foreground md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {project.description}
            </p>
          </div>

          {project.imageUrl && (
            <div className="surface-card overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
              </div>
            </div>
          )}
        </header>

        <div className="mt-10 flex flex-col gap-5 border-y border-border py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground"
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
                className={cn(buttonVariants({ size: "lg" }), "h-10 cursor-pointer gap-2 px-3 text-sm")}
              >
                {t("liveDemo")}
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 cursor-pointer gap-2 px-3 text-sm")}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          <SummaryCard title={t("problem")} text={project.problem} />
          <SummaryCard title={t("goal")} text={project.goal} />
          <SummaryCard title={t("solution")} text={project.solution} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-5">
            <TextSection title={t("overview")} text={project.overview} />
            <TextSection title={t("architecture")} text={project.architecture} />
          </div>

          <div className="space-y-5">
            <ListSection title={t("results")} icon="rocket" items={project.results} />
            <ListSection title={t("challenges")} icon="check" items={project.challenges} />
            <ListSection title={t("lessonsLearned")} icon="lightbulb" items={project.lessonsLearned} />
            <ListSection title={t("futureImprovements")} icon="check" items={project.futureImprovements} ordered />
          </div>
        </section>
      </div>
    </main>
  );
}

function TextSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="surface-card p-5 md:p-6">
      <h2 className="font-heading border-b border-border pb-4 text-xl font-bold text-foreground">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-muted-foreground">{text}</p>
    </section>
  );
}

function SummaryCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="surface-card p-5 md:p-6">
      <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
    </section>
  );
}

function ListSection({
  title,
  icon,
  items,
  ordered = false,
}: {
  title: string;
  icon: "rocket" | "check" | "lightbulb";
  items: string[];
  ordered?: boolean;
}) {
  const Icon = icon === "rocket" ? Rocket : icon === "check" ? CheckCircle2 : Lightbulb;

  return (
    <section className="surface-card p-5 md:p-6">
      <h2 className="font-heading border-b border-border pb-4 text-xl font-bold text-foreground">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-background text-xs font-bold text-primary">
              {ordered ? index + 1 : <Icon className="h-4 w-4" />}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
