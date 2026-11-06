"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHeader } from "@/components/Heading";
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
      // Clipboard can be blocked by permissions; the mailto link still works.
    }
  };

  return (
    <section className="w-full pt-12 pb-24 md:pt-20 md:pb-28">
      <div className="section-shell">
        <SectionHeader number="04" label={t("label")} title={t("title")} intro={t("subtitle")} />

        <Reveal className="mt-12 md:mt-16 md:grid md:grid-cols-12 md:gap-8" delay={0.05}>
          <div className="md:col-span-9 md:col-start-4">
            <p className="eyebrow mb-4">{t("sendEmail")}</p>
            <a
              href={`mailto:${profile.email}`}
              className="display block break-all text-[1.75rem] leading-tight decoration-primary decoration-2 underline-offset-[10px] transition-colors hover:text-primary hover:underline sm:text-4xl lg:text-5xl"
            >
              {profile.email}
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium">
              <button
                onClick={copyEmail}
                className="inline-flex cursor-pointer items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-primary" />
                    <span aria-live="polite">{t("copiedEmail")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>{t("copyEmail")}</span>
                  </>
                )}
              </button>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link inline-flex items-center gap-1"
              >
                {t("viewGithub")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
