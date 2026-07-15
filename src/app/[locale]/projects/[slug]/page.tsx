import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, projects } from "@/content/projects";
import type { Metadata } from "next";
import ProjectDetailClient from "@/features/projects/ProjectDetailClient";

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
    <main className="relative overflow-hidden border-b border-border bg-background py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
      <div className="section-shell relative">
        <ProjectDetailClient
          project={project}
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
