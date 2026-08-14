"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Github,
  Lightbulb,
  Rocket,
  Smartphone,
  Image as ImageIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE_OUT, Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import type { Project } from "@/types/project";
import MotherAppPrototype from "@/components/prototypes/MotherAppPrototype";

type ProjectDetailClientProps = {
  project: Project;
  statusLabel: string;
  inDevelopmentLabel: string;
  back: string;
  liveDemo: string;
  overview: string;
  problem: string;
  goal: string;
  solution: string;
  architecture: string;
  challenges: string;
  results: string;
  lessonsLearned: string;
  futureImprovements: string;
};

export default function ProjectDetailClient({
  project,
  statusLabel,
  inDevelopmentLabel,
  back,
  liveDemo,
  overview,
  problem,
  goal,
  solution,
  architecture,
  challenges,
  results,
  lessonsLearned,
  futureImprovements,
}: ProjectDetailClientProps) {
  const isPortrait = project.aspectRatio === "portrait";
  const hasPrototype = project.slug === "mother";
  const [viewMode, setViewMode] = useState<"prototype" | "screenshot">(
    hasPrototype ? "prototype" : "screenshot",
  );

  return (
    <>
      <Reveal direction="left" amount={0.05}>
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "-ml-2 mb-8 cursor-pointer gap-2 active:scale-[0.985]",
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          {back}
        </Link>
      </Reveal>

      <header
        className={cn(
          "grid gap-10 lg:items-center",
          isPortrait ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.92fr_1.08fr]",
        )}
      >
        <div>
          <Reveal direction="up">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-md border border-primary/25 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                {statusLabel}
              </span>
              {project.activeDevelopment && (
                <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {inDevelopmentLabel}
                </span>
              )}
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {project.role}
              </span>
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {project.timeline}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h1 className="font-heading text-4xl font-bold leading-[1.1] text-balance text-foreground sm:text-5xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.12}>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {project.description}
            </p>
          </Reveal>
        </div>

        {/* Project Visual Showcase (Interactive Phone Frame or Browser Frame) */}
        <Reveal direction="left" delay={0.1} amount={0.1}>
          {isPortrait ? (
            <div className="relative flex flex-col items-center justify-center py-2">
              {/* Toggle header between interactive prototype & screenshot */}
              {hasPrototype && (
                <div className="mb-3 flex items-center gap-1 rounded-full border border-border/80 bg-card/90 p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode("prototype")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all",
                      viewMode === "prototype"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>Live Interactive Demo</span>
                  </button>
                  <button
                    onClick={() => setViewMode("screenshot")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all",
                      viewMode === "screenshot"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    <span>Screenshot</span>
                  </button>
                </div>
              )}

              {/* Ambient dynamic back-glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-[420px] w-[260px] rounded-full bg-primary/20 blur-[90px]" />
              </div>

              {/* Android Smartphone Device Frame */}
              <motion.div
                className="relative z-10 h-[520px] sm:h-[560px] aspect-[9/18.5] rounded-[34px] border-[4px] border-border/90 bg-background shadow-2xl overflow-hidden flex flex-col"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                {/* Camera punch-hole notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 h-2.5 w-2.5 rounded-full bg-foreground/30 shadow-inner pointer-events-none" />

                <div className="relative flex-1 w-full h-full">
                  {viewMode === "prototype" && hasPrototype ? (
                    <MotherAppPrototype />
                  ) : project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 768px) 280px, 340px"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center text-muted-foreground">
                      <Smartphone className="h-10 w-10 text-primary mb-2 opacity-50" />
                      <p className="text-xs font-semibold">Screenshot belum diunggah</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Standard Desktop/Browser Card for Web Projects */
            <motion.div
              className="surface-card group overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 52vw"
                  />
                )}
              </div>
            </motion.div>
          )}
        </Reveal>
      </header>

      <Reveal direction="up" delay={0.15} amount={0.1}>
        <div className="mt-10 flex flex-col gap-5 border-y border-border py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-10 cursor-pointer gap-2 px-3 text-sm active:scale-[0.985]",
                )}
              >
                {liveDemo}
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-10 cursor-pointer gap-2 px-3 text-sm active:scale-[0.985]",
                )}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </Reveal>

      <StaggerGroup
        className="mt-10 grid gap-5 lg:grid-cols-3"
        stagger={0.1}
        amount={0.15}
      >
        <StaggerItem className="h-full">
          <SummaryCard title={problem} text={project.problem} />
        </StaggerItem>
        <StaggerItem className="h-full" direction="up">
          <SummaryCard title={goal} text={project.goal} />
        </StaggerItem>
        <StaggerItem className="h-full" direction="up">
          <SummaryCard title={solution} text={project.solution} />
        </StaggerItem>
      </StaggerGroup>

      <section className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-5">
          <Reveal direction="right" amount={0.1}>
            <TextSection title={overview} text={project.overview} />
          </Reveal>
          <Reveal direction="right" delay={0.08} amount={0.1}>
            <TextSection title={architecture} text={project.architecture} />
          </Reveal>
        </div>

        <div className="space-y-5">
          <Reveal direction="up" amount={0.1}>
            <ListSection title={results} icon="rocket" items={project.results} />
          </Reveal>
          <Reveal direction="up" delay={0.06} amount={0.1}>
            <ListSection title={challenges} icon="check" items={project.challenges} />
          </Reveal>
          <Reveal direction="up" delay={0.12} amount={0.1}>
            <ListSection title={lessonsLearned} icon="lightbulb" items={project.lessonsLearned} />
          </Reveal>
          <Reveal direction="up" delay={0.18} amount={0.1}>
            <ListSection
              title={futureImprovements}
              icon="check"
              items={project.futureImprovements}
              ordered
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function TextSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="surface-card p-5 md:p-6 shadow-sm">
      <h2 className="font-heading border-b border-border pb-4 text-xl font-bold text-foreground">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-muted-foreground">{text}</p>
    </section>
  );
}

function SummaryCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="surface-card h-full p-5 md:p-6 shadow-sm">
      <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
    </section>
  );
}

function ListSection({
  title,
  icon,
  items,
  ordered = false,
}: {
  title: string;
  icon: "rocket" | "check" | "lightbulb";
  items: string[];
  ordered?: boolean;
}) {
  const Icon = icon === "rocket" ? Rocket : icon === "check" ? CheckCircle2 : Lightbulb;

  return (
    <section className="surface-card p-5 md:p-6 shadow-sm">
      <h2 className="font-heading border-b border-border pb-4 text-xl font-bold text-foreground">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-background text-xs font-bold text-primary font-mono">
              {ordered ? index + 1 : <Icon className="h-4 w-4" />}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
