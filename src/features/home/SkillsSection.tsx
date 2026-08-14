"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Code2, Database, Smartphone, Wrench } from "lucide-react";
import { Reveal } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type CategoryKey = "all" | "frontend" | "backend" | "mobile" | "tools";

/**
 * Where a tool has actually been used, rather than a self-assigned score.
 * "production" = shipped on a live site; "personal" = a project of mine that
 * isn't deployed for anyone else; "learning" = used, but not yet in anything.
 */
type Usage = "production" | "personal" | "learning";

const USAGE_ORDER: Usage[] = ["production", "personal", "learning"];

const USAGE_LABEL_KEY: Record<Usage, string> = {
  production: "usageProduction",
  personal: "usagePersonal",
  learning: "usageLearning",
};

type SkillCategory = {
  id: Exclude<CategoryKey, "all">;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  skills: { name: string; usage: Usage }[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    icon: <Code2 className="h-5 w-5" />,
    titleKey: "frontend",
    descriptionKey: "frontendDesc",
    skills: [
      { name: "Next.js (App Router)", usage: "production" },
      { name: "React", usage: "production" },
      { name: "TypeScript", usage: "production" },
      { name: "Tailwind CSS", usage: "production" },
      { name: "shadcn/ui", usage: "production" },
      { name: "Framer Motion", usage: "personal" },
    ],
  },
  {
    id: "backend",
    icon: <Database className="h-5 w-5" />,
    titleKey: "backend",
    descriptionKey: "backendDesc",
    skills: [
      { name: "PostgreSQL", usage: "production" },
      { name: "Supabase", usage: "production" },
      { name: "Row-Level Security", usage: "production" },
      { name: "Prisma ORM", usage: "production" },
      { name: "Auth.js", usage: "production" },
      { name: "TanStack Query", usage: "production" },
      { name: "GraphQL", usage: "learning" },
    ],
  },
  {
    id: "mobile",
    icon: <Smartphone className="h-5 w-5" />,
    titleKey: "mobile",
    descriptionKey: "mobileDesc",
    skills: [
      { name: "Kotlin", usage: "personal" },
      { name: "Jetpack Compose", usage: "personal" },
      { name: "Room DB", usage: "personal" },
      { name: "Dagger Hilt", usage: "personal" },
      { name: "WorkManager", usage: "personal" },
      { name: "ML Kit (on-device)", usage: "personal" },
    ],
  },
  {
    id: "tools",
    icon: <Wrench className="h-5 w-5" />,
    titleKey: "tools",
    descriptionKey: "deliveryDesc",
    skills: [
      { name: "Git & GitHub", usage: "production" },
      { name: "Vercel", usage: "production" },
      { name: "Turborepo & pnpm workspaces", usage: "production" },
      { name: "Clean Architecture", usage: "personal" },
      { name: "Unit & integration testing", usage: "learning" },
      { name: "CI pipelines", usage: "learning" },
    ],
  },
];

export default function SkillsSection() {
  const t = useTranslations("Skills");
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");

  const filterOptions: { id: CategoryKey; labelKey: string }[] = [
    { id: "all", labelKey: "filterAll" },
    { id: "frontend", labelKey: "filterFrontend" },
    { id: "backend", labelKey: "filterBackend" },
    { id: "mobile", labelKey: "filterMobile" },
    { id: "tools", labelKey: "filterTools" },
  ];

  const filteredCategories =
    activeFilter === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeFilter);

  return (
    <section className="relative w-full border-b border-border/60 bg-background py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal direction="up">
            <span className="eyebrow">{t("label")}</span>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        {/* Category filter */}
        <Reveal direction="up" delay={0.15}>
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border/40 pb-5">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-[0.985]",
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {t(filter.labelKey)}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {filteredCategories.map((cat) => {
              const groups = USAGE_ORDER.map((usage) => ({
                usage,
                skills: cat.skills.filter((s) => s.usage === usage),
              })).filter((g) => g.skills.length > 0);

              return (
                <div
                  key={cat.id}
                  className="surface-card flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-primary/10 text-primary">
                    {cat.icon}
                  </div>

                  <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                    {t(cat.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(cat.descriptionKey)}
                  </p>

                  <div className="mt-6 space-y-4 border-t border-border/40 pt-5">
                    {groups.map((group) => (
                      <div key={group.usage}>
                        <p className="mb-2 text-xs font-semibold text-muted-foreground">
                          {t(USAGE_LABEL_KEY[group.usage])}
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          {group.skills.map((skill) => (
                            <li
                              key={skill.name}
                              className={cn(
                                "rounded-md border px-2 py-1 text-sm font-medium",
                                group.usage === "production"
                                  ? "border-primary/25 bg-primary/5 text-foreground"
                                  : "border-border/60 bg-muted/40 text-muted-foreground",
                              )}
                            >
                              {skill.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
