import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Download } from "lucide-react";
import { getProjects } from "@/content/projects";
import { profile } from "@/content/profile";
import type { Metadata } from "next";
import { MarginSection, PageHeader } from "@/components/Heading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResumePage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const skills = {
  languages: ["TypeScript", "JavaScript", "Kotlin", "SQL", "Python"],
  backend: [
    "Next.js (App Router / Server Actions)",
    "Node.js",
    "RESTful API",
    "Prisma ORM",
    "Auth.js v5 (NextAuth)",
    "Argon2",
    "Cron Jobs / Automated Endpoints",
  ],
  database: [
    "PostgreSQL (Supabase)",
    "Room Database (FTS4)",
    "DataStore Preferences",
    "Row Level Security (RLS)",
    "Supabase Storage",
    "Triggers & Functions",
  ],
  frontend: [
    "React 19",
    "Jetpack Compose",
    "Material 3",
    "Tailwind CSS v4",
    "shadcn/ui",
    "Radix UI",
    "Dagger Hilt",
    "Coroutines & Flow",
  ],
  tools: [
    "Git & GitHub",
    "Turborepo (Monorepo)",
    "Google ML Kit (OCR)",
    "Android Foreground Service",
    "WorkManager",
    "Postman",
    "Vitest",
    "Playwright",
    "JUnit4",
    "CMS",
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
    <main className="pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="section-shell">
        <PageHeader label={t("label")} title={profile.name} subtitle={t("subtitle")}>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-muted-foreground">
              <li>{t("location")}</li>
              <li>
                <a href={`mailto:${profile.email}`} className="ink-link">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phoneRaw}`} className="ink-link">
                  {profile.phone}
                </a>
              </li>
              <li>
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="ink-link">
                  {profile.githubHandle}
                </a>
              </li>
            </ul>
            <a
              href={profile.resumeUrl}
              download
              className="btn-pill btn-dark shrink-0 self-start md:self-auto"
            >
              <Download className="h-4 w-4" />
              {t("download")}
            </a>
          </div>
        </PageHeader>

        <MarginSection title={t("summaryTitle")}>
          <p className="text-body max-w-[68ch] text-lg leading-[1.75] text-pretty">{t("summaryText")}</p>
        </MarginSection>

        <MarginSection title={t("projectsTitle")}>
          <div className="divide-y divide-border">
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
        </MarginSection>

        <MarginSection title={t("skillsTitle")}>
          <dl className="divide-y divide-border">
            <SkillGroup label={t("skillsLanguages")} items={skills.languages} />
            <SkillGroup label={t("skillsBackend")} items={skills.backend} />
            <SkillGroup label={t("skillsDatabase")} items={skills.database} />
            <SkillGroup label={t("skillsFrontend")} items={skills.frontend} />
            <SkillGroup label={t("skillsTools")} items={skills.tools} />
          </dl>
        </MarginSection>

        <MarginSection title={t("educationTitle")}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="display text-2xl">{t("educationDegree")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("educationSchool")}</p>
              <p className="mt-3 inline-flex rounded-full bg-muted px-3 py-1 text-sm font-semibold tabular-nums">GPA {profile.gpa}</p>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{t("educationPeriod")}</span>
          </div>
        </MarginSection>
      </div>
    </main>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid gap-2 py-4 first:pt-0 sm:grid-cols-[11rem_1fr] sm:gap-6">
      <dt className="text-sm leading-6 font-medium text-muted-foreground">{label}</dt>
      <dd className="text-body text-[15px] leading-relaxed">{items.join(", ")}</dd>
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
    <article className="py-6 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="display text-xl">{title}</h3>
        <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{period}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{role}</p>
      <p className="text-body mt-3 max-w-[68ch] text-[15px] leading-relaxed text-pretty">{description}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tech.join(" · ")}</p>
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ink-link mt-3 inline-flex items-center gap-1 text-[15px] font-semibold"
        >
          {liveLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
}
