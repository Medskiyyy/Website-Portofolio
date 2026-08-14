"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Download, Github, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
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
    <section className="w-full border-b border-border/60 bg-background py-20 md:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left: summary */}
        <div className="lg:col-span-6">
          <Reveal direction="up">
            <span className="eyebrow">{t("label")}</span>
            <div className="mt-4 flex items-center gap-4">
              {profile.photoUrl && (
                <Image
                  src={profile.photoUrl}
                  alt={profile.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full border border-border object-cover shadow-sm"
                />
              )}
              <p className="font-heading text-lg font-bold text-foreground">{profile.name}</p>
            </div>
            <h2 className="font-heading mt-5 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("summary")}
            </p>
          </Reveal>

          <StaggerGroup className="mt-8 grid w-full gap-2.5" stagger={0.08} amount={0.1}>
            {highlights.map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-base leading-relaxed text-foreground">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal direction="up" delay={0.2}>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group/link mt-8 h-11 cursor-pointer gap-2 border-border/80 px-5 text-sm font-semibold active:scale-[0.985]",
              )}
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Right: at-a-glance facts */}
        <div className="lg:col-span-6 lg:pl-4">
          <Reveal direction="up" delay={0.15}>
            <div className="surface-card rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
              <p className="eyebrow">{t("glanceLabel")}</p>

              <dl className="mt-6 divide-y divide-border/60">
                {glanceRows.map((row) => (
                  <div key={row.label} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-foreground">{row.label}</dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">{row.value}</dd>
                  </div>
                ))}

                <div className="grid gap-2 pt-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-foreground">{t("glanceLinks")}</dt>
                  <dd className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground active:scale-[0.985]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </a>
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground active:scale-[0.985]"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                    <a
                      href={profile.resumeUrl}
                      download
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground active:scale-[0.985]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Resume
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
