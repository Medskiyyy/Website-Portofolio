"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import CopyEmailButton from "@/shared/components/CopyEmailButton";
import { profile } from "@/content/profile";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="w-full pb-20 md:pb-28">
      <div className="section-shell">
        <Reveal className="rounded-[28px] bg-muted px-6 py-12 sm:px-12 md:py-16">
          <span className="text-body inline-flex items-center gap-2 rounded-full bg-background px-3 py-1.5 text-sm font-medium">
            <i className="pulse-dot" aria-hidden />
            {t("label")}
          </span>
          <h2 className="display mt-6 max-w-3xl text-3xl leading-[1.1] text-balance sm:text-[2.75rem]">
            {t("title")}
          </h2>
          <p className="text-body mt-5 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-pill btn-dark h-[46px]">
              {t("sendEmail")}
            </a>
            <CopyEmailButton className="h-[46px]" />
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("viewGithub")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
