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
    <section className="w-full border-t border-border bg-muted/30 py-20">
      <div className="section-shell">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {repositories.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group flex cursor-pointer flex-col justify-between rounded-lg p-6 transition-colors duration-200 hover:border-primary/35"
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

        <div className="text-center">
          <a
            href="https://github.com/Medskiyyy"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer gap-2")}
          >
            <Github className="h-4 w-4" />
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
