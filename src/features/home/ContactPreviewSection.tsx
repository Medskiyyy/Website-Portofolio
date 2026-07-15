"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="relative w-full overflow-hidden bg-foreground py-16 text-background md:py-24">
      {/* animated gradient orbs behind the contact band */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <motion.div
          className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="section-shell relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <Reveal direction="up">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            {t("label")}
          </p>
          <h2 className="font-heading mt-4 text-4xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-background/75">
            {t("subtitle")}
          </p>
        </Reveal>

        <StaggerGroup
          className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
          stagger={0.1}
          amount={0.3}
        >
          <StaggerItem direction="right">
            <a
              href="mailto:hidayatahmadd1377@gmail.com"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group/btn h-11 cursor-pointer gap-2 bg-background px-4 text-sm text-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:bg-background/90",
              )}
            >
              <Mail className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
              {t("sendEmail")}
            </a>
          </StaggerItem>
          <StaggerItem direction="right">
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group/btn h-11 cursor-pointer gap-2 border-background/25 bg-transparent px-4 text-sm text-background transition-transform duration-300 hover:-translate-y-0.5 hover:bg-background/10 hover:text-background",
              )}
            >
              <Github className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
              {t("viewGithub")}
            </a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
