"use client";

import { useTranslations } from "next-intl";
import { Github, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="w-full bg-foreground py-16 text-background md:py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{t("label")}</p>
          <h2 className="font-heading mt-4 text-4xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-7 text-background/75">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <a
            href="mailto:hidayatahmadd1377@gmail.com"
            className={cn(buttonVariants({ size: "lg" }), "h-11 cursor-pointer gap-2 bg-background px-4 text-sm text-foreground hover:bg-background/90")}
          >
            <Mail className="h-4 w-4" />
            {t("sendEmail")}
          </a>
          <a
            href="https://github.com/Medskiyyy"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 cursor-pointer gap-2 border-background/25 bg-transparent px-4 text-sm text-background hover:bg-background/10 hover:text-background")}
          >
            <Github className="h-4 w-4" />
            {t("viewGithub")}
          </a>
        </div>
      </div>
    </section>
  );
}
