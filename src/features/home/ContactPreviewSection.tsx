"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion";
import CopyEmailButton from "@/shared/components/CopyEmailButton";
import { profile } from "@/content/profile";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="w-full pb-20 md:pb-28">
      <div className="section-shell">
        <Reveal className="rounded-[32px] bg-foreground px-6 py-12 text-background sm:px-14 md:py-16">
          <h2 className="display max-w-3xl text-[2rem] leading-[1.08] text-balance sm:text-[3.25rem]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-background/70 sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn-pill h-[46px] bg-background text-foreground hover:bg-background/90"
            >
              {t("sendEmail")}
            </a>
            <CopyEmailButton inverted className="h-[46px]" />
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-outline-inverted h-[46px]"
            >
              {t("whatsapp")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
