"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AboutPreviewSection() {
  const t = useTranslations("AboutPreview");
  const highlights = [t("highlightProduct"), t("highlightEngineering"), t("highlightDelivery")];

  return (
    <section className="w-full border-b border-border bg-background py-20 md:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="max-w-4xl">
          <p className="text-xl font-medium leading-9 text-foreground text-pretty">
            {t("summary")}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="surface-card p-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-semibold leading-6 text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-8 h-10 cursor-pointer gap-2 px-3 text-sm")}
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
