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
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {t("intro")}
        </p>
      </div>

      <div className="space-y-12">
        {/* Background */}
        <AboutSection title={t("backgroundTitle")}>
          <p className="text-muted-foreground leading-relaxed">{t("backgroundText")}</p>
        </AboutSection>

        {/* Development Philosophy */}
        <AboutSection title={t("philosophyTitle")}>
          <p className="text-muted-foreground leading-relaxed mb-6">{t("philosophyText")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-border bg-muted/30 p-4"
              >
                <p className="font-semibold text-foreground mb-1 text-sm">{p.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </AboutSection>

        {/* AI-Assisted Workflow */}
        <AboutSection title={t("aiWorkflowTitle")}>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("aiWorkflowText")}</p>
          <ul className="space-y-2">
            {workflowSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </AboutSection>

        {/* Career Goals */}
        <AboutSection title={t("goalsTitle")}>
          <p className="text-muted-foreground leading-relaxed">{t("goalsText")}</p>
        </AboutSection>
      </div>
    </main>
  );
}

function AboutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-foreground pb-2 border-b border-border">{title}</h2>
      {children}
    </section>
  );
}
