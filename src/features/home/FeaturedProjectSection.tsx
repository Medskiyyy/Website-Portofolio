"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/Heading";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { accentStyle } from "@/features/projects/ProjectFrame";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export default function FeaturedProjectSection({ projects }: { projects: Project[] }) {
  const t = useTranslations("FeaturedProject");
  const [hovered, setHovered] = useState<Project | null>(null);

  return (
    <section className="w-full pb-16 md:pb-24">
      <div className="section-shell">
        <SectionHeader
          title={t("title")}
          action={
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold"
            >
              {t("allProjects")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          }
        />

        <StaggerGroup className="mt-6" stagger={0.06}>
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                style={accentStyle(project)}
                onMouseEnter={() => setHovered(project)}
                onMouseLeave={() => setHovered(null)}
                className="group grid grid-cols-[20px_1fr_20px] items-center gap-x-3 gap-y-1.5 rounded-2xl px-2 py-5 transition-colors duration-200 hover:[background-color:color-mix(in_oklch,var(--accent-project)_14%,var(--background))] sm:px-4 md:grid-cols-[28px_1.3fr_1.6fr_190px_24px] md:gap-4 md:py-[22px]"
              >
                <span
                  aria-hidden
                  className="h-3 w-3 rounded-full"
                  style={{ background: project.accent }}
                />
                <h3 className="display text-xl transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-1.5 sm:text-[22px]">
                  {project.title}
                </h3>
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 opacity-35 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 md:order-last"
                />
                <p className="text-body col-start-2 col-end-4 text-[15px] leading-snug md:col-auto">
                  {project.description}
                </p>
                <p className="col-start-2 col-end-4 text-sm text-muted-foreground tabular-nums md:col-auto">
                  {project.category} · {project.timeline}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <CursorPreview project={hovered} />
    </section>
  );
}

/**
 * A screenshot that trails the cursor while a row is hovered. Only on devices
 * with a fine pointer that can hover, and never with reduced motion; touch
 * users see the same screenshots on the projects page instead.
 */
const PREVIEW_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const subscribeToPreviewQuery = (onChange: () => void) => {
  const mq = window.matchMedia(PREVIEW_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

function CursorPreview({ project }: { project: Project | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribeToPreviewQuery,
    () => window.matchMedia(PREVIEW_QUERY).matches,
    () => false,
  );
  const [last, setLast] = useState<Project | null>(null);

  if (project && project !== last) setLast(project);

  useEffect(() => {
    if (!enabled) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    let started = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX + 180;
      ty = e.clientY;
      if (!started) {
        x = tx;
        y = ty;
        started = true;
      }
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ref.current) ref.current.style.translate = `${x}px ${y}px`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled || !last?.imageUrl) return null;

  const portrait = last.aspectRatio === "portrait";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-40">
      <div
        className={cn(
          "relative -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          portrait ? "aspect-[9/19] w-[150px]" : "aspect-video w-[300px]",
          project ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
      >
        <Image src={last.imageUrl} alt="" fill sizes="300px" className="object-cover object-top" />
      </div>
    </div>
  );
}
