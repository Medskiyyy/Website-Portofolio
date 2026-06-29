"use client";

import { useTranslations } from "next-intl";
import { Code2, Database, Wrench, Bot } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type SkillCategory = {
  icon: React.ReactNode;
  titleKey: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    icon: <Code2 className="h-5 w-5" />,
    titleKey: "frontend",
    skills: ["Next.js 16", "React 19", "TypeScript", "Jetpack Compose", "Tailwind CSS v4", "Kotlin 2.x"],
  },
  {
    icon: <Database className="h-5 w-5" />,
    titleKey: "backend",
    skills: ["Supabase (PostgreSQL)", "Prisma ORM", "Auth.js (NextAuth)", "Dagger Hilt", "Room DB 2.8.4"],
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    titleKey: "tools",
    skills: ["Turborepo", "pnpm workspaces", "Firebase", "Git/GitHub", "Radix UI & shadcn", "Vercel & Resend"],
  },
  {
    icon: <Bot className="h-5 w-5" />,
    titleKey: "aiWorkflow",
    skills: [
      "AI-driven Product Planning",
      "Multi-Agent Development",
      "Context Engineering",
      "Prompt Engineering",
      "Documentation Automation",
      "Code Review Assistance",
      "Test Case Generation"
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 }
  }
};

export default function SkillsSection() {
  const t = useTranslations("Skills");

  // Bento layout column spans:
  // Index 0 (Frontend): col-span-2
  // Index 1 (Backend): col-span-1
  // Index 2 (Tools): col-span-1
  // Index 3 (AI Workflow): col-span-2
  const colSpans = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2"
  ];

  return (
    <section className="w-full border-y border-border/30 bg-card/10 py-32 md:py-40 relative overflow-hidden">
      {/* Subtle Section Ambient Orb */}
      <div className="absolute bottom-0 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <motion.div 
        className="section-shell"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <motion.div 
          variants={itemVariants}
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h2 className="font-heading mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.titleKey}
              variants={itemVariants}
              className={cn("double-bezel-wrapper h-full", colSpans[index])}
            >
              <div className="double-bezel-inner h-full flex flex-col justify-between p-6 sm:p-8 hover:border-primary/30 transition-colors duration-500">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                      {cat.icon}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-card-foreground">
                      {t(cat.titleKey)}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border/50 bg-muted/30 px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground hover:bg-muted/70 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
