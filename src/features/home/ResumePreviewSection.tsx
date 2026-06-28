"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FileText, Download, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export default function ResumePreviewSection() {
  const t = useTranslations("ResumePreview");

  const resumeItems = [
    { label: t("summaryLabel"), value: t("summaryValue") },
    { label: t("educationLabel"), value: t("educationValue") },
    { label: t("projectsLabel"), value: t("projectsValue") },
  ];

  return (
    <section className="w-full py-32 md:py-40 relative">
      <div className="absolute top-1/2 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

      <motion.div 
        className="section-shell grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:items-start"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <motion.div variants={itemVariants}>
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl leading-[1.1]">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">{t("subtitle")}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="double-bezel-wrapper">
          <div className="double-bezel-inner">
            <div className="mb-8 flex items-center gap-4 border-b border-border/20 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading font-bold text-lg text-card-foreground">Ahmad Hidayatullah</p>
                <p className="text-sm font-medium text-muted-foreground">Full Stack Developer & Product Builder</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {resumeItems.map((item) => (
                <div key={item.label} className="group/item">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 transition-colors group-hover/item:text-foreground">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed text-pretty">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/20 flex flex-col sm:flex-row gap-4">
              <Link
                href="/resume"
                className={cn(buttonVariants({ size: "lg" }), "flex-1 rounded-full cursor-pointer justify-center gap-2 group/btn transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]")}
              >
                {t("viewResume")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              <a
                href="/resume.pdf"
                download
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-1 rounded-full cursor-pointer justify-center gap-2 hover:border-primary/45 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm")}
              >
                {t("download")}
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
