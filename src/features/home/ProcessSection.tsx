"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/Heading";
import { StaggerGroup, StaggerItem } from "@/components/motion";

const steps = [1, 2, 3, 4] as const;

export default function ProcessSection() {
  const t = useTranslations("Process");

  return (
    <section className="w-full pb-20 md:pb-24">
      <div className="section-shell">
        <SectionHeader title={t("title")} />
        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.15}>
          {steps.map((n) => (
            <StaggerItem key={n} className="h-full">
              <div className="h-full rounded-[24px] bg-muted p-6">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-background text-sm font-semibold tabular-nums">
                  {n}
                </span>
                <h3 className="display mt-6 text-lg">{t(`step${n}Title`)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{t(`step${n}Desc`)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
