"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle2, Search, FileCode2, Code, ShieldCheck, FileText, Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, StaggerGroup, StaggerItem, SpotlightCard } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPreviewSection() {
  const t = useTranslations("AboutPreview");
  const wf = useTranslations("AIWorkflow");
  const [activeStep, setActiveStep] = useState<number>(0);

  const highlights = [
    t("highlightProduct"),
    t("highlightEngineering"),
    t("highlightDelivery"),
  ];

  const workflowSteps = [
    {
      num: "01",
      title: wf("research"),
      desc: wf("researchDesc"),
      icon: Search,
      tags: ["Problem Audit", "Tech Choice", "Cost Estimation"],
    },
    {
      num: "02",
      title: wf("planning"),
      desc: wf("planningDesc"),
      icon: FileCode2,
      tags: ["DB Schema", "API Specs", "UI Wireframe"],
    },
    {
      num: "03",
      title: wf("development"),
      desc: wf("developmentDesc"),
      icon: Code,
      tags: ["Next.js 16", "Kotlin Native", "Type-Safe Contracts"],
    },
    {
      num: "04",
      title: wf("testing"),
      desc: wf("testingDesc"),
      icon: ShieldCheck,
      tags: ["Lighthouse 100", "Unit Tests", "Responsiveness"],
    },
    {
      num: "05",
      title: wf("documentation"),
      desc: wf("documentationDesc"),
      icon: FileText,
      tags: ["API Contracts", "Architecture Notes", "Setup Guide"],
    },
    {
      num: "06",
      title: wf("deployment"),
      desc: wf("deploymentDesc"),
      icon: Rocket,
      tags: ["Vercel CI/CD", "Play Store", "Monitoring"],
    },
  ];

  const ActiveIcon = workflowSteps[activeStep].icon;

  return (
    <section className="w-full border-b border-border/60 bg-background py-20 md:py-28 relative overflow-hidden">
      <div className="section-shell grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Summary */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <Reveal direction="up">
            <span className="eyebrow">{t("label")}</span>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("summary")}
            </p>
          </Reveal>

          <StaggerGroup
            className="mt-8 grid w-full gap-3.5"
            stagger={0.08}
            amount={0.1}
          >
            {highlights.map((item) => (
              <StaggerItem key={item}>
                <div className="surface-card flex items-center gap-3 rounded-xl border border-border/80 bg-card p-3.5 transition-colors hover:border-primary/50">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <p className="text-xs font-semibold leading-relaxed text-foreground">
                    {item}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal direction="up" delay={0.2}>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "group/link mt-8 h-11 cursor-pointer gap-2 border-border/80 px-5 text-xs font-semibold transition-colors hover:border-primary/50",
              )}
            >
              {t("cta")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Right Column: Interactive Workflow Stepper */}
        <div className="lg:col-span-7">
          <Reveal direction="up" delay={0.15}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                {wf("label")}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Click step to inspect
              </span>
            </div>

            {/* Stepper Tabs */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.num}
                    onClick={() => setActiveStep(idx)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer",
                      isActive
                        ? "border-primary bg-primary/10 text-primary shadow-sm scale-105"
                        : "border-border/60 bg-card/60 text-muted-foreground hover:border-border hover:bg-card",
                    )}
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span className="text-[10px] font-mono font-bold">{step.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Step Detail Card */}
            <SpotlightCard className="rounded-2xl border border-border/80 bg-card p-6 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ActiveIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-heading text-lg font-bold text-foreground">
                          {workflowSteps[activeStep].title}
                        </h4>
                        <span className="text-xs font-mono text-muted-foreground">
                          Phase {workflowSteps[activeStep].num} of 06
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {workflowSteps[activeStep].desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {workflowSteps[activeStep].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-mono font-medium text-primary"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
