import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  const workflowSteps = [
    t("workflowStep1"),
    t("workflowStep2"),
    t("workflowStep3"),
    t("workflowStep4"),
    t("workflowStep5"),
  ];

  const principles = [
    { title: t("principle1Title"), desc: t("principle1Desc") },
    { title: t("principle2Title"), desc: t("principle2Desc") },
    { title: t("principle3Title"), desc: t("principle3Desc") },
  ];

  return (
    <main className="border-b border-border bg-background py-28 md:py-36">
      <div className="section-shell">
        <AnimatedSection delay={0.05}>
          <div className="mb-16 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end pb-8 border-b border-border/20">
            <div>
              <p className="eyebrow">{t("label")}</p>
              <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-foreground md:text-6xl">
                {t("title")}
              </h1>
            </div>
            <p className="text-xl leading-relaxed text-muted-foreground text-pretty">
              {t("intro")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <AnimatedSection delay={0.15}>
              <AboutSection title={t("backgroundTitle")}>
                <p className="text-base text-muted-foreground leading-relaxed text-pretty">{t("backgroundText")}</p>
              </AboutSection>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <AboutSection title={t("philosophyTitle")}>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 text-pretty">{t("philosophyText")}</p>
                <div className="grid grid-cols-1 gap-4">
                  {principles.map((p) => (
                    <div
                      key={p.title}
                      className="rounded-lg border border-border bg-muted/30 p-5 transition-colors duration-200 hover:border-primary/35"
                    >
                      <p className="font-heading font-bold text-foreground mb-1.5 text-sm transition-colors group-hover:text-primary">{p.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed text-pretty">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </AboutSection>
            </AnimatedSection>
          </div>

          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <AboutSection title={t("aiWorkflowTitle")}>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 text-pretty">{t("aiWorkflowText")}</p>
                <ul className="space-y-3">
                  {workflowSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-4 rounded-lg border border-border bg-muted/30 p-4 transition-colors duration-200 hover:border-primary/35">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-background text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed text-pretty">{step}</span>
                    </li>
                  ))}
                </ul>
              </AboutSection>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <AboutSection title={t("goalsTitle")}>
                <p className="text-base text-muted-foreground leading-relaxed text-pretty">{t("goalsText")}</p>
              </AboutSection>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </main>
  );
}

function AboutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-card h-full p-6">
      <h2 className="font-heading text-lg font-bold text-foreground pb-4 border-b border-border mb-6">{title}</h2>
      {children}
    </section>
  );
}
