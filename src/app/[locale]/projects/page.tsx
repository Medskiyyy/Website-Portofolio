import { getTranslations } from "next-intl/server";
import { getProjects } from "@/content/projects";
import type { Metadata } from "next";
import { PageHeader } from "@/components/Heading";
import ProjectIndex from "@/features/projects/ProjectIndex";

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
  const projects = getProjects(locale);

  return (
    <main className="pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="section-shell">
        <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />
        {projects.length > 0 ? (
          <ProjectIndex
            projects={projects}
            caseStudyLabel={t("caseStudy")}
            liveDemoLabel={t("liveDemo")}
            titleAs="h2"
          />
        ) : (
          <p className="py-24 text-center text-muted-foreground">{t("empty")}</p>
        )}
      </div>
    </main>
  );
}
