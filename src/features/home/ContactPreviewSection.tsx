import { useTranslations } from "next-intl";
import { Mail, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="w-full py-32 md:py-40">
      <motion.div 
        className="section-shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="surface-card relative overflow-hidden mx-auto max-w-4xl rounded-[2.5rem] border border-border/40 bg-black/5 dark:bg-white/5 p-8 text-center shadow-2xl md:p-16">
          <div className="absolute inset-0 -z-10 rounded-[calc(2.5rem-2px)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hidayatahmadd1377@gmail.com"
              className={cn(buttonVariants(), "cursor-pointer gap-2 px-6")}
            >
              <Mail className="h-4 w-4" />
              {t("sendEmail")}
            </a>
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer gap-2 px-6")}
            >
              <Github className="h-4 w-4" />
              {t("viewGithub")}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
