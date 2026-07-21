"use client";

import { useTranslations } from "next-intl";
import { Github, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="relative w-full overflow-hidden border-t border-border/60 bg-background py-16 md:py-24">
      <div className="section-shell relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Reveal direction="up" className="max-w-2xl">
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal direction="left" delay={0.1} className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:hidayatahmadd1377@gmail.com"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 cursor-pointer gap-2 px-5 text-xs font-semibold shadow-sm transition-all hover:bg-primary/90",
            )}
          >
            <Mail className="h-4 w-4" />
            {t("sendEmail")}
          </a>
          <a
            href="https://github.com/Medskiyyy"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 cursor-pointer gap-2 border-border/80 px-5 text-xs font-semibold transition-colors hover:border-primary/50",
            )}
          >
            <Github className="h-4 w-4" />
            {t("viewGithub")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
