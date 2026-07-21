"use client";

import { useTranslations } from "next-intl";
import { Code2, Database, Smartphone, Wrench } from "lucide-react";
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
    skills: ["Supabase", "PostgreSQL", "Prisma ORM", "Auth.js v5", "Resend API"],
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    titleKey: "mobile",
    descriptionKey: "mobileDesc",
    skills: ["Kotlin 2.x", "Jetpack Compose", "Room DB", "Dagger Hilt", "WorkManager"],
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    titleKey: "tools",
    descriptionKey: "deliveryDesc",
    skills: ["Clean Architecture", "Turborepo Monorepo", "Git", "Vercel", "Unit Testing"],
  },
];

export default function SkillsSection() {
  const t = useTranslations("Skills");

  return (
    <section className="relative w-full overflow-hidden border-b border-border/60 bg-muted/20 py-20 md:py-28">
      <div className="section-shell relative">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal direction="up">
            <p className="eyebrow">{t("label")}</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
          amount={0.1}
        >
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.titleKey} className="h-full">
              <article className="surface-card group flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-primary/10 text-primary">
                  {cat.icon}
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  {t(cat.titleKey)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {t(cat.descriptionKey)}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground/90"
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
