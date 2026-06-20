import { useTranslations } from "next-intl";
import { Search, LayoutList, Code2, TestTube2, FileText, Rocket } from "lucide-react";

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
    <section className="w-full py-20 px-6 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {t("label")}
          </h2>
          <p className="text-2xl font-bold text-foreground mb-3">{t("title")}</p>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-8 left-8 right-8 h-px bg-border hidden lg:block"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, index) => (
              <div key={step.titleKey} className="relative flex flex-col items-center text-center gap-3">
                {/* Step number + icon */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                  <span className="text-primary">{step.icon}</span>
                </div>
                <span className="absolute -top-2 -right-2 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground hidden lg:flex">
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
      </div>
    </section>
  );
}
