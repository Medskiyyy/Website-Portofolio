import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { projects } from "@/content/projects";
import type { Metadata } from "next";

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
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
    backend: ["Supabase", "PostgreSQL", "REST API", "Authentication"],
    tools: ["Git", "GitHub", "Docker", "Figma", "Vercel"],
    ai: ["ChatGPT", "Gemini CLI", "AI-Assisted Development"],
  };

  return (
    <main className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <a
            href="/resume.pdf"
            download
            className={cn(buttonVariants(), "shrink-0 cursor-pointer gap-2")}
          >
            <Download className="h-4 w-4" />
            {t("download")}
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-8">
            <ResumeSection title={t("summaryTitle")}>
              <p className="leading-7 text-muted-foreground">{t("summaryText")}</p>
            </ResumeSection>

            <ResumeSection title={t("skillsTitle")}>
              <div className="grid grid-cols-1 gap-6">
                <SkillGroup label={t("skillsFrontend")} items={skills.frontend} />
                <SkillGroup label={t("skillsBackend")} items={skills.backend} />
                <SkillGroup label={t("skillsTools")} items={skills.tools} />
                <SkillGroup label={t("skillsAI")} items={skills.ai} />
              </div>
            </ResumeSection>
          </div>

          <div className="space-y-8">
            <ResumeSection title={t("projectsTitle")}>
              <div className="space-y-5">
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

            <ResumeSection title={t("educationTitle")}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-foreground">{t("educationDegree")}</p>
                  <p className="text-sm text-muted-foreground">{t("educationSchool")}</p>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">{t("educationPeriod")}</span>
              </div>
            </ResumeSection>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-card space-y-4 rounded-lg p-5">
      <h2 className="font-heading text-lg font-bold text-foreground pb-2 border-b border-border">{title}</h2>
      {children}
    </section>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
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
    <div className="rounded-md border border-border bg-muted/35 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        <span className="text-sm text-muted-foreground shrink-0">{period}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
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
          className="text-xs font-medium text-primary hover:underline"
        >
          {liveUrl}
        </a>
      )}
    </div>
  );
}
