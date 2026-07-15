"use client";

import { useTranslations } from "next-intl";
import { ExternalLink, FileText, Github, Languages } from "lucide-react";
import { StaggerItem, StaggerGroup, Counter } from "@/components/motion";

export default function ProofStripSection() {
  const t = useTranslations("ProofStrip");

  // numeric values drive the count-up animation; label/detail stay i18n
  const items = [
    {
      icon: <ExternalLink className="h-4 w-4" />,
      value: 2,
      label: t("liveLabel"),
      detail: t("liveDetail"),
    },
    {
      icon: <Github className="h-4 w-4" />,
      value: 3,
      label: t("repoLabel"),
      detail: t("repoDetail"),
    },
    {
      icon: <FileText className="h-4 w-4" />,
      value: 3,
      label: t("caseLabel"),
      detail: t("caseDetail"),
    },
    {
      icon: <Languages className="h-4 w-4" />,
      value: 2,
      label: t("localeLabel"),
      detail: t("localeDetail"),
      suffix: " EN/ID",
    },
  ];

  return (
    <section className="relative border-b border-border bg-card/40">
      <div className="section-shell">
        <StaggerGroup
          className="grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0"
          stagger={0.1}
          amount={0.3}
        >
          {items.map((item, i) => (
            <StaggerItem
              key={item.label}
              className="group relative py-6 md:px-6 first:md:pl-0 last:md:pr-0 overflow-hidden"
            >
              <div className="flex items-center gap-2 text-primary">
                {item.icon}
                <span className="text-xs font-bold uppercase tracking-[0.12em]">
                  {item.label}
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <Counter
                  value={item.value}
                  suffix={item.suffix ?? ""}
                  className="font-heading text-3xl font-bold text-foreground"
                  duration={1.4 + i * 0.15}
                />
                <p className="text-sm leading-5 text-muted-foreground">
                  {item.detail}
                </p>
              </div>
              <div className="hairline absolute bottom-0 left-0 w-full scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-x-100" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
