"use client";

import { useTranslations } from "next-intl";
import { Code2, Database, Wrench, Bot } from "lucide-react";
import { motion } from "framer-motion";

type SkillCategory = {
  icon: React.ReactNode;
  titleKey: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    icon: <Code2 className="h-5 w-5" />,
    titleKey: "frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: <Database className="h-5 w-5" />,
    titleKey: "backend",
    skills: ["Supabase", "PostgreSQL", "REST API", "Authentication"],
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    titleKey: "tools",
    skills: ["Git", "GitHub", "Docker", "Figma", "Vercel"],
  },
  {
    icon: <Bot className="h-5 w-5" />,
    titleKey: "aiWorkflow",
    skills: ["ChatGPT", "Gemini CLI", "AI Research", "AI-Assisted Dev"],
  },
];

export default function SkillsSection() {
  const t = useTranslations("Skills");

  return (
    <section className="w-full border-y border-border/40 bg-card/20 py-32 md:py-40">
      <motion.div 
        className="section-shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.titleKey}
              className="surface-card flex flex-col gap-5 rounded-lg p-5 transition-colors duration-200 hover:border-primary/35"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-primary">
                  {cat.icon}
                </span>
                <h3 className="font-semibold text-card-foreground">
                  {t(cat.titleKey)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
