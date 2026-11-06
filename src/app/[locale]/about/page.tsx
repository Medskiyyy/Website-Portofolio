import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MarginSection, PageHeader } from "@/components/Heading";

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
    <main className="py-14 md:py-20">
      <div className="section-shell">
        <PageHeader label={t("label")} title={t("title")} subtitle={t("intro")} />

        <MarginSection title={t("backgroundTitle")}>
          <p className="max-w-[68ch] text-lg leading-[1.75] text-pretty text-foreground/90">
            {t("backgroundText")}
          </p>
        </MarginSection>

        <MarginSection title={t("philosophyTitle")}>
          <p className="display max-w-[40ch] text-2xl leading-snug text-pretty sm:text-3xl">
            {t("philosophyText")}
          </p>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-8">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-foreground pt-4">
                <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="display mt-2 text-xl leading-snug">{p.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </li>
            ))}
          </ol>
        </MarginSection>

        <MarginSection title={t("workflowTitle")}>
          <p className="text-base leading-relaxed text-muted-foreground">{t("workflowText")}</p>
          <ol className="mt-6 max-w-[68ch]">
            {workflowSteps.map((step, i) => (
              <li key={step} className="flex gap-5 border-b border-border py-4 last:border-b-0">
                <span className="font-mono text-xs leading-7 text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-base leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </MarginSection>

        <MarginSection title={t("goalsTitle")}>
          <p className="max-w-[68ch] text-lg leading-[1.75] text-pretty text-foreground/90">{t("goalsText")}</p>
        </MarginSection>
      </div>
    </main>
  );
}
