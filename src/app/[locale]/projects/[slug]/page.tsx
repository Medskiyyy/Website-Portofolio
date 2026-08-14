import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, projectSlugs } from "@/content/projects";
import type { Metadata } from "next";
import ProjectDetailClient from "@/features/projects/ProjectDetailClient";

export async function generateStaticParams() {
  const locales = ["en", "id"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of projectSlugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjectBySlug(locale, slug);
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
  const project = getProjectBySlug(locale, slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "ProjectDetail" });

  const statusKey = {
    live: "statusLive",
    "source available": "statusSourceAvailable",
    "in-progress": "statusInProgress",
    planned: "statusPlanned",
  }[project.status];

  return (
    <main className="relative overflow-hidden border-b border-border bg-transparent py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 ambient-warm-glow opacity-70" />
      <div className="section-shell relative">
        <ProjectDetailClient
          project={project}
          statusLabel={t(statusKey)}
          inDevelopmentLabel={t("inDevelopment")}
          back={t("back")}
          liveDemo={t("liveDemo")}
          overview={t("overview")}
          problem={t("problem")}
          goal={t("goal")}
          solution={t("solution")}
          architecture={t("architecture")}
          challenges={t("challenges")}
          results={t("results")}
          lessonsLearned={t("lessonsLearned")}
          futureImprovements={t("futureImprovements")}
        />
      </div>
    </main>
  );
}
