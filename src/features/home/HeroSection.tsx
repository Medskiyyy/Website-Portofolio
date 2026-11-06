"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/components/motion";
import { profile } from "@/content/profile";
import type { Project } from "@/types/project";

const stack = ["Next.js", "TypeScript", "Postgres & Supabase", "Kotlin & Compose"];

export default function HeroSection({ projects }: { projects: Project[] }) {
  const t = useTranslations("Hero");
  const [firstName, ...rest] = t("title").split(" ");

  return (
    <section className="pt-10 pb-12 md:pt-14 md:pb-20">
      <div className="section-shell">
        <motion.div
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-4 font-mono text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <span>{t("role")}</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {t("availability")}
          </span>
        </motion.div>

        <motion.h1
          className="display mt-12 text-[3.4rem] leading-[0.95] sm:text-7xl md:mt-16 lg:text-[7.5rem]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          {firstName}
          {rest.length > 0 && (
            <>
              <br />
              <em className="text-primary">{rest.join(" ")}</em>
            </>
          )}
        </motion.h1>

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 }}
          >
            <p className="max-w-xl text-lg leading-relaxed text-pretty text-foreground/85 sm:text-xl">
              {t("subtitle")}
            </p>
            <p className="mt-6 font-mono text-xs text-muted-foreground">{stack.join("  /  ")}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 cursor-pointer gap-2.5 px-6 text-sm font-medium transition-colors",
                )}
              >
                {t("ctaProjects")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={profile.resumeUrl}
                download
                className="ink-link inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                {t("ctaResume")}
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link inline-flex items-center gap-1 text-sm font-medium text-foreground"
              >
                {t("githubLink")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.nav
            aria-label={t("index")}
            className="md:col-span-5 md:pl-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.22 }}
          >
            <p className="eyebrow border-b border-foreground pb-3">{t("index")}</p>
            <ol>
              {projects.map((project, index) => (
                <li key={project.slug} className="border-b border-border">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex items-baseline gap-4 py-4"
                  >
                    <span className="font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="display block text-xl leading-snug transition-colors group-hover:text-primary">
                        {project.title}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-muted-foreground">
                        {project.category}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ol>
          </motion.nav>
        </div>
      </div>
    </section>
  );
}
