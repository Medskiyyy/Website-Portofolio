"use client";

import { useTranslations } from "next-intl";
import { Mail, Github, ArrowRight } from "lucide-react";
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
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 }
  }
};

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="w-full py-32 md:py-40 relative overflow-hidden">
      {/* Decorative ambient background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[130px] opacity-60 pointer-events-none" />

      <motion.div 
        className="section-shell"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <motion.div
          variants={itemVariants}
          className="double-bezel-wrapper mx-auto max-w-4xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <div className="double-bezel-inner text-center p-8 md:p-16 relative overflow-hidden">
            {/* Ambient overlay inside card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-80 pointer-events-none" />
            
            <p className="eyebrow relative z-10">{t("label")}</p>
            <h2 className="font-heading mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl leading-[1.1] text-balance relative z-10">
              {t("title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty relative z-10">
              {t("subtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row relative z-10">
              <a
                href="mailto:hidayatahmadd1377@gmail.com"
                className={cn(buttonVariants({ size: "lg" }), "group h-14 rounded-full pl-8 pr-2 text-base shadow-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto")}
              >
                {t("sendEmail")}
                <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                  <Mail className="h-4 w-4" />
                </div>
              </a>
              <a
                href="https://github.com/Medskiyyy"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group h-14 rounded-full px-8 text-base bg-background/40 backdrop-blur-md hover:border-primary/45 hover:-translate-y-0.5 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] w-full sm:w-auto")}
              >
                <Github className="mr-2 h-4 w-4" />
                {t("viewGithub")}
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
