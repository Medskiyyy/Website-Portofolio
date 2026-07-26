import type { Project, ProjectCopy } from "@/types/project";
import { projectMeta, projectSlugs } from "./meta";
import { projectCopyEn } from "./en";
import { projectCopyId } from "./id";

export { projectSlugs };

const copyByLocale: Record<string, Record<string, ProjectCopy>> = {
  en: projectCopyEn,
  id: projectCopyId,
};

/**
 * Merges the language-independent metadata with the prose for `locale`,
 * falling back to English for an unknown locale so a missing translation can
 * never blank out a case study.
 */
export function getProjects(locale: string): Project[] {
  const copy = copyByLocale[locale] ?? projectCopyEn;

  return projectMeta.map((meta) => {
    const prose = copy[meta.slug] ?? projectCopyEn[meta.slug];
    return { ...meta, ...prose };
  });
}

export function getProjectBySlug(locale: string, slug: string): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

export function getFeaturedProject(locale: string): Project | undefined {
  return getProjects(locale).find((p) => p.isFeatured);
}
