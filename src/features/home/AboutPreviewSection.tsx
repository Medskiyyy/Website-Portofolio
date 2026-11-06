"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
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
    <section className="w-full py-12 md:py-20">
      <div className="section-shell">
        <SectionHeader number="03" label={t("label")} title={t("title")} />

        <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5 md:col-start-4" amount={0.1}>
            {profile.photoUrl && (
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                width={96}
                height={96}
                className="mb-8 h-24 w-24 border border-border object-cover grayscale"
              />
            )}
            <p className="text-lg leading-relaxed text-pretty text-foreground/85">{t("summary")}</p>

            <ol className="mt-8 space-y-3">
              {highlights.map((item, i) => (
                <li key={item} className="flex gap-4 text-base leading-relaxed">
                  <span className="font-mono text-xs leading-7 text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <Link
              href="/about"
              className="group/link mt-10 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.1} amount={0.1}>
            <p className="eyebrow border-b border-foreground pb-3">{t("glanceLabel")}</p>
            <dl>
              {glanceRows.map((row) => (
                <div key={row.label} className="border-b border-border py-4">
                  <dt className="font-mono text-xs text-muted-foreground">{row.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">{row.value}</dd>
                </div>
              ))}
              <div className="py-4">
                <dt className="font-mono text-xs text-muted-foreground">{t("glanceLinks")}</dt>
                <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
