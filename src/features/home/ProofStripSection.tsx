"use client";

import { useTranslations } from "next-intl";
import { ExternalLink, FileText, Github, Languages } from "lucide-react";

export default function ProofStripSection() {
  const t = useTranslations("ProofStrip");

  const items = [
    {
      icon: <ExternalLink className="h-4 w-4" />,
      value: "2",
      label: t("liveLabel"),
      detail: t("liveDetail"),
    },
    {
      icon: <Github className="h-4 w-4" />,
      value: "3",
      label: t("repoLabel"),
      detail: t("repoDetail"),
    },
    {
      icon: <FileText className="h-4 w-4" />,
      value: "3",
      label: t("caseLabel"),
      detail: t("caseDetail"),
    },
    {
      icon: <Languages className="h-4 w-4" />,
      value: "EN/ID",
      label: t("localeLabel"),
      detail: t("localeDetail"),
    },
  ];

  return (
    <section className="border-b border-border bg-card/40">
      <div className="section-shell">
        <div className="grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {items.map((item) => (
            <div key={item.label} className="py-6 md:px-6 first:md:pl-0 last:md:pr-0">
              <div className="flex items-center gap-2 text-primary">
                {item.icon}
                <span className="text-xs font-bold uppercase tracking-[0.12em]">{item.label}</span>
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <p className="font-heading text-3xl font-bold text-foreground">{item.value}</p>
                <p className="text-sm leading-5 text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
