"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { EASE_OUT } from "@/components/motion";
import { ProjectDevice, accentStyle } from "@/features/projects/ProjectFrame";
import CopyEmailButton from "@/shared/components/CopyEmailButton";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export default function HeroSection({ projects }: { projects: Project[] }) {
  const t = useTranslations("Hero");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = projects[active];

  return (
    <section
      style={current ? accentStyle(current) : undefined}
      className="pt-8 pb-20 md:pt-12 md:pb-28"
    >
      <div className="section-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <span className="text-body inline-flex items-start gap-2 rounded-2xl bg-muted px-3 py-1.5 text-[13px] font-medium sm:items-center sm:rounded-full sm:text-sm">
            <i className="pulse-dot mt-[5px] sm:mt-0" aria-hidden />
            {t("availability")}
          </span>
          <h1 className="display mt-6 text-[2.5rem] leading-[1.08] text-balance sm:text-5xl lg:text-[3.5rem]">
            {t("headlineLead")} <mark className="mark-hl">{t("headlineMark")}</mark>
          </h1>
          <p className="text-body mt-6 max-w-[520px] text-lg leading-relaxed text-pretty">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn-pill btn-dark group h-[46px]">
              {t("ctaProjects")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <CopyEmailButton className="h-[46px]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="tint relative h-[250px] overflow-hidden rounded-[28px] transition-[background-color] duration-500 sm:h-[400px] lg:h-[460px]">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                aria-hidden={i !== active}
                tabIndex={i === active ? 0 : -1}
                aria-label={project.title}
                className={cn(
                  "absolute inset-x-6 top-6 bottom-0 flex items-end justify-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:inset-x-7 sm:top-7",
                  i === active
                    ? "opacity-100"
                    : "pointer-events-none translate-y-3.5 scale-[0.985] opacity-0",
                )}
              >
                <ProjectDevice project={project} priority={i === 0} />
              </Link>
            ))}
          </div>

          <div className="mt-3.5 grid grid-cols-4 gap-2" role="group" aria-label={t("showcase")}>
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "relative min-w-0 cursor-pointer border-t-2 border-border px-1 pt-2.5 text-left transition-colors hover:text-foreground",
                  i === active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {/* The progress bar's own animation drives the autoplay: when it
                    ends, the next project comes up. Reduced motion removes the
                    animation entirely, which also turns autoplay off. */}
                {i === active && (
                  <span
                    key={active}
                    aria-hidden
                    onAnimationEnd={() => setActive((active + 1) % projects.length)}
                    className={cn(
                      "absolute -top-0.5 left-0 h-0.5 w-full origin-left bg-foreground animate-[tab-progress_4.5s_linear_forwards] motion-reduce:animate-none",
                      paused && "[animation-play-state:paused]",
                    )}
                  />
                )}
                <span className="flex items-center gap-1.5 text-[13px] font-semibold sm:text-sm">
                  <i
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: project.accent }}
                    aria-hidden
                  />
                  <span className="truncate">{project.title.split(" ")[0]}</span>
                </span>
                <span className="mt-0.5 hidden truncate text-[12.5px] sm:block">{project.category}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
