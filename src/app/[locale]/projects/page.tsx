import { getTranslations } from "next-intl/server";
import { projects } from "@/content/projects";
import type { Metadata } from "next";
import ProjectsGrid from "@/features/projects/ProjectsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return (
    <main className="relative overflow-hidden border-b border-border bg-background py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
      <div className="section-shell relative">
        <ProjectsGrid
          projects={projects}
          caseStudyLabel={t("caseStudy")}
          liveDemoLabel={t("liveDemo")}
          emptyLabel={t("empty")}
          title={t("title")}
          eyebrow={t("label")}
          subtitle={t("subtitle")}
        />
      </div>
    </main>
  );
}
