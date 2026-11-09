"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/Heading";
import { Reveal } from "@/components/motion";
import { ProjectStage, accentStyle } from "@/features/projects/ProjectFrame";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/** Each project as a large card, screenshot and write-up alternating sides. */
export default function FeaturedProjectSection({ projects }: { projects: Project[] }) {
  const t = useTranslations("FeaturedProject");

  return (
    <section className="w-full pb-12 md:pb-16">
      <div className="section-shell">
        <SectionHeader
          title={t("title")}
          action={
            <Link href="/projects" className="group inline-flex items-center gap-1.5 text-[15px] font-semibold">
              {t("allProjects")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          }
        />

        <div className="mt-10">
          {projects.map((project, index) => {
            const flip = index % 2 === 1;
            return (
              <Reveal key={project.slug} amount={0.15}>
                <article
                  style={accentStyle(project)}
                  className="group grid items-center gap-7 pb-16 md:grid-cols-[1.15fr_1fr] md:gap-14 md:pb-20"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    tabIndex={-1}
                    aria-hidden
                    className={cn("block", flip && "md:order-2")}
                  >
                    <ProjectStage
                      project={project}
                      priority={index === 0}
                      className={cn(
                        "rounded-[28px] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-1 sm:px-9 sm:pt-9",
                        project.aspectRatio === "portrait" && "aspect-[4/3]",
                      )}
                    />
                  </Link>

                  <div className={cn(flip && "md:order-1")}>
                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      <span className="text-body rounded-full px-2.5 py-1 shadow-[inset_0_0_0_1px_var(--border)]">
                        {project.category}
                      </span>
                      <span className="text-muted-foreground tabular-nums">{project.timeline}</span>
                    </div>

                    <h3 className="display mt-4 text-3xl leading-[1.05] text-balance sm:text-[40px] sm:tracking-[-0.03em]">
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="text-body mt-3.5 text-lg leading-relaxed text-pretty">{project.outcome}</p>

                    <ul className="mt-5 space-y-2.5">
                      {project.highlights.map((point) => (
                        <li key={point} className="text-body flex gap-3 text-base leading-normal">
                          <i
                            aria-hidden
                            className="mt-2 h-2 w-2 shrink-0 rounded-full"
                            style={{ background: project.accent }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 text-sm text-muted-foreground">
                      {project.techStack.slice(0, 4).join(" · ")}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-semibold">
                      <Link href={`/projects/${project.slug}`} className="group/cta inline-flex items-center gap-1.5">
                        {t("caseStudy")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {t("liveSite")}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub: ${project.title}`}
                          className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          GitHub
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
