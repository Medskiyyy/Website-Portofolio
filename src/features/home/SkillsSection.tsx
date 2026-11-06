"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion";
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

/** Only the usage levels that at least one skill actually has become columns. */
const usageColumns = USAGE_ORDER.filter((usage) =>
  skillCategories.some((cat) => cat.skills.some((s) => s.usage === usage)),
);

export default function SkillsSection() {
  const t = useTranslations("Skills");

  return (
    <section className="w-full py-12 md:py-20">
      <div className="section-shell">
        <SectionHeader number="02" label={t("label")} title={t("title")} intro={t("subtitle")} />

        <Reveal amount={0.1} className="mt-12 md:mt-16">
          <div className="hidden border-b border-foreground pb-3 md:grid md:grid-cols-12 md:gap-8">
            <span className="md:col-span-3" />
            {usageColumns.map((usage) => (
              <p
                key={usage}
                className="eyebrow md:col-span-4 last:md:col-span-5"
              >
                {usage === "production" && (
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" aria-hidden />
                )}
                {t(USAGE_LABEL_KEY[usage])}
              </p>
            ))}
          </div>

          <dl>
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                className="grid gap-5 border-b border-border py-8 md:grid-cols-12 md:gap-8"
              >
                <dt className="md:col-span-3">
                  <p className="display text-2xl leading-tight">{t(cat.titleKey)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(cat.descriptionKey)}
                  </p>
                </dt>

                {usageColumns.map((usage) => {
                  const skills = cat.skills.filter((s) => s.usage === usage);
                  return (
                    <dd
                      key={usage}
                      className={cn(
                        "md:col-span-4 last:md:col-span-5",
                        skills.length === 0 && "hidden md:block",
                      )}
                    >
                      {skills.length > 0 && (
                        <>
                          <p className="eyebrow mb-2 md:hidden">{t(USAGE_LABEL_KEY[usage])}</p>
                          <ul className="space-y-1.5">
                            {skills.map((skill) => (
                              <li
                                key={skill.name}
                                className={cn(
                                  "text-[0.95rem]",
                                  usage === "production" ? "text-foreground" : "text-muted-foreground",
                                )}
                              >
                                {skill.name}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </dd>
                  );
                })}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
