"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Github, Mail, Copy, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, Magnetic } from "@/components/motion";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");
  const [copied, setCopied] = useState(false);
  const email = "hidayatahmadd1377@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-full overflow-hidden border-t border-border/60 bg-background py-16 md:py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 blur-[100px] rounded-full" />

      <div className="section-shell relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Reveal direction="up" className="max-w-2xl">
          <span className="eyebrow">{t("label")}</span>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal direction="left" delay={0.1} className="flex flex-wrap items-center gap-3">
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${email}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 cursor-pointer gap-2.5 px-6 text-xs font-semibold shadow-md shadow-primary/20 transition-all hover:bg-primary/95",
              )}
            >
              <Mail className="h-4 w-4" />
              {t("sendEmail")}
            </a>
          </Magnetic>

          <Magnetic strength={0.15}>
            <button
              onClick={copyEmail}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 cursor-pointer gap-2 border-border/80 px-5 text-xs font-semibold transition-all hover:border-primary/50",
              )}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-muted-foreground" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </Magnetic>

          <Magnetic strength={0.15}>
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 cursor-pointer gap-2 border-border/80 px-5 text-xs font-semibold transition-colors hover:border-primary/50",
              )}
            >
              <Github className="h-4 w-4" />
              {t("viewGithub")}
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
