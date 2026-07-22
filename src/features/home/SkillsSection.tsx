"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Code2, Database, Smartphone, Wrench, Sparkles } from "lucide-react";
import { Reveal, SpotlightCard } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type CategoryKey = "all" | "frontend" | "backend" | "mobile" | "tools";

type SkillCategory = {
  id: CategoryKey;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  skills: { name: string; level: number }[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    icon: <Code2 className="h-5 w-5" />,
    titleKey: "frontend",
    descriptionKey: "frontendDesc",
    skills: [
      { name: "Next.js 16", level: 95 },
      { name: "React 19", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS v4", level: 95 },
      { name: "shadcn/ui", level: 90 },
    ],
  },
  {
    id: "backend",
    icon: <Database className="h-5 w-5" />,
    titleKey: "backend",
    descriptionKey: "backendDesc",
    skills: [
      { name: "Supabase", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "Prisma ORM", level: 88 },
      { name: "Auth.js v5", level: 84 },
      { name: "REST & GraphQL", level: 86 },
    ],
  },
  {
    id: "mobile",
    icon: <Smartphone className="h-5 w-5" />,
    titleKey: "mobile",
    descriptionKey: "mobileDesc",
    skills: [
      { name: "Kotlin 2.x", level: 90 },
      { name: "Jetpack Compose", level: 92 },
      { name: "Room DB", level: 88 },
      { name: "Dagger Hilt", level: 85 },
      { name: "WorkManager", level: 82 },
    ],
  },
  {
    id: "tools",
    icon: <Wrench className="h-5 w-5" />,
    titleKey: "tools",
    descriptionKey: "deliveryDesc",
    skills: [
      { name: "Clean Architecture", level: 90 },
      { name: "Git Workflow", level: 92 },
      { name: "Vercel Deployment", level: 95 },
      { name: "Turborepo Monorepo", level: 82 },
      { name: "Unit & Integration Testing", level: 80 },
    ],
  },
];

export default function SkillsSection() {
  const t = useTranslations("Skills");
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");

  const filterOptions: { id: CategoryKey; label: string }[] = [
    { id: "all", label: "Semua Stack" },
    { id: "frontend", label: "Frontend Web" },
    { id: "backend", label: "Backend & DB" },
    { id: "mobile", label: "Android Native" },
    { id: "tools", label: "Architecture & Tools" },
  ];

  const filteredCategories =
    activeFilter === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeFilter);

  return (
    <section className="relative w-full overflow-hidden border-b border-border/60 bg-background py-20 md:py-28">
      <div className="section-shell relative">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal direction="up">
            <span className="eyebrow">{t("label")}</span>
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

        {/* Category Filter Pills */}
        <Reveal direction="up" delay={0.15}>
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border/40 pb-5">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all",
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                    : "border border-border/60 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Skill Category Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {filteredCategories.map((cat) => (
              <SpotlightCard
                key={cat.id}
                className="h-full rounded-2xl border border-border/80 bg-card/90 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-primary/10 text-primary">
                      {cat.icon}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                      Production
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                    {t(cat.titleKey)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {t(cat.descriptionKey)}
                  </p>

                  <div className="mt-6 space-y-3 pt-4 border-t border-border/40">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-foreground/90">
                          <span>{skill.name}</span>
                          <span className="font-mono text-[11px] text-primary">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
