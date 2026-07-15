"use client";

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
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE_OUT, Reveal, StaggerGroup, StaggerItem, TextReveal } from "@/components/motion";
import type { Project } from "@/types/project";

type ProjectDetailClientProps = {
  project: Project;
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
  return (
    <>
      <Reveal direction="left" amount={0.05}>
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "-ml-2 mb-8 cursor-pointer gap-2",
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          {back}
        </Link>
      </Reveal>

      <header className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <Reveal direction="up">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold capitalize text-muted-foreground">
                {project.status}
              </span>
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {project.role}
              </span>
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {project.timeline}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h1 className="font-heading text-5xl font-bold leading-[1.05] text-balance text-gradient md:text-6xl">
              <TextReveal text={project.title} />
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.12}>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {project.description}
            </p>
          </Reveal>
        </div>

        {project.imageUrl && (
          <Reveal direction="left" delay={0.1} amount={0.1}>
            <motion.div
              className="surface-card shine-border group overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
                <div className="shimmer absolute inset-0" />
              </div>
            </motion.div>
          </Reveal>
        )}
      </header>

      <Reveal direction="up" delay={0.15} amount={0.1}>
        <div className="mt-10 flex flex-col gap-5 border-y border-border py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground"
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
                  "h-10 cursor-pointer gap-2 px-3 text-sm",
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
                  "h-10 cursor-pointer gap-2 px-3 text-sm",
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
    <section className="surface-card shine-border p-5 md:p-6">
      <h2 className="font-heading border-b border-border pb-4 text-xl font-bold text-foreground">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-muted-foreground">{text}</p>
    </section>
  );
}

function SummaryCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="surface-card shine-border h-full p-5 md:p-6">
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
    <section className="surface-card shine-border p-5 md:p-6">
      <h2 className="font-heading border-b border-border pb-4 text-xl font-bold text-foreground">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-background text-xs font-bold text-primary">
              {ordered ? index + 1 : <Icon className="h-4 w-4" />}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
