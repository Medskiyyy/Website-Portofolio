"use client";

import { useTranslations } from "next-intl";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SectionHeader } from "@/components/Heading";
import { cn } from "@/lib/utils";

type Usage = "production" | "personal" | "learning";

const USAGE_ORDER: Usage[] = ["production", "personal", "learning"];

const USAGE_LABEL_KEY: Record<Usage, string> = {
  production: "usageProduction",
  personal: "usagePersonal",
  learning: "usageLearning",
};

type SkillCategory = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  skills: { name: string; usage: Usage }[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    titleKey: "frontend",
    descriptionKey: "frontendDesc",
    skills: [
      { name: "Next.js (App Router)", usage: "production" },
      { name: "React 19", usage: "production" },
      { name: "TypeScript", usage: "production" },
      { name: "Tailwind CSS v4", usage: "production" },
      { name: "shadcn/ui & Radix UI", usage: "production" },
      { name: "JavaScript", usage: "production" },
    ],
  },
  {
    id: "backend",
    titleKey: "backend",
    descriptionKey: "backendDesc",
    skills: [
      { name: "PostgreSQL (Supabase)", usage: "production" },
      { name: "Row-Level Security (RLS)", usage: "production" },
      { name: "Prisma ORM", usage: "production" },
      { name: "Auth.js v5 (NextAuth)", usage: "production" },
      { name: "RESTful API & Server Actions", usage: "production" },
      { name: "Argon2 & Cron Jobs", usage: "production" },
      { name: "Python", usage: "personal" },
    ],
  },
  {
    id: "mobile",
    titleKey: "mobile",
    descriptionKey: "mobileDesc",
    skills: [
      { name: "Kotlin", usage: "personal" },
      { name: "Jetpack Compose", usage: "personal" },
      { name: "Material 3", usage: "personal" },
      { name: "Room Database (FTS4)", usage: "personal" },
      { name: "Dagger Hilt", usage: "personal" },
      { name: "Coroutines & Flow", usage: "personal" },
      { name: "Google ML Kit (OCR)", usage: "personal" },
      { name: "Android Foreground Service", usage: "personal" },
    ],
  },
  {
    id: "tools",
    titleKey: "tools",
    descriptionKey: "deliveryDesc",
    skills: [
      { name: "Git & GitHub", usage: "production" },
      { name: "Turborepo (Monorepo)", usage: "production" },
      { name: "Vercel", usage: "production" },
      { name: "Clean Architecture", usage: "personal" },
      { name: "Vitest & Playwright", usage: "personal" },
      { name: "JUnit4 & Postman", usage: "personal" },
    ],
  },
];

/** Only the usage levels that at least one skill actually has get a legend entry. */
const usageLevels = USAGE_ORDER.filter((usage) =>
  skillCategories.some((cat) => cat.skills.some((s) => s.usage === usage)),
);

const USAGE_CHIP: Record<Usage, string> = {
  production: "bg-foreground text-background",
  personal: "text-body shadow-[inset_0_0_0_1px_var(--border)] bg-background",
  learning: "text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)]",
};

export default function SkillsSection() {
  const t = useTranslations("Skills");

  return (
    <section className="w-full pb-16 md:pb-24">
      <div className="section-shell">
        <SectionHeader title={t("title")} intro={t("subtitle")} />

        <Reveal amount={0.1} className="mt-8 flex flex-wrap gap-2">
          {usageLevels.map((usage) => (
            <span
              key={usage}
              className={cn("rounded-full px-3 py-1.5 text-sm font-medium", USAGE_CHIP[usage])}
            >
              {t(USAGE_LABEL_KEY[usage])}
            </span>
          ))}
        </Reveal>

        <StaggerGroup className="mt-6 grid gap-4 md:grid-cols-2" amount={0.1}>
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.id} className="h-full">
              <div className="h-full rounded-[24px] bg-muted p-6 sm:p-7">
                <h3 className="display text-xl">{t(cat.titleKey)}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  {t(cat.descriptionKey)}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={cn("rounded-full px-3 py-1.5 text-sm font-medium", USAGE_CHIP[skill.usage])}
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
