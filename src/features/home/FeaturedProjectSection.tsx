"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/Heading";
import ProjectIndex from "@/features/projects/ProjectIndex";
import type { Project } from "@/types/project";

export default function FeaturedProjectSection({ projects }: { projects: Project[] }) {
  const t = useTranslations("FeaturedProject");

  return (
    <section className="w-full pt-12 pb-4 md:pt-16 md:pb-8">
      <div className="section-shell">
        <SectionHeader number="01" label={t("label")} title={t("title")} intro={t("intro")} />
        <div className="mt-4">
          <ProjectIndex
            projects={projects}
            caseStudyLabel={t("caseStudy")}
            liveDemoLabel={t("liveDemo")}
          />
        </div>
      </div>
    </section>
  );
}
