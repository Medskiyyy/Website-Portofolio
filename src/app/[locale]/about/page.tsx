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
    <main className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="section-shell">
        <AnimatedSection delay={0.05}>
          <div className="mb-16 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end pb-8 border-b border-border/20">
            <div>
              <p className="eyebrow">{t("label")}</p>
              <h1 className="font-heading mt-4 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
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
                      className="group rounded-2xl border border-border/40 bg-muted/20 p-5 transition-all duration-300 hover:bg-muted/40 hover:border-primary/25"
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
                    <li key={i} className="group flex items-start gap-4 rounded-2xl border border-border/40 bg-muted/20 p-4 transition-all duration-300 hover:bg-muted/40 hover:border-primary/25">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary group-hover:scale-105 transition-transform duration-300">
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
    <div className="double-bezel-wrapper h-full">
      <div className="double-bezel-inner h-full flex flex-col">
        <h2 className="font-heading text-lg font-bold text-foreground pb-4 border-b border-border/20 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}
