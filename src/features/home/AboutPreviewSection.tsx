"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";

export default function AboutPreviewSection() {
  const t = useTranslations("AboutPreview");
  const highlights = [
    t("highlightProduct"),
    t("highlightEngineering"),
    t("highlightDelivery"),
  ];

  return (
    <section className="w-full border-b border-border/60 bg-background py-20 md:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal direction="up">
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="max-w-3xl">
          <Reveal direction="left" delay={0.1}>
            <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
              {t("summary")}
            </p>
          </Reveal>

          <StaggerGroup
            className="mt-8 grid gap-4 sm:grid-cols-3"
            stagger={0.08}
            amount={0.1}
          >
            {highlights.map((item) => (
              <StaggerItem key={item} className="h-full">
                <div className="surface-card flex h-full items-start gap-3 rounded-xl border border-border/80 bg-card p-4 transition-colors hover:border-primary/50">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
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
                "group/link mt-8 h-10 cursor-pointer gap-2 border-border/80 px-4 text-xs font-semibold transition-colors hover:border-primary/50",
              )}
            >
              {t("cta")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
