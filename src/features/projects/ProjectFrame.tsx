import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export function accentStyle(project: Project) {
  return { "--accent-project": project.accent } as CSSProperties;
}

function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/**
 * The screenshot of a project inside the device it runs on: a browser window
 * for the web apps, a phone for the Android ones. Both sit flush with the
 * bottom edge of whatever tinted stage contains them.
 */
export function ProjectDevice({
  project,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 560px",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.aspectRatio === "portrait") {
    return (
      <div className="relative mx-auto h-full aspect-[9/19] overflow-hidden rounded-t-[30px] border-[7px] border-b-0 border-[#141414] bg-[#141414] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={`${project.title} interface`}
            fill
            className="object-cover object-top"
            sizes="220px"
            priority={priority}
          />
        )}
      </div>
    );
  }

  const host = hostOf(project.liveUrl);

  return (
    <div className="w-full overflow-hidden rounded-t-[14px] bg-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-[#e6e6e2] px-3">
        <i className="h-[9px] w-[9px] rounded-full bg-[#dadad5]" />
        <i className="h-[9px] w-[9px] rounded-full bg-[#dadad5]" />
        <i className="h-[9px] w-[9px] rounded-full bg-[#dadad5]" />
        {host && <span className="ml-2.5 truncate text-xs text-[#6b6b68]">{host}</span>}
      </div>
      <div className="relative aspect-video">
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={`${project.title} interface`}
            fill
            className="object-cover object-top"
            sizes={sizes}
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}

/** A rounded, project-tinted stage with the device anchored to its bottom edge. */
export function ProjectStage({
  project,
  priority,
  className,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      style={accentStyle(project)}
      className={cn(
        "tint relative flex items-end justify-center overflow-hidden rounded-[24px] px-6 pt-6 sm:px-7 sm:pt-7",
        className,
      )}
    >
      <ProjectDevice project={project} priority={priority} />
    </div>
  );
}
