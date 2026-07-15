"use client";

import { useTranslations } from "next-intl";
import { ClipboardCheck, Code2, Database, Smartphone } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";

type SkillCategory = {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    icon: <Code2 className="h-5 w-5" />,
    titleKey: "frontend",
    descriptionKey: "frontendDesc",
    skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui"],
  },
  {
    icon: <Database className="h-5 w-5" />,
    titleKey: "backend",
    descriptionKey: "backendDesc",
    skills: ["Supabase", "PostgreSQL", "Prisma ORM", "Auth.js", "Resend"],
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    titleKey: "mobile",
    descriptionKey: "mobileDesc",
    skills: ["Kotlin 2.x", "Jetpack Compose", "Room DB", "Dagger Hilt", "WorkManager"],
  },
  {
    icon: <ClipboardCheck className="h-5 w-5" />,
    titleKey: "aiWorkflow",
    descriptionKey: "deliveryDesc",
    skills: ["Product planning", "Code review", "Testing checkpoints", "Documentation", "Vercel deploys"],
  },
];

export default function SkillsSection() {
  const t = useTranslations("Skills");

  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-card/35 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 aurora-mesh opacity-40" />
      <div className="section-shell relative">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <Reveal direction="up">
            <p className="eyebrow">{t("label")}</p>
            <h2 className="font-heading mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground lg:justify-self-end">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          stagger={0.1}
          amount={0.15}
        >
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.titleKey} className="h-full">
              <article className="surface-card shine-border group relative flex h-full flex-col overflow-hidden p-5 md:p-6 transition-transform duration-400 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1.5">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-primary transition-shadow duration-400 group-hover:glow-ring">
                  {cat.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {t(cat.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(cat.descriptionKey)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:border-primary/30 group-hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
