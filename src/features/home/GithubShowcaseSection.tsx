import { useTranslations } from "next-intl";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export default function GithubShowcaseSection() {
  const t = useTranslations("GithubShowcase");

  return (
    <section className="w-full py-20 px-6 border-t border-border bg-muted/10">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {t("label")}
          </h2>
          <p className="text-2xl font-bold text-foreground mb-4">{t("title")}</p>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            {t("subtitle")}
          </p>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto mb-10">
          {repositories.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:scale-[1.01] duration-200"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                  {t(repo.descriptionKey)}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                <div className="flex items-center gap-4">
                  {/* Language */}
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-2.5 w-2.5 rounded-full", repo.languageColor)} />
                    <span>{repo.language}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    <span>{repo.stars}</span>
                  </div>

                  {/* Forks */}
                  {repo.forks > 0 && (
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      <span>{repo.forks}</span>
                    </div>
                  )}
                </div>

                <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://github.com/Medskiyyy"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <Github className="h-4 w-4" />
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
