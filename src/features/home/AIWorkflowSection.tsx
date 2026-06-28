"use client";

import { useTranslations } from "next-intl";
import { Search, LayoutList, Code2, TestTube2, FileText, Rocket } from "lucide-react";
import { motion, Variants } from "framer-motion";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 }
  }
};

export default function AIWorkflowSection() {
  const t = useTranslations("AIWorkflow");

  return (
    <section className="w-full border-y border-border/30 bg-card/10 py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <motion.div 
        className="section-shell"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <motion.div variants={itemVariants} className="mb-16 max-w-3xl">
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl leading-[1.1]">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Connector Line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-8 -translate-x-1/2 hidden h-[2px] w-[85%] bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute left-8 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:hidden"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, index) => (
              <motion.div 
                key={step.titleKey} 
                variants={itemVariants}
                className="relative flex flex-col items-center lg:items-center text-center lg:text-center gap-4 pl-12 lg:pl-0"
              >
                {/* Node wrapper with doppelrand circle layout */}
                <div className="absolute left-2 top-2 lg:relative lg:left-auto lg:top-auto z-10 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-border/20 shadow-md transition-transform duration-500 hover:scale-105 hover:border-primary/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[calc(1rem-2px)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <span className="text-primary">{step.icon}</span>
                  </div>
                </div>

                <span className="absolute left-1.5 top-0 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground lg:left-auto lg:-top-2 lg:translate-x-6 shadow-sm">
                  {index + 1}
                </span>

                <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
                  <p className="font-heading font-bold text-base text-foreground mt-2">{t(step.titleKey)}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed text-balance lg:max-w-[150px]">{t(step.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
