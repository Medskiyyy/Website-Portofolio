import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, ArrowLeft, CheckCircle2, Lightbulb, Rocket } from "lucide-react";
import type { Metadata } from "next";

import AnimatedSection from "@/components/AnimatedSection";

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
    <main className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[450px] w-[450px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="section-shell">
        <AnimatedSection delay={0.05}>
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 mb-8 cursor-pointer gap-2 rounded-full hover:bg-secondary")}
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </AnimatedSection>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <AnimatedSection delay={0.1}>
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-border/50 bg-muted/40 px-3.5 py-1 text-xs font-semibold text-muted-foreground capitalize">
                  {project.status}
                </span>
                <span className="rounded-full border border-border/50 bg-muted/40 px-3.5 py-1 text-xs font-semibold text-muted-foreground">
                  {project.role}
                </span>
                <span className="rounded-full border border-border/50 bg-muted/40 px-3.5 py-1 text-xs font-semibold text-muted-foreground">
                  {project.timeline}
                </span>
              </div>

              <h1 className="font-heading text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl text-balance leading-[1.05]">
                {project.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                {project.description}
              </p>
            </div>
          </AnimatedSection>

          {project.imageUrl && (
            <AnimatedSection delay={0.15}>
              <div className="double-bezel-wrapper p-1 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-border/20 shadow-xl overflow-hidden hover:border-primary/20 transition-all duration-750">
                <div className="relative aspect-video overflow-hidden rounded-[calc(2rem-4px)] bg-muted/30">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 52vw"
                  />
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>

        <AnimatedSection delay={0.2}>
          <div className="mt-12 flex flex-col gap-6 border-y border-border/20 py-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border/50 bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground"
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
                  className={cn(buttonVariants({ size: "lg" }), "group h-14 rounded-full pl-8 pr-2 text-base shadow-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-95")}
                >
                  {t("liveDemo")}
                  <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 group-hover:translate-x-1">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group h-14 rounded-full px-8 text-base bg-background/40 backdrop-blur-md hover:border-primary/45 hover:-translate-y-0.5 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <AnimatedSection delay={0.25} className="h-full">
            <SummaryCard title={t("problem")} text={project.problem} />
          </AnimatedSection>
          <AnimatedSection delay={0.3} className="h-full">
            <SummaryCard title={t("goal")} text={project.goal} />
          </AnimatedSection>
          <AnimatedSection delay={0.35} className="h-full">
            <SummaryCard title={t("solution")} text={project.solution} />
          </AnimatedSection>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-8">
            <AnimatedSection delay={0.4}>
              <Section title={t("overview")}>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">{project.overview}</p>
              </Section>
            </AnimatedSection>
            <AnimatedSection delay={0.45}>
              <Section title={t("architecture")}>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">{project.architecture}</p>
              </Section>
            </AnimatedSection>
          </aside>

          <div className="space-y-8">
            <AnimatedSection delay={0.42}>
              <ListSection title={t("results")} icon="rocket" items={project.results} />
            </AnimatedSection>
            <AnimatedSection delay={0.48}>
              <ListSection title={t("challenges")} icon="check" items={project.challenges} />
            </AnimatedSection>
            <AnimatedSection delay={0.52}>
              <ListSection title={t("lessonsLearned")} icon="lightbulb" items={project.lessonsLearned} />
            </AnimatedSection>
            <AnimatedSection delay={0.56}>
              <Section title={t("futureImprovements")}>
                <ul className="grid gap-3">
                  {project.futureImprovements.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 rounded-2xl border border-border/40 bg-muted/20 p-4 transition-all duration-300 hover:bg-muted/40 hover:border-primary/25 group">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="double-bezel-wrapper h-full">
      <section className="double-bezel-inner h-full p-6 sm:p-8 flex flex-col">
        <h2 className="font-heading mb-6 border-b border-border/20 pb-4 text-xl font-bold text-foreground">
          {title}
        </h2>
        {children}
      </section>
    </div>
  );
}

function SummaryCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="double-bezel-wrapper h-full">
      <section className="double-bezel-inner h-full p-6 sm:p-8">
        <h2 className="font-heading text-xl font-bold text-foreground pb-4 border-b border-border/20 mb-4">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{text}</p>
      </section>
    </div>
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
          <li key={item} className="flex items-start gap-4 rounded-2xl border border-border/40 bg-muted/20 p-4 transition-all duration-300 hover:bg-muted/40 hover:border-primary/25 group">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-sm leading-relaxed text-muted-foreground text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
