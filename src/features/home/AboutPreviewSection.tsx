"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHeader } from "@/components/Heading";
import { profile } from "@/content/profile";

export default function AboutPreviewSection() {
  const t = useTranslations("AboutPreview");

  const highlights = [
    t("highlightProduct"),
    t("highlightEngineering"),
    t("highlightDelivery"),
  ];

  const glanceRows = [
    { label: t("glanceLocation"), value: t("glanceLocationValue") },
    { label: t("glanceEducation"), value: t("glanceEducationValue") },
    { label: t("glanceFocus"), value: t("glanceFocusValue") },
    { label: t("glanceOpenTo"), value: t("glanceOpenToValue") },
    { label: t("glanceLanguages"), value: t("glanceLanguagesValue") },
  ];

  return (
    <section className="w-full pb-16 md:pb-24">
      <div className="section-shell">
        <SectionHeader title={t("title")} />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6" amount={0.1}>
            {profile.photoUrl && (
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                width={96}
                height={96}
                className="mb-8 h-24 w-24 rounded-full object-cover"
              />
            )}
            <p className="text-body text-lg leading-relaxed text-pretty">{t("summary")}</p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-muted">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-1.5 text-[15px] font-semibold"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1} amount={0.1}>
            <div className="rounded-[24px] bg-muted p-6 sm:p-7">
              <p className="display text-lg">{t("glanceLabel")}</p>
              <dl className="mt-2">
                {glanceRows.map((row) => (
                  <div key={row.label} className="border-b border-border py-3.5">
                    <dt className="text-sm text-muted-foreground">{row.label}</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed">{row.value}</dd>
                  </div>
                ))}
                <div className="pt-4">
                  <dt className="sr-only">{t("glanceLinks")}</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
                    <a href={`mailto:${profile.email}`} className="ink-link">
                      Email
                    </a>
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ink-link inline-flex items-center gap-1"
                    >
                      GitHub
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a href={profile.resumeUrl} download className="ink-link inline-flex items-center gap-1">
                      Resume
                      <ArrowDown className="h-3.5 w-3.5" />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
