import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { projects } from "@/content/projects";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResumePage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResumePage" });

  const skills = {
    frontend: ["Next.js 16", "React 19", "TypeScript", "Jetpack Compose", "Tailwind CSS v4", "Kotlin 2.x"],
    backend: ["Supabase (PostgreSQL)", "Prisma ORM", "Auth.js (NextAuth)", "Dagger Hilt", "Room DB 2.8.4"],
    tools: ["Turborepo", "pnpm workspaces", "Firebase", "Git/GitHub", "Radix UI & shadcn", "Vercel & Resend"],
    ai: [
      "AI-driven Product Planning",
      "Multi-Agent Development",
      "Context Engineering",
      "Prompt Engineering",
      "Documentation Automation",
      "Code Review Assistance",
      "Test Case Generation"
    ],
  };

  return (
    <main className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[450px] w-[450px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="section-shell">
        <AnimatedSection delay={0.05}>
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between pb-8 border-b border-border/20">
            <div>
              <p className="eyebrow">{t("label")}</p>
              <h1 className="font-heading mt-4 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-3 text-lg font-medium text-muted-foreground">{t("subtitle")}</p>
            </div>
            <a
              href="/resume.pdf"
              download
              className={cn(buttonVariants({ size: "lg" }), "shrink-0 rounded-full cursor-pointer gap-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm")}
            >
              <Download className="h-4.5 w-4.5" />
              {t("download")}
            </a>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-8">
            <AnimatedSection delay={0.15}>
              <ResumeSection title={t("summaryTitle")}>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">{t("summaryText")}</p>
              </ResumeSection>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <ResumeSection title={t("skillsTitle")}>
                <div className="grid grid-cols-1 gap-6">
                  <SkillGroup label={t("skillsFrontend")} items={skills.frontend} />
                  <SkillGroup label={t("skillsBackend")} items={skills.backend} />
                  <SkillGroup label={t("skillsTools")} items={skills.tools} />
                  <SkillGroup label={t("skillsAI")} items={skills.ai} />
                </div>
              </ResumeSection>
            </AnimatedSection>
          </div>

          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <ResumeSection title={t("projectsTitle")}>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <ProjectEntry
                      key={project.slug}
                      title={project.title}
                      role={project.role}
                      period={project.timeline}
                      description={project.description}
                      tech={project.techStack}
                      liveUrl={project.liveUrl}
                    />
                  ))}
                </div>
              </ResumeSection>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <ResumeSection title={t("educationTitle")}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-5 rounded-2xl bg-muted/20 border border-border/40 hover:border-primary/20 transition-all duration-300">
                  <div>
                    <p className="font-heading font-bold text-foreground text-base">{t("educationDegree")}</p>
                    <p className="text-sm font-medium text-muted-foreground">{t("educationSchool")}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary">{t("educationPeriod")}</span>
                </div>
              </ResumeSection>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="double-bezel-wrapper h-full">
      <div className="double-bezel-inner h-full flex flex-col">
        <h2 className="font-heading text-lg font-bold text-foreground pb-4 border-b border-border/20 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="group/skill">
      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 transition-colors group-hover/skill:text-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border/50 bg-muted/30 px-3.5 py-1 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground hover:bg-muted/70 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectEntry({
  title,
  role,
  period,
  description,
  tech,
  liveUrl,
}: {
  title: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  liveUrl?: string;
}) {
  return (
    <div className="group rounded-2xl border border-border/40 bg-muted/20 p-5 sm:p-6 transition-all duration-300 hover:bg-muted/40 hover:border-primary/25">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
        <div>
          <p className="font-heading font-bold text-lg text-foreground transition-colors group-hover:text-primary">{title}</p>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-0.5">{role}</p>
        </div>
        <span className="text-sm font-semibold text-primary shrink-0">{period}</span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground mb-4 text-pretty">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-semibold text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <span>Visit Live Site</span>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
}
