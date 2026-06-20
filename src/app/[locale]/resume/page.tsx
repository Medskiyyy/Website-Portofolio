import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
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
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <a
          href="/resume.pdf"
          download
          className={cn(buttonVariants(), "gap-2 shrink-0")}
        >
          <Download className="h-4 w-4" />
          {t("download")}
        </a>
      </div>

      <div className="space-y-10">
        {/* Professional Summary */}
        <ResumeSection title={t("summaryTitle")}>
          <p className="text-muted-foreground leading-relaxed">{t("summaryText")}</p>
        </ResumeSection>

        {/* Technical Skills */}
        <ResumeSection title={t("skillsTitle")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SkillGroup label={t("skillsFrontend")} items={skills.frontend} />
            <SkillGroup label={t("skillsBackend")} items={skills.backend} />
            <SkillGroup label={t("skillsTools")} items={skills.tools} />
            <SkillGroup label={t("skillsAI")} items={skills.ai} />
          </div>
        </ResumeSection>

        {/* Projects */}
        <ResumeSection title={t("projectsTitle")}>
          <div className="space-y-6">
            <ProjectEntry
              title="Pempek Cek Lis"
              role={t("projectRole")}
              period="2025"
              description={t("projectDescription")}
              tech={["Next.js", "TypeScript", "Tailwind CSS", "Supabase"]}
              liveUrl="https://pempekceklist.com"
            />
          </div>
        </ResumeSection>

        {/* Education */}
        <ResumeSection title={t("educationTitle")}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <p className="font-semibold text-foreground">{t("educationDegree")}</p>
              <p className="text-sm text-muted-foreground">{t("educationSchool")}</p>
            </div>
            <span className="text-sm text-muted-foreground shrink-0">{t("educationPeriod")}</span>
          </div>
        </ResumeSection>
      </div>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-foreground pb-2 border-b border-border">{title}</h2>
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
            className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
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
    <div className="space-y-2">
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
            className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
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
          className="text-xs text-primary hover:underline"
        >
          {liveUrl}
        </a>
      )}
    </div>
  );
}
