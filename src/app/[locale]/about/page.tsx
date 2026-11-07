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
    <main className="pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="section-shell">
        <PageHeader label={t("label")} title={t("title")} subtitle={t("intro")} />

        <MarginSection title={t("backgroundTitle")}>
          <p className="text-body max-w-[68ch] text-lg leading-[1.75] text-pretty">
            {t("backgroundText")}
          </p>
        </MarginSection>

        <MarginSection title={t("philosophyTitle")}>
          <p className="display max-w-[40ch] text-2xl leading-snug text-pretty sm:text-3xl">
            {t("philosophyText")}
          </p>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="rounded-[24px] bg-muted p-6">
                <p className="display text-lg leading-snug">{p.title}</p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
              </li>
            ))}
          </ul>
        </MarginSection>

        <MarginSection title={t("workflowTitle")}>
          <p className="text-base leading-relaxed text-muted-foreground">{t("workflowText")}</p>
          <ol className="mt-6 max-w-[68ch]">
            {workflowSteps.map((step, i) => (
              <li key={step} className="flex gap-4 border-b border-border py-4 last:border-b-0">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold tabular-nums">
                  {i + 1}
                </span>
                <span className="text-body pt-0.5 text-base leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </MarginSection>

        <MarginSection title={t("goalsTitle")}>
          <p className="text-body max-w-[68ch] text-lg leading-[1.75] text-pretty">{t("goalsText")}</p>
        </MarginSection>
      </div>
    </main>
  );
}
