"use client";

import { useTranslations } from "next-intl";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

type Repository = {
  name: string;
  descriptionKey: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
};

const repositories: Repository[] = [
  {
    name: "HitungUang",
    descriptionKey: "hitungDesc",
    language: "Kotlin",
    languageColor: "bg-[#A97BFF]", // Kotlin color
    stars: 3,
    forks: 1,
    url: "https://github.com/Medskiyyy/HitungUang",
  },
  {
    name: "Website-Portofolio",
    descriptionKey: "portfolioDesc",
    language: "TypeScript",
    languageColor: "bg-[#3178c6]", // TypeScript color
    stars: 2,
    forks: 0,
    url: "https://github.com/Medskiyyy/Website-Portofolio",
  },
];

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
    transition: { type: "spring", stiffness: 100, damping: 16 }
  }
};

export default function GithubShowcaseSection() {
  const t = useTranslations("GithubShowcase");

  return (
    <section className="w-full border-t border-border/30 bg-muted/20 py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <motion.div 
        className="section-shell"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <motion.div 
          variants={itemVariants} 
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h2 className="font-heading mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl leading-[1.1]">{t("title")}</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {repositories.map((repo) => (
            <motion.div
              key={repo.name}
              variants={itemVariants}
              className="double-bezel-wrapper h-full"
            >
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="double-bezel-inner h-full flex flex-col justify-between p-6 sm:p-8 hover:border-primary/30 transition-colors duration-500 group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                      <Github className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {repo.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                    {t(repo.descriptionKey)}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/20">
                  <div className="flex items-center gap-4">
                    {/* Language */}
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className={cn("h-2.5 w-2.5 rounded-full", repo.languageColor)} />
                      <span>{repo.language}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 font-medium group-hover:text-amber-500 transition-colors duration-300">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{repo.stars}</span>
                    </div>

                    {/* Forks */}
                    {repo.forks > 0 && (
                      <div className="flex items-center gap-1 font-medium">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{repo.forks}</span>
                      </div>
                    )}
                  </div>

                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center">
          <a
            href="https://github.com/Medskiyyy"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group gap-2 rounded-full cursor-pointer hover:border-primary/45 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm")}
          >
            <Github className="h-4 w-4" />
            {t("cta")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
