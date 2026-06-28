"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  }
};

export default function AboutPreviewSection() {
  const t = useTranslations("AboutPreview");
  const highlights = [t("highlightProduct"), t("highlightEngineering"), t("highlightDelivery")];

  return (
    <section className="w-full py-32 md:py-40 relative">
      <div className="absolute top-1/2 left-1/3 -z-10 h-[320px] w-[320px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />
      
      <motion.div 
        className="section-shell grid gap-16 md:grid-cols-[0.75fr_1.25fr] md:items-start"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <motion.div variants={itemVariants}>
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl leading-[1.1] text-balance">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="double-bezel-wrapper">
          <div className="double-bezel-inner">
            <p className="text-xl font-medium leading-relaxed text-foreground text-pretty">
              {t("summary")}
            </p>
            
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item, idx) => (
                <div 
                  key={item} 
                  className="group/item flex items-center gap-3 rounded-2xl border border-border/40 bg-muted/30 p-4 transition-all duration-300 hover:bg-muted/70 hover:border-primary/30"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover/item:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold leading-5 text-muted-foreground group-hover/item:text-foreground transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/20">
              <Link
                href="/about"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group gap-2 rounded-full cursor-pointer hover:border-primary/45 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]")}
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
