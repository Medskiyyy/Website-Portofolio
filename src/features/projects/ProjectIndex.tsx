import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { ProjectStage } from "@/features/projects/ProjectFrame";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type ProjectIndexProps = {
  projects: Project[];
  caseStudyLabel: string;
  liveDemoLabel: string;
  titleAs?: "h2" | "h3";
};

/** The projects page: one card per project, the screenshot on its own tinted stage. */
export default function ProjectIndex({
  projects,
  caseStudyLabel,
  liveDemoLabel,
  titleAs: Title = "h3",
}: ProjectIndexProps) {
  return (
    <StaggerGroup className="grid gap-x-6 gap-y-14 md:grid-cols-2" amount={0.05}>
      {projects.map((project, index) => (
        <StaggerItem key={project.slug}>
          <article className="group">
            <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden className="block">
              <ProjectStage
                project={project}
                priority={index < 2}
                className={cn(
                  "transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-1",
                  project.aspectRatio === "portrait" && "aspect-[16/11]",
                )}
              />
            </Link>

            <div className="mt-6 px-1">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                <span className="text-body rounded-full px-2.5 py-1 shadow-[inset_0_0_0_1px_var(--border)]">
                  {project.category}
                </span>
                <span className="text-muted-foreground tabular-nums">{project.timeline}</span>
              </div>

              <Title className="display mt-4 text-2xl sm:text-[28px]">
                <Link href={`/projects/${project.slug}`} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                  {project.title}
                </Link>
              </Title>
              <p className="text-body mt-2.5 text-base leading-relaxed text-pretty">{project.description}</p>
              <p className="mt-3 text-sm text-muted-foreground">{project.techStack.join(" · ")}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-semibold">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/cta inline-flex items-center gap-1.5"
                >
                  {caseStudyLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                </Link>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {liveDemoLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`GitHub: ${project.title}`}
                  >
                    GitHub
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
