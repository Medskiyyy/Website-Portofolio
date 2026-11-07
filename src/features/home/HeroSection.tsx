"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { EASE_OUT } from "@/components/motion";
import CopyEmailButton from "@/shared/components/CopyEmailButton";

const stack = {
  web: ["Next.js", "TypeScript", "Postgres", "Supabase", "Prisma"],
  android: ["Kotlin", "Jetpack Compose", "Room"],
};

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="pt-12 pb-20 md:pt-24 md:pb-24">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <p className="text-[15px] font-medium text-muted-foreground sm:text-base">{t("kicker")}</p>
        <h1 className="display mt-5 max-w-[1000px] text-[2.75rem] leading-[1.04] text-balance sm:text-6xl lg:text-[4.75rem] lg:tracking-[-0.035em]">
          {t("headlineLead")} <span className="text-muted-foreground/70">{t("headlineSoft")}</span>
        </h1>
        <p className="text-body mt-7 max-w-[640px] text-lg leading-relaxed text-pretty sm:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/projects" className="btn-pill btn-dark group h-[46px]">
            {t("ctaProjects")}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <CopyEmailButton className="h-[46px]" />
        </div>
        <div className="mt-16 flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-5 text-[15px] font-medium text-muted-foreground">
          <p>
            <span className="mr-1.5 font-semibold text-foreground">{t("stackWeb")}</span>
            {stack.web.join(" · ")}
          </p>
          <p>
            <span className="mr-1.5 font-semibold text-foreground">{t("stackAndroid")}</span>
            {stack.android.join(" · ")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
