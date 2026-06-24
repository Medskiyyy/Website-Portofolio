import { useTranslations } from "next-intl";
import { Search, LayoutList, Code2, TestTube2, FileText, Rocket } from "lucide-react";
import { motion } from "framer-motion";

type WorkflowStep = {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
};

const steps: WorkflowStep[] = [
  { icon: <Search className="h-5 w-5" />, titleKey: "research", descKey: "researchDesc" },
  { icon: <LayoutList className="h-5 w-5" />, titleKey: "planning", descKey: "planningDesc" },
  { icon: <Code2 className="h-5 w-5" />, titleKey: "development", descKey: "developmentDesc" },
  { icon: <TestTube2 className="h-5 w-5" />, titleKey: "testing", descKey: "testingDesc" },
  { icon: <FileText className="h-5 w-5" />, titleKey: "documentation", descKey: "documentationDesc" },
  { icon: <Rocket className="h-5 w-5" />, titleKey: "deployment", descKey: "deploymentDesc" },
];

export default function AIWorkflowSection() {
  const t = useTranslations("AIWorkflow");

  return (
    <section className="w-full border-y border-border/40 bg-card/20 py-32 md:py-40">
      <motion.div 
        className="section-shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-8 hidden h-px bg-border lg:block"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, index) => (
              <div key={step.titleKey} className="relative flex flex-col items-center text-center gap-3">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
                  <span className="text-primary">{step.icon}</span>
                </div>
                <span className="absolute -right-2 -top-2 z-20 hidden h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground lg:flex">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t(step.titleKey)}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t(step.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
