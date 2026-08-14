"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Github, Mail, Copy, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";
import { profile } from "@/content/profile";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard can be blocked by permissions; the mailto button still works.
    }
  };

  return (
    <section className="w-full border-t border-border/60 bg-transparent py-16 md:py-24">
      <div className="section-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Reveal direction="up" className="max-w-2xl">
          <span className="eyebrow">{t("label")}</span>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal direction="left" delay={0.1} className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 cursor-pointer gap-2.5 px-6 text-sm font-semibold shadow-sm active:scale-[0.985]",
            )}
          >
            <Mail className="h-4 w-4" />
            {t("sendEmail")}
          </a>

          <button
            onClick={copyEmail}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 cursor-pointer gap-2 border-border/80 px-5 text-sm font-semibold active:scale-[0.985]",
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-primary" />
                <span>{t("copiedEmail")}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-muted-foreground" />
                <span>{t("copyEmail")}</span>
              </>
            )}
          </button>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 cursor-pointer gap-2 border-border/80 px-5 text-sm font-semibold active:scale-[0.985]",
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
