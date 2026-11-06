import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion";
import type { Project } from "@/types/project";

type ProjectIndexProps = {
  projects: Project[];
  caseStudyLabel: string;
  liveDemoLabel: string;
  /** h2 on the projects page (under its h1), h3 on the home page (under a section h2). */
  titleAs?: "h2" | "h3";
};

/**
 * Projects as numbered entries in an index rather than a grid of cards:
 * number in the margin, the write-up beside it, and the screenshot as a
 * captioned figure. Shared by the home page and /projects.
 */
export default function ProjectIndex({
  projects,
  caseStudyLabel,
  liveDemoLabel,
  titleAs: Title = "h3",
}: ProjectIndexProps) {
  return (
    <ol>
      {projects.map((project, index) => {
        const number = String(index + 1).padStart(2, "0");

        return (
          <li key={project.slug} className="border-b border-border last:border-b-0">
            <Reveal amount={0.15}>
              <article className="group grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                <p className="hidden font-mono text-sm text-primary md:col-span-1 md:block" aria-hidden>
                  {number}
                </p>

                <div className="flex flex-col md:col-span-5">
                  <p className="eyebrow">
                    <span className="mr-2 text-primary md:hidden">{number}</span>
                    {project.category}
                  </p>
                  <Title className="display mt-3 text-3xl leading-[1.1] sm:text-4xl">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="decoration-primary decoration-1 underline-offset-[6px] hover:underline"
                    >
                      {project.title}
                    </Link>
                  </Title>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {project.role}
                    <span className="mx-2" aria-hidden>
                      ·
                    </span>
                    <span className="font-mono text-xs">{project.timeline}</span>
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-pretty text-foreground/85">
                    {project.description}
                  </p>
                  <p className="mt-5 font-mono text-xs leading-relaxed text-muted-foreground">
                    {project.techStack.join("  /  ")}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium md:mt-auto md:pt-8">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/cta inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                    >
                      {caseStudyLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ink-link inline-flex items-center gap-1 text-muted-foreground"
                      >
                        {liveDemoLabel}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ink-link inline-flex items-center gap-1 text-muted-foreground"
                        aria-label={`GitHub: ${project.title}`}
                      >
                        GitHub
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <figure className="order-first md:order-none md:col-span-6">
                  <Link
                    href={`/projects/${project.slug}`}
                    tabIndex={-1}
                    aria-hidden
                    className="block"
                  >
                    <ProjectThumb project={project} priority={index === 0} />
                  </Link>
                  <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
                    Fig. {number} / {project.title}
                  </figcaption>
                </figure>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

function ProjectThumb({ project, priority }: { project: Project; priority: boolean }) {
  if (!project.imageUrl) {
    return (
      <div className="flex aspect-video items-center justify-center border border-border bg-muted font-mono text-xs text-muted-foreground">
        {project.title}
      </div>
    );
  }

  if (project.aspectRatio === "portrait") {
    return (
      <div className="flex aspect-video items-center justify-center overflow-hidden border border-border bg-muted p-5">
        <div className="relative h-full aspect-[9/20] overflow-hidden rounded-[18px] border-[3px] border-foreground/85 bg-background transition-transform duration-500 group-hover:-translate-y-1">
          <Image
            src={project.imageUrl}
            alt={`${project.title} interface`}
            fill
            className="object-cover object-top"
            sizes="200px"
            priority={priority}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden border border-border bg-muted">
      <Image
        src={project.imageUrl}
        alt={`${project.title} interface`}
        fill
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
        sizes="(max-width: 768px) 100vw, 560px"
        priority={priority}
      />
    </div>
  );
}
