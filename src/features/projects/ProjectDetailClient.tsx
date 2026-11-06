"use client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github, Smartphone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";
import { MarginSection } from "@/components/Heading";
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

  const meta = [
    statusLabel,
    project.activeDevelopment ? inDevelopmentLabel : null,
    project.role,
    project.timeline,
  ].filter(Boolean) as string[];

  const headerText = (
    <div>
      <p className="eyebrow">{project.category}</p>
      <h1 className="display mt-5 text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
        {project.title}
      </h1>
      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
        {meta.map((item, i) => (
          <li key={item} className={i === 0 ? "inline-flex items-center gap-2 text-foreground" : undefined}>
            {i === 0 && <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />}
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-foreground/85 sm:text-xl">
        {project.description}
      </p>
    </div>
  );

  return (
    <>
      <Link
        href="/projects"
        className="group mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        {back}
      </Link>

      <Reveal amount={0.05}>
        {isPortrait ? (
          <header className="grid gap-12 md:grid-cols-12 md:items-center md:gap-8">
            <div className="md:col-span-7">{headerText}</div>
            <div className="flex justify-center md:col-span-5">
              <div className="relative h-[580px] aspect-[9/20] overflow-hidden rounded-[34px] border-[4px] border-foreground/85 bg-background sm:h-[640px]">
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
              <figure className="mt-12">
                <div className="relative aspect-video overflow-hidden border border-border bg-muted">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 1152px) 100vw, 1100px"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
                  Fig. 01 / {project.title}
                </figcaption>
              </figure>
            )}
          </header>
        )}
      </Reveal>

      <div className="mt-12 flex flex-col gap-6 border-y border-foreground py-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">
          {project.techStack.join("  /  ")}
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-10 cursor-pointer gap-2 px-4 text-sm")}
            >
              {liveDemo}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-10 cursor-pointer gap-2 px-4 text-sm",
              )}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </div>

      <Reveal amount={0.1}>
        <div className="grid gap-10 border-b border-border py-12 md:grid-cols-3 md:gap-8">
          {[
            { title: problem, text: project.problem },
            { title: goal, text: project.goal },
            { title: solution, text: project.solution },
          ].map((item, i) => (
            <section key={item.title}>
              <h2 className="eyebrow">
                <span className="mr-2 text-primary">{String.fromCharCode(65 + i)}.</span>
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-pretty">{item.text}</p>
            </section>
          ))}
        </div>
      </Reveal>

      <MarginSection title={overview}>
        <Prose text={project.overview} />
      </MarginSection>
      <MarginSection title={architecture}>
        <Prose text={project.architecture} />
      </MarginSection>
      <MarginSection title={results}>
        <NumberedList items={project.results} />
      </MarginSection>
      <MarginSection title={challenges}>
        <NumberedList items={project.challenges} />
      </MarginSection>
      <MarginSection title={lessonsLearned}>
        <NumberedList items={project.lessonsLearned} />
      </MarginSection>
      {project.futureImprovements && project.futureImprovements.length > 0 && (
        <MarginSection title={futureImprovements}>
          <NumberedList items={project.futureImprovements} />
        </MarginSection>
      )}
    </>
  );
}

function Prose({ text }: { text: string }) {
  return <p className="max-w-[68ch] text-lg leading-[1.75] text-pretty text-foreground/90">{text}</p>;
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="max-w-[68ch] space-y-5">
      {items.map((item, index) => (
        <li key={item} className="flex gap-5 text-base leading-relaxed">
          <span className="font-mono text-xs leading-7 text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ol>
  );
}
