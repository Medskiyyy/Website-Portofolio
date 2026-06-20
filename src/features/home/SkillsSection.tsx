import { useTranslations } from "next-intl";
import { Code2, Database, Wrench, Bot } from "lucide-react";

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
    <section className="w-full py-20 px-6 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {t("label")}
          </h2>
          <p className="text-2xl font-bold text-foreground">{t("title")}</p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.titleKey}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {cat.icon}
                </span>
                <h3 className="font-semibold text-card-foreground">
                  {t(cat.titleKey)}
                </h3>
              </div>
              <ul className="flex flex-col gap-1.5">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
