import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, ExternalLink, MapPin } from "lucide-react";
import { getProjects } from "@/content/projects";
import { profile } from "@/content/profile";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResumePage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

/**
 * Grouped by area rather than by proficiency claim — the resume mirrors the
 * home page skills section, which records where each tool was actually used.
 */
const skills = {
  frontend: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  backend: ["PostgreSQL", "Supabase", "Row-Level Security", "Prisma ORM", "Auth.js", "TanStack Query"],
  mobile: ["Kotlin", "Jetpack Compose", "Room DB", "Dagger Hilt", "WorkManager", "ML Kit"],
  tools: ["Git & GitHub", "Turborepo", "pnpm workspaces", "Vercel", "Resend", "Firebase"],
  practices: [
    "Relational schema design",
    "Feature-first module structure",
    "Clean Architecture (Android)",
    "Incremental static regeneration & caching",
    "Conventional commits",
    "Internationalisation (next-intl)",
  ],
};

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResumePage" });

  return (
    <main className="relative overflow-hidden border-b border-border bg-background py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 ambient-warm-glow opacity-60" />
      <div className="section-shell relative">
        <Reveal delay={0.05}>
          <div className="mb-16 flex flex-col gap-6 border-b border-border/30 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="eyebrow">{t("label")}</p>
              <h1 className="font-heading mt-4 text-4xl font-bold leading-[1.1] text-balance text-foreground sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {t("location")}
                </span>
                <span aria-hidden>·</span>
                <a href={`mailto:${profile.email}`} className="hover:text-foreground hover:underline">
                  {profile.email}
                </a>
                <span aria-hidden>·</span>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground hover:underline"
                >
                  {profile.githubHandle}
                </a>
              </div>
            </div>
            <a
              href={profile.resumeUrl}
              download
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 shrink-0 cursor-pointer gap-2 px-5 text-sm font-semibold active:scale-[0.985]",
              )}
            >
              <Download className="h-4 w-4" />
              {t("download")}
            </a>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-8">
            <Reveal delay={0.15}>
              <ResumeSection title={t("summaryTitle")}>
                <p className="text-base leading-relaxed text-pretty text-muted-foreground">
                  {t("summaryText")}
                </p>
              </ResumeSection>
            </Reveal>

            <Reveal delay={0.25}>
              <ResumeSection title={t("skillsTitle")}>
                <div className="grid grid-cols-1 gap-6">
                  <SkillGroup label={t("skillsFrontend")} items={skills.frontend} />
                  <SkillGroup label={t("skillsBackend")} items={skills.backend} />
                  <SkillGroup label={t("skillsMobile")} items={skills.mobile} />
                  <SkillGroup label={t("skillsTools")} items={skills.tools} />
                  <SkillGroup label={t("skillsPractices")} items={skills.practices} />
                </div>
              </ResumeSection>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal delay={0.2}>
              <ResumeSection title={t("projectsTitle")}>
                <div className="space-y-6">
                  {getProjects(locale).map((project) => (
                    <ProjectEntry
                      key={project.slug}
                      title={project.title}
                      role={project.role}
                      period={project.timeline}
                      description={project.description}
                      tech={project.techStack}
                      liveUrl={project.liveUrl}
                      liveLabel={t("visitLive")}
                    />
                  ))}
                </div>
              </ResumeSection>
            </Reveal>

            <Reveal delay={0.3}>
              <ResumeSection title={t("educationTitle")}>
                <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-heading text-base font-bold text-foreground">
                      {t("educationDegree")}
                    </p>
                    <p className="text-sm text-muted-foreground">{t("educationSchool")}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary font-mono">
                    {t("educationPeriod")}
                  </span>
                </div>
              </ResumeSection>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="h-full rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
      <h2 className="font-heading mb-6 border-b border-border pb-4 text-lg font-bold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold tracking-widest text-primary uppercase">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border bg-muted/30 px-2.5 py-1 text-sm font-medium text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
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
  liveLabel,
}: {
  title: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  liveLabel: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-5 transition-colors duration-200 hover:border-primary/35 sm:p-6">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-bold text-foreground">{title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{role}</p>
        </div>
        <span className="shrink-0 text-sm font-semibold text-primary font-mono">{period}</span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-pretty text-muted-foreground">{description}</p>

      <ul className="mb-4 flex flex-wrap gap-2">
        {tech.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground font-mono"
          >
            {item}
          </li>
        ))}
      </ul>

      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          {liveLabel}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
