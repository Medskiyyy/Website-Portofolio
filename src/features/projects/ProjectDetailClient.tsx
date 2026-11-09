"use client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github, Smartphone } from "lucide-react";
import { Reveal } from "@/components/motion";
import { MarginSection } from "@/components/Heading";
import { ProjectDevice, accentStyle } from "@/features/projects/ProjectFrame";
import type { Project } from "@/types/project";
import MotherAppPrototype from "@/components/prototypes/MotherAppPrototype";
import HitungUangPrototype from "@/components/prototypes/HitungUangPrototype";

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

  const headerText = (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
        <span className="text-body inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
          <i
            aria-hidden
            className="h-2 w-2 rounded-full"
            style={{ background: project.status === "live" ? "var(--live)" : project.accent }}
          />
          {statusLabel}
        </span>
        {project.activeDevelopment && (
          <span className="text-body rounded-full bg-muted px-3 py-1.5">{inDevelopmentLabel}</span>
        )}
        <span className="text-body rounded-full bg-muted px-3 py-1.5">{project.category}</span>
      </div>
      <h1 className="display mt-6 text-[2.75rem] leading-[1.05] text-balance sm:text-6xl">
        {project.title}
      </h1>
      <p className="text-body mt-6 max-w-2xl text-lg leading-relaxed text-pretty">{project.description}</p>
      <p className="mt-4 text-[15px] text-muted-foreground">
        {project.role} · <span className="tabular-nums">{project.timeline}</span>
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-pill btn-dark">
            {liveDemo}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-pill btn-outline">
            <Github className="h-4 w-4" />
            GitHub
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div style={accentStyle(project)}>
      <Link
        href="/projects"
        className="group mb-10 inline-flex items-center gap-1.5 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        {back}
      </Link>

      <Reveal amount={0.05}>
        {isPortrait ? (
          <header className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-7">{headerText}</div>
            <div className="tint flex justify-center rounded-[28px] px-6 pt-8 pb-8 lg:col-span-5">
              <div className="relative h-[580px] aspect-[9/20] overflow-hidden rounded-[34px] border-[6px] border-[#141414] bg-background shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] sm:h-[640px]">
                {project.slug === "mother" ? (
                  <MotherAppPrototype />
                ) : project.slug === "hitung-uang" ? (
                  <HitungUangPrototype />
                ) : project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 300px, 360px"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-muted-foreground">
                    <Smartphone className="mb-2 h-10 w-10 opacity-50" />
                    <p className="text-xs font-semibold">Screenshot belum diunggah</p>
                  </div>
                )}
              </div>
            </div>
          </header>
        ) : (
          <header>
            {headerText}
            {project.imageUrl && (
              <div className="tint mt-12 flex items-end justify-center overflow-hidden rounded-[28px] px-5 pt-8 sm:px-14 sm:pt-14">
                <div className="w-full max-w-[980px]">
                  <ProjectDevice project={project} priority sizes="(max-width: 1100px) 100vw, 980px" />
                </div>
              </div>
            )}
          </header>
        )}
      </Reveal>

      <ul className="mt-10 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className="text-body rounded-full px-3 py-1.5 text-sm font-medium shadow-[inset_0_0_0_1px_var(--border)]"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <MarginSection title={overview}>
          <Prose text={project.overview} />
        </MarginSection>
      </div>

      <Reveal amount={0.1}>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { title: problem, text: project.problem },
            { title: goal, text: project.goal },
            { title: solution, text: project.solution },
          ].map((item) => (
            <section key={item.title} className="rounded-[24px] bg-muted p-6 sm:p-7">
              <h2 className="display text-lg">{item.title}</h2>
              <p className="text-body mt-3 text-[15px] leading-relaxed text-pretty">{item.text}</p>
            </section>
          ))}
        </div>
      </Reveal>

      <div className="mt-16">
        <MarginSection title={architecture}>
          <Prose text={project.architecture} />
        </MarginSection>
        <MarginSection title={results}>
          <DotList items={project.results} />
        </MarginSection>
        <MarginSection title={challenges}>
          <DotList items={project.challenges} />
        </MarginSection>
        <MarginSection title={lessonsLearned}>
          <DotList items={project.lessonsLearned} />
        </MarginSection>
        {project.futureImprovements && project.futureImprovements.length > 0 && (
          <MarginSection title={futureImprovements}>
            <DotList items={project.futureImprovements} />
          </MarginSection>
        )}
      </div>
    </div>
  );
}

function Prose({ text }: { text: string }) {
  return <p className="text-body max-w-[68ch] text-lg leading-[1.75] text-pretty">{text}</p>;
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-[68ch] space-y-4">
      {items.map((item) => (
        <li key={item} className="text-body flex gap-4 text-base leading-relaxed">
          <i
            aria-hidden
            className="mt-[9px] h-2 w-2 shrink-0 rounded-full"
            style={{ background: "var(--accent-project)" }}
          />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}
