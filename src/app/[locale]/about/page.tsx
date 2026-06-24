import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

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
    <main className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("title")}
            </h1>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            {t("intro")}
          </p>
        </div>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8">
        <AboutSection title={t("backgroundTitle")}>
          <p className="text-muted-foreground leading-relaxed">{t("backgroundText")}</p>
        </AboutSection>

        <AboutSection title={t("philosophyTitle")}>
          <p className="text-muted-foreground leading-relaxed mb-6">{t("philosophyText")}</p>
          <div className="grid grid-cols-1 gap-4">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-md border border-border bg-muted/35 p-4"
              >
                <p className="font-semibold text-foreground mb-1 text-sm">{p.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </AboutSection>

        </div>

        <div className="space-y-8">
        <AboutSection title={t("aiWorkflowTitle")}>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("aiWorkflowText")}</p>
          <ul className="space-y-2">
            {workflowSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 rounded-md border border-border bg-muted/35 p-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </AboutSection>

        <AboutSection title={t("goalsTitle")}>
          <p className="text-muted-foreground leading-relaxed">{t("goalsText")}</p>
        </AboutSection>
        </div>
        </div>
      </div>
    </main>
  );
}

function AboutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-card space-y-4 rounded-lg p-5">
      <h2 className="font-heading text-lg font-bold text-foreground pb-2 border-b border-border">{title}</h2>
      {children}
    </section>
  );
}
