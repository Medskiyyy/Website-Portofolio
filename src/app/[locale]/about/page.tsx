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
    <main className="relative overflow-hidden border-b border-border/60 bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 aurora-mesh opacity-40" />
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="section-shell relative">
        <AnimatedSection delay={0.05}>
          <div className="mb-14 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end pb-8 border-b border-border/40">
            <div>
              <p className="eyebrow">{t("label")}</p>
              <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {t("title")}
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("intro")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <AnimatedSection delay={0.15}>
              <AboutSection title={t("backgroundTitle")}>
                <p className="text-sm leading-relaxed text-muted-foreground">{t("backgroundText")}</p>
              </AboutSection>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <AboutSection title={t("philosophyTitle")}>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">{t("philosophyText")}</p>
                <div className="grid grid-cols-1 gap-3">
                  {principles.map((p) => (
                    <div
                      key={p.title}
                      className="rounded-xl border border-border/60 bg-muted/30 p-4 transition-colors hover:border-primary/40"
                    >
                      <p className="font-heading font-bold text-foreground text-sm mb-1">{p.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </AboutSection>
            </AnimatedSection>
          </div>

          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <AboutSection title={t("aiWorkflowTitle")}>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">{t("aiWorkflowText")}</p>
                <ul className="space-y-3">
                  {workflowSteps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 rounded-xl border border-border/60 bg-muted/30 p-3.5 transition-colors hover:border-primary/40"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-xs leading-relaxed text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </AboutSection>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <AboutSection title={t("goalsTitle")}>
                <p className="text-sm leading-relaxed text-muted-foreground">{t("goalsText")}</p>
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
    <section className="surface-card h-full rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
      <h2 className="font-heading text-lg font-bold text-foreground pb-3 border-b border-border/50 mb-5">{title}</h2>
      {children}
    </section>
  );
}
